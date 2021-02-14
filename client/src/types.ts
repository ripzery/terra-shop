export interface ProductItem {
  id: number;
  price: number;
  title: string;
  desc: string;
}

export interface User {
  email: string;
}

export interface PaymentItem {
  address: string;
  validUntil: string;
}
