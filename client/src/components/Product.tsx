import React from "react";
import { ProductItem } from "../types";
import "../styles/Product.css";

interface ProductProps {
  product: ProductItem;
}

function Product({ product }: ProductProps) {
  function onClickBuy() {
    console.log("Buy", product);
  }
  return (
    <div className="product-container">
      <h2 className="product-title">{product.title}</h2>
      <div className="product-desc">{product.desc}</div>
      <p className="product-price">Price: {product.price / 1e6} UST</p>
      <a className="product-buy" onClick={onClickBuy} href="#">
        Buy
      </a>
    </div>
  );
}

export default Product;
