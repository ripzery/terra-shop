import Axios from "axios";

export function fetchProducts() {
  return Axios.get("http://localhost:3000/products").then(
    (response) => response.data
  );
}
