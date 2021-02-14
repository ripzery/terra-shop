import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import TerraConnectBtn from "../components/TerraConnectBtn";
import { ProductItem } from "../types";
import { fetchProducts } from "../utils/client";
import { useLocation, Link, withRouter } from "react-router-dom";
import { User } from "../types";
import "../styles/Products.css";
import { History } from "history";
import { set, get, clear } from "../utils/localstorage";

interface ProductsProps {
  history: History;
}

function Products({ history }: ProductsProps) {
  const [products, setProducts] = useState<ProductItem[]>();
  const location = useLocation<User | undefined>();

  if (location.state?.email) {
    set("email", location.state.email);
  }

  const email = location.state?.email || get("email");

  if (!email) {
    history.push("/");
  }

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

  function onPressedLogOut() {
    clear();
  }

  return (
    <>
      <div className="products-header">
        <h1>Terra Book Shop</h1>
        <div className="products-user-email">
          <TerraConnectBtn>Connect to Terra</TerraConnectBtn>
          <span>{email}</span>
          <Link className="products-btn" onClick={onPressedLogOut} to="/">
            Logout
          </Link>
        </div>
      </div>
      <div className="products-container">{renderProducts()}</div>
    </>
  );
}

export default withRouter(Products);
