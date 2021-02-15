require("dotenv").config();

// Terra network config
export const TERRA_URL =
  process.env.TERRA_URL || "https://tequila-lcd.terra.dev/";
export const TERRA_CHAINID = process.env.TERRA_CHAINID || "tequila-0004";
