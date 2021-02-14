require('dotenv').config();

// Terra network config
export const TERRA_URL =
  process.env.TERRA_URL || 'https://tequila-lcd.terra.dev/';
export const TERRA_CHAINID = process.env.TERRA_CHAINID || 'tequila-0004';

// Port for server app
export const PORT = process.env.PORT || '3000';

// Email auth for nodemailer to send email from given address.
// Note: these values are hardcoded so you don't have to create them yourself.
export const MAILER_EMAIL = 'phuchit.terra@gmail.com';
export const MAILER_PASSWORD = 'Y8adGMbz*b7D.a-we9gP-XgN';

// Email address for merchant to receive payment email.
export const MERCHANT_EMAIL_ADDRESS = process.env.MERCHANT_EMAIL_ADDRESS;

function validateEnvs() {
  if (!MERCHANT_EMAIL_ADDRESS) {
    throw new Error(
      'Specify merchant email address for receiving payment receipt'
    );
  }
}

validateEnvs();
