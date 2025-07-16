// components/features/cart/CartSummary.tsx
import { component$, useContext } from "@builder.io/qwik";
import { CartContext } from "~/stores/cart-store";
import { Button } from "~/components/ui/Button";

export const CartSummary = component$(() => {
  const cartStore = useContext(CartContext);
  const { cart } = cartStore.state;

  if (!cart) {
    return null;
  }

  return (
    <div class="bg-neutral-950-50 rounded-lg p-6">
      <h2 class="mb-4 text-xl font-semibold">Order Summary</h2>

      <div class="space-y-3">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>${cart.subTotal.toFixed(2)}</span>
        </div>

        <div class="flex justify-between">
          <span>Shipping</span>
          <span>${cart.shippingTotal.toFixed(2)}</span>
        </div>

        <div class="mt-2 border-t pt-3">
          <div class="flex justify-between font-bold">
            <span>Total</span>
            <span>${cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button class="mt-6 w-full">Proceed to Checkout</Button>

      <button
        onClick$={() => cartStore.clearCart()}
        class="mt-4 w-full text-center text-sm text-red-600"
      >
        Clear Cart
      </button>
    </div>
  );
});
