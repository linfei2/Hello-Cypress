export interface Product {
  name: string;
  size: "XS" | "S" | "M" | "L" | "XL";
  color: string;
  price: string;
  qty?: number;
}
