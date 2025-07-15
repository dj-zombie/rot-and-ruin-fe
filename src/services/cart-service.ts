// services/cart-service.ts
import { apiClient } from "./api";
import type {
  AddToCartRequest,
  Cart,
  UpdateCartItemRequest,
} from "~/types/cart";
import {
  getCartIdFromServerCookie,
  getCartIdFromBrowser,
} from "~/utils/cookies";
import { isServer } from "@builder.io/qwik/build";

export const cartService = {
  /**
   * Fetch the current cart
   */
  async getCart(cookieHeader?: string | null): Promise<Cart | null> {
    let cartId: string | null;

    // Determine how to get the cookie based on the environment
    if (isServer) {
      // On the server, we MUST be given the cookie header from the loader
      cartId = getCartIdFromServerCookie(cookieHeader || null);
    } else {
      // In the browser, we can read it directly from document.cookie
      cartId = getCartIdFromBrowser();
    }

    // If there's no cartId, we don't have a cart. Don't even make an API call.
    if (!cartId) {
      console.log("[Cart Service] No cartId found in cookies. Returning null.");
      return null;
    }

    console.log(`[Cart Service] Found cartId: ${cartId}. Fetching from API.`);

    // The API call now includes the specific cartId in the URL
    return apiClient.get<Cart>(`/Cart/${cartId}`);
  },

  /**
   * Add product to cart
   */
  async addToCart(productId: string, quantity: number): Promise<Cart> {
    const payload: AddToCartRequest = { productId, quantity };
    console.log(
      "[Service] Calling apiClient.post to /Cart/items with payload:",
      payload,
    );
    const response = await apiClient.post<Cart>("/Cart/items", payload);
    return response;
  },

  /**
   * Update cart item quantity
   */
  async updateCartItem(cartItemId: string, quantity: number): Promise<Cart> {
    const payload: UpdateCartItemRequest = { cartItemId, quantity };
    const response = await apiClient.put<Cart>("/Cart/items", payload);
    return response;
  },

  /**
   * Remove an item from the cart
   */
  async removeCartItem(cartItemId: string): Promise<Cart> {
    const response = await apiClient.delete<Cart>(`/Cart/items/${cartItemId}`);
    return response;
  },

  /**
   * Clear the entire cart
   */
  async clearCart(): Promise<void> {
    await apiClient.delete("/Cart");
  },
};
