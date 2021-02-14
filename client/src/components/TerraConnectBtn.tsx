import React, { useEffect, useState } from "react";
import { Coin, Coins, Extension } from "@terra-money/terra.js";
import Terra from "../utils/terra";
import "../styles/TerraConnectBtn.css";

interface TerraConnectBtnProps {
  children: string;
}
let extension = new Extension();

const terra = new Terra();

function TerraConnectBtn({ children }: TerraConnectBtnProps) {
  const [btnClasses, setBtnClasses] = useState<string>(
    "button terra-connect-btn"
  );
  const [btnText, setBtnText] = useState<string>(children);
  const [balance, setBalance] = useState<Coin | undefined>();
  const walletAddress = localStorage.getItem("address");

  useEffect(() => {
    if (!extension.isAvailable && !walletAddress) {
      setBtnText("Missing Terra Extension");
      setBtnClasses("button terra-connect-btn button-disabled");
    } else {
      setBtnClasses("button terra-connect-btn");
    }

    if (walletAddress) {
      setBtnText(walletAddress);
      terra.getBalances(walletAddress).then((_balances: Coins) => {
        if (_balances.toArray().length) {
          const uusd = _balances.get("uusd");
          setBalance(uusd);
        }
      });
    }
  }, [walletAddress]);

  async function onClick() {
    if (!walletAddress) {
      console.log("click");
      extension.request("connect").then(async (resp: any) => {
        const address = resp.payload.address;
        localStorage.setItem("address", address);
        setBtnText(address);
      });
    }
  }

  return (
    <>
      <a className={btnClasses} href="#" onClick={() => onClick()}>
        {btnText}
      </a>
      {balance && (
        <span>Balance: {balance?.amount.div(1e6).toFixed(2)} UST</span>
      )}
    </>
  );
}

export default TerraConnectBtn;
