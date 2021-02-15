import nodemailer, {Transporter} from 'nodemailer';
import {Payment} from './entity/Payment';
import {Product} from './entity/Product';
import {MAILER_EMAIL, MAILER_PASSWORD, MERCHANT_EMAIL_ADDRESS} from './config';

export default class Mailer {
  transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: MAILER_EMAIL,
        pass: MAILER_PASSWORD,
      },
    });
  }

  async sendToCustomer(to: string, product: Product) {
    return this.transporter.sendMail({
      from: '"Terra Pay" <terra@example.com>',
      to,
      subject: `Purchase ${product.title} successfully.`,
      text:
        'Payment is completed. Your book is ready to download!.  <Download link here>',
    });
  }

  sendToMerchant(payment: Payment) {
    return this.transporter.sendMail({
      from: '"Terra Pay" <terra@example.com>',
      to: MERCHANT_EMAIL_ADDRESS,
      subject: `Received payment in ${payment.address} successfully.`,
      text: `Payment has been made from ${payment.buyerEmail} with amount ${payment.amount} UST!`,
    });
  }
}
