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
      try {
        for (let i = 0; i < this.watchedPayments.length; i++) {
          const _payment = this.watchedPayments[i];

          if (!_payment) continue;

          // Remove from watchedPayments array if expired.
          if (this.isExpired(_payment)) {
            console.log(`${_payment.address} has expired!`);
            this.removeWatchedPayment(_payment);
            i--;
            continue;
          }

          const balance = await this.checkBalance(_payment.address);

          console.log(`Checking balance for ${_payment.address} ...`);

          if (balance && parseInt(balance.amount) >= _payment.amount) {
            callback(_payment);
          }
        }
      } catch (e) {
        // Catch exception when accessing undefined payment which it was removed from the watchedPayments array.
      }
      this.intervalCheckBalance(callback);
    }, 3000);
  }

  private isExpired(payment: Payment) {
    return new Date().getTime() > payment.validUntil.getTime();
  }
}
