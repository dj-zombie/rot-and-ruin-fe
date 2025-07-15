// types/cart.d.ts
export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productUrl: string;
  originalUrl: string;
  quantity: number;
  price: number;
  shippingPrice: number;
  subTotal: number;
  shippingTotal: number;
  total: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  paymentIntentId: string;
  clientSecret: string;
  subTotal: number;
  shippingTotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  cartItemId: string;
  quantity: number;
}
