import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express, {Request, Response} from 'express';
import {Product} from './entity/Product';
import {Payment} from './entity/Payment';
import Terra from './terra';
import Mailer from './mailer';
import {TERRA_URL, TERRA_CHAINID, PORT, MERCHANT_EMAIL_ADDRESS} from './config';
import cors from 'cors';

function initDB() {
  createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'terra-pay-development',
    entities: [Product, Payment],
    synchronize: true,
    logging: false,
  })
    .then(async connection => {
      console.log('DB connection has been established successfully.');

      const mailer = new Mailer();

      // Initialize terra client for two usages
      // 1. Generating new payment addresses.
      // 2. Adding payment address to watch list.
      const terra = new Terra(TERRA_URL, TERRA_CHAINID);

      // Initialize express app
      const app = express();
      app.use(express.json());
      app.use(express.urlencoded({extended: true}));
      app.use(cors());

      // Query all on-going payments from the databases
      const _payments: Payment[] = await connection
        .getRepository(Payment)
        .createQueryBuilder('payment')
        .where('payment.completed = false')
        .getMany();

      // Filters expired payment out
      const payments = _payments.filter(p => {
        p.validUntil.getTime() > new Date().getTime();
      });

      // Added watched addresses from the databases
      payments.forEach(payment => terra.addWatchedPayment(payment));

      // Start tracking address for each payment
      terra.intervalCheckBalance(updatePayment);

      async function updatePayment(payment: Payment) {
        terra.removeWatchedPayment(payment);

        payment.completed = true;

        await connection.getRepository(Payment).save(payment);

        console.log('Receive payment for', payment.address);

        const product = await connection
          .getRepository(Product)
          .findOne(payment.productId);

        // Send email to customer
        await mailer.sendToCustomer(payment.buyerEmail, product);
        console.log(`Sent email to customer at ${payment.buyerEmail}.`);

        // Send email to merchant
        await mailer.sendToMerchant(payment);
        console.log(`Sent email to merchant at ${MERCHANT_EMAIL_ADDRESS}.`);
      }

      app.get('/products', async (_req: Request, res: Response) => {
        const products = await connection.getRepository(Product).find();
        res.json(products);
      });

      app.post('/payment.create', async (req: Request, res: Response) => {
        const {productId, email} = req.body;

        if (!productId) {
          return res.status(400).json({
            success: false,
            error: 'Specify productId for payment.',
          });
        }

        if (!email) {
          return res.status(400).json({
            success: false,
            error: 'Specify customer email for payment.',
          });
        }

        // Generate new address and mnemonic for receiving payment
        const {mnemonic, address} = terra.createAddress();

        // valid for 5 mins
        const validUntil = new Date(new Date().getTime() + 5 * 60000);

        // Find product details from given product id
        const product = await connection
          .getRepository(Product)
          .findOne(productId);

        if (!product) {
          return res.status(400).json({
            success: false,
            error: 'Invalid productId for payment.',
          });
        }

        // Create payment entry
        const payment = new Payment();
        payment.productId = product.id;
        payment.address = address;
        payment.validUntil = validUntil;
        payment.buyerEmail = email;
        payment.mnemonic = mnemonic;
        payment.amount = product.price;

        // Save payment entry to database.
        await connection.getRepository(Payment).save(payment);

        // Add payment address to watch list.
        terra.addWatchedPayment(payment);

        // cleanup mnemonic before returns
        delete payment.mnemonic;

        // Return 200 response
        res.json(payment);
      });

      app.listen(PORT, () => {
        console.log(`Terra Pay listening at http://localhost:${PORT}`);
      });
    })
    .catch(error => console.log(error));
}

initDB();
