import Axios from "axios";

export function fetchProducts() {
  return Axios.get("http://localhost:3000/products").then(
    (response) => response.data
  );
}

export function requestPayment(productId: number, email: string) {
  return Axios.post("http://localhost:3000/payment.create", {
    productId,
    email,
  }).then((response) => response.data);
}
