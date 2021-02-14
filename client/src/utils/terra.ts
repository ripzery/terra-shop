import { LCDClient, BankAPI } from "@terra-money/terra.js";
import { APIRequester } from "@terra-money/terra.js/dist/client/lcd/APIRequester";
require("dotenv").config();

export default class Terra {
  client: LCDClient;
  bankAPI: BankAPI;

  constructor() {
    const terraURL = process.env.REACT_APP_TERRA_URL || "";
    const terraChainID = process.env.REACT_APP_TERRA_CHAIN_ID || "";
    this.client = new LCDClient({
      URL: terraURL,
      chainID: terraChainID,
    });
    const requester = new APIRequester(terraURL);
    this.bankAPI = new BankAPI(requester);
  }

  getBalances(address: string) {
    return this.bankAPI.balance(address);
  }
}
