import nodemailer, {Transporter} from 'nodemailer';
import {Payment} from './entity/Payment';
import {Product} from './entity/Product';

const testEmailAuth = {
  user: process.env.TEST_EMAIL_ADDRESS || '',
  pass: process.env.TEST_EMAIL_PASSWORD || '',
};

const merchantEmail = process.env.MERCHANT_EMAIL_ADDRESS || '';

export default class Mailer {
  transporter: Transporter;
  constructor() {}

  async initTestAccount() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: testEmailAuth,
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
      to: merchantEmail,
      subject: `Received payment in ${payment.address} successfully.`,
      text: `Payment has been made from ${payment.buyerEmail} with amount ${payment.amount} UST!`,
    });
  }
}
