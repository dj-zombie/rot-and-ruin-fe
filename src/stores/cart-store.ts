// stores/cart-store.ts
import { $, useStore, createContextId } from "@builder.io/qwik";
import type { Cart } from "~/types/cart";
import { cartService } from "~/services/cart-service";
import { setCartIdCookie, deleteCartIdCookie } from "~/utils/cookies";

export interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

export interface CartStore {
  state: CartState;
  getCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (cartItemId: string, quantity: number) => Promise<void>;
  removeCartItem: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContextId<CartStore>("cart-context");

export const useCartStore = (): CartStore => {
  const state = useStore<CartState>({
    cart: null,
    isLoading: false,
    error: null,
  });

  const handleCartUpdate = $((cart: Cart | null) => {
    if (cart && cart.id) {
      state.cart = cart;
      setCartIdCookie(cart.id); // Save the good ID
    } else {
      // If we get a null cart, or a cart without an ID, clear everything.
      state.cart = null;
      deleteCartIdCookie(); // Delete the bad ID
    }
    state.isLoading = false;
    state.error = null;
  });

  const handleError = $((error: unknown) => {
    console.error("Cart store error:", error);
    state.error =
      error instanceof Error ? error.message : "An unknown error occurred";

    // If the cart was not found, clear the state and delete the bad cookie.
    if (error instanceof Error && error.message === "CartNotFound") {
      state.cart = null;
      deleteCartIdCookie();
      state.error =
        "Your session expired. Please add an item to start a new cart.";
    }
    state.isLoading = false;
  });

  // Important: Use this exact syntax pattern with named function expressions
  const getCart = $(async function getCart() {
    console.log(
      `[Store] addToCart called. State is loading. Calling service...`,
    );
    state.isLoading = true;
    try {
      state.error = null;
      const cart = await cartService.getCart();
      console.log(
        "[Store] Cart object received AFTER addToCart:",
        JSON.stringify(cart, null, 2),
      );
      state.cart = cart;
      handleCartUpdate(cart);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      state.error =
        error instanceof Error ? error.message : "Failed to fetch cart";
      handleError(error);
    } finally {
      state.isLoading = false;
    }
  });

  const addToCart = $(async function addToCart(
    productId: string,
    quantity: number,
  ) {
    try {
      state.isLoading = true;
      state.error = null;
      const cart = await cartService.addToCart(productId, quantity);
      state.cart = cart;
      handleCartUpdate(cart);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      state.error =
        error instanceof Error ? error.message : "Failed to add item to cart";
      handleError(error);
    } finally {
      state.isLoading = false;
    }
  });

  const updateCartItem = $(async function updateCartItem(
    cartItemId: string,
    quantity: number,
  ) {
    try {
      state.isLoading = true;
      state.error = null;
      const cart = await cartService.updateCartItem(cartItemId, quantity);
      state.cart = cart;
    } catch (error) {
      console.error("Failed to update cart item:", error);
      state.error =
        error instanceof Error ? error.message : "Failed to update cart item";
    } finally {
      state.isLoading = false;
    }
  });

  const removeCartItem = $(async function removeCartItem(cartItemId: string) {
    try {
      state.isLoading = true;
      state.error = null;
      const cart = await cartService.removeCartItem(cartItemId);
      state.cart = cart;
    } catch (error) {
      console.error("Failed to remove cart item:", error);
      state.error =
        error instanceof Error ? error.message : "Failed to remove cart item";
    } finally {
      state.isLoading = false;
    }
  });

  const clearCart = $(async function clearCart() {
    try {
      state.isLoading = true;
      state.error = null;
      await cartService.clearCart();
      state.cart = null;
    } catch (error) {
      console.error("Failed to clear cart:", error);
      state.error =
        error instanceof Error ? error.message : "Failed to clear cart";
    } finally {
      state.isLoading = false;
    }
  });

  return {
    state,
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
  };
};
