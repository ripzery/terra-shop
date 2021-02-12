require('dotenv').config();
import {LCDClient, MnemonicKey, BankAPI} from '@terra-money/terra.js';
import {Payment} from './entity/Payment';
import {APIRequester} from '@terra-money/terra.js/dist/client/lcd/APIRequester';

export default class Terra {
  client: LCDClient;
  bankAPI: BankAPI;
  watchedPayments: Payment[] = [];
  timeout: NodeJS.Timer;

  constructor(terraURL: string, terraChainId: string) {
    this.client = new LCDClient({
      URL: terraURL,
      chainID: terraChainId,
    });
    const requester = new APIRequester(terraURL);
    this.bankAPI = new BankAPI(requester);
  }

  createAddress() {
    const {mnemonic, accAddress} = new MnemonicKey();
    return {mnemonic, address: accAddress};
  }

  async checkBalance(address: string) {
    const balances = await this.bankAPI
      .balance(address)
      .then(response => response.toData());

    console.log(balances);

    if (balances.length === 0) {
      return null;
    }

    return balances[0];
  }

  addWatchedPayment(payment: Payment) {
    this.watchedPayments.push(payment);
  }

  removeWatchedPayment(payment: Payment) {
    this.watchedPayments = this.watchedPayments.filter(
      p => p.id !== payment.id
    );
  }

  async intervalCheckBalance(callback: (payment: Payment) => void) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      for (let i = 0; i < this.watchedPayments.length; i++) {
        if (!this.watchedPayments[i]) continue;

        const balance = await this.checkBalance(
          this.watchedPayments[i].address
        );

        console.log(
          `Checking balance for ${this.watchedPayments[i].address} ...`
        );

        if (
          balance &&
          parseInt(balance.amount) >= this.watchedPayments[i].amount
        ) {
          console.log('callback', balance);
          callback(this.watchedPayments[i]);
        }
      }
      this.intervalCheckBalance(callback);
    }, 3000);
  }
}
