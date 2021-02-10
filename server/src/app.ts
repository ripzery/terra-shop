import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express, {Request, Response} from 'express';
import {Product} from './entity/Product';

function initDB() {
  createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'terra-pay-development',
    entities: [Product],
    synchronize: true,
    logging: false,
  })
    .then(connection => {
      console.log('DB connection has been established successfully.');

      const repositoryManager = connection.getRepository(Product);
      const app = express();
      const port = 3000;

      app.get('/products', async (_req: Request, res: Response) => {
        const products = await repositoryManager.find();
        res.json(products);
      });

      app.post('/payment.create', (req: Request, res: Response) => {
          
      })

      app.listen(port, () => {
        console.log(`Terra Pay listening at http://localhost:${port}`);
      });
    })
    .catch(error => console.log(error));
}

initDB();
