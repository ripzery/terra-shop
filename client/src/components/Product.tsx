import React from "react";
import { ProductItem } from "../types";
import "../styles/Product.css";
import { Link } from "react-router-dom";

interface ProductProps {
  product: ProductItem;
}

function Product({ product }: ProductProps) {
  return (
    <div className="product-container">
      <h2 className="product-title">{product.title}</h2>
      <div className="product-desc">{product.desc}</div>
      <p className="product-price">Price: {product.price / 1e6} UST</p>
      <Link
        className="product-buy"
        to={{ pathname: "/payment", state: { product } }}
      >
        Buy
      </Link>
    </div>
  );
}

export default Product;
