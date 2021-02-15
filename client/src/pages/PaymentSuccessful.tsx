import React from "react";
import { useLocation } from "react-router";
import { ProductItem, PaymentItem } from "../types";
import { Link } from "react-router-dom";
import { TERRA_CHAINID } from "../config";
import "../styles/PaymentSuccessful.css";

interface PaymentSuccessfulState {
  payment: PaymentItem;
  product: ProductItem;
  txHash: string;
}

function PaymentSuccessful() {
  const location = useLocation<PaymentSuccessfulState>();

  const { payment, product, txHash } = location.state;

  return (
    <div className="payment-successful-container">
      <h1>Payment successful</h1>
      <p>Amount paid: {product.price / 1e6} UST</p>
      <p>Merchant address: {payment.address}</p>
      <p>Transaction details:</p>
      <a href={`https://finder.terra.money/${TERRA_CHAINID}/tx/${txHash}`}>
        {txHash}
      </a>
      <Link to="/products" className="payment-successful-btn">
        Go to products page
      </Link>
    </div>
  );
}

export default PaymentSuccessful;
