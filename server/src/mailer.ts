import nodemailer, {TestAccount, Transporter} from 'nodemailer';
import {Payment} from './entity/Payment';
import {Product} from './entity/Product';

const testEmailAuth = {
  user: process.env.TEST_EMAIL_ADDRESS || '',
  pass: process.env.TEST_EMAIL_PASSWORD || '',
};

export default class Mailer {
  account: TestAccount;
  transporter: Transporter;
  constructor() {}

  async initTestAccount() {
    this.account = await nodemailer.createTestAccount();
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
      to: this.account.user,
      subject: `Received payment to ${payment.address} successfully.`,
      text: `Payment has been made from <buyer_address> with amount ${payment.amount} UST!`,
    });
  }
}
