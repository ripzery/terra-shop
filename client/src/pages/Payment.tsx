import React, { useEffect, useState } from "react";
import { History } from "history";
import { useLocation, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { ProductItem, PaymentItem } from "../types";
import { Extension, MsgSend, StdFee } from "@terra-money/terra.js";
import { requestPayment } from "../utils/client";
import Countdown from "../components/Countdown";
import "../styles/Payment.css";
import { set, get } from "../utils/localstorage";

interface ProductState {
  product: ProductItem;
}

interface PaymentProps {
  history: History;
}

const extension = new Extension();

function Payment({ history }: PaymentProps) {
  const [payment, setPayment] = useState<PaymentItem | undefined>();
  const location = useLocation<ProductState | undefined>();
  const product = location.state?.product;
  const fromAddress = get("address") || "";

  useEffect(() => {
    async function requestForPaymentAddress(productId: number) {
      const email = get("email") || "";
      const _payment = await requestPayment(productId, email);
      setPayment(_payment);
    }
    if (!product) {
      return history.goBack();
    }

    if (!payment) {
      console.log("Request for payment");
      requestForPaymentAddress(product?.id);
    }
  }, [history, payment, product]);

  function onClickPay() {
    extension.post({
      msgs: [
        new MsgSend(fromAddress, payment?.address || "", {
          uusd: product?.price || 10,
        }),
      ],
      fee: new StdFee(100000, { uusd: 100000 }),
    });
  }

  return (
    <div className="payments-container">
      <Link to="/products" className="payment-back-btn">
        Back to Products
      </Link>
      <h1>Payment</h1>
      <div className="payment-content-container">
        <h2>{product?.title}</h2>
        <p>{product?.desc}</p>
        <p>Price: {product?.price && product.price / 1e6}</p>
        <p>Payment address: {payment?.address || "Loading"}</p>
        <div className="payment-countdown">
          <p>Payment expired in:</p>
          <Countdown expiredAt={payment?.validUntil} />
        </div>
        <button className="button payment-pay-btn" onClick={onClickPay}>
          Pay
        </button>
      </div>
    </div>
  );
}

export default withRouter(Payment);
