require('dotenv').config();
import {
  LCDClient,
  Coin,
  Wallet,
  MnemonicKey,
  MsgSend,
  BankAPI,
} from '@terra-money/terra.js';
import {APIRequester} from '@terra-money/terra.js/dist/client/lcd/APIRequester';

const mnemonic = process.env.WALLET_MNEMONIC || '';

const clientKey = new MnemonicKey({
  mnemonic,
});

// Initialize the lite client daemon
const client = new LCDClient({
  URL: 'https://tequila-lcd.terra.dev/',
  chainID: 'tequila-0004',
});

const wallet = new Wallet(client, clientKey);

const merchantKey = new MnemonicKey();
const merchantWallet = new Wallet(client, merchantKey);

async function buy() {
  console.log('customer address', clientKey.accAddress);
  console.log('merchant address', merchantKey.accAddress);

  const send = new MsgSend(clientKey.accAddress, merchantKey.accAddress, {
    uusd: 1000000,
  });

  console.log(send);

  const receipt = await wallet
    .createAndSignTx({
      msgs: [send],
      memo: 'test from euro macbook air',
    })
    .then(tx => client.tx.broadcast(tx));

  console.log(receipt);

  const api = new APIRequester('https://tequila-lcd.terra.dev/');

  const bank = new BankAPI(api);

  const {denom, amount} = await bank
    .balance(merchantKey.accAddress)
    .then(response => response.toData())
    .then(response => response[0]);

  const coin = new Coin(denom, amount);

  console.log('Received', `${coin.toString()}`);
}

buy();
