import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { ProductItem } from "../types";
import { fetchProducts } from "../utils/client";
import { useLocation } from "react-router-dom";
import { User } from "../types";
import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState<ProductItem[]>();
  const location = useLocation<User | undefined>();

  if (location.state?.email) {
    localStorage.setItem("email", location.state.email);
  }

  const email = location.state?.email || localStorage.getItem("email");

  const renderProducts = () => {
    return products?.map((item) => <Product key={item.id} product={item} />);
  };

  useEffect(() => {
    async function init() {
      const _products = await fetchProducts();
      setProducts(_products);
    }

    init();
  }, []);

  return (
    <>
      <div className="products-header">
        <h1>Terra Shop</h1>
        <div className="products-user-email">
          <span>{email}</span>
        </div>
      </div>
      <div className="products-container">{renderProducts()}</div>
    </>
  );
}

export default Products;
