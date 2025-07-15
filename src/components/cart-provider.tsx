// components/cart-provider.tsx
import {
  component$,
  useContextProvider,
  useVisibleTask$,
  Slot,
} from "@builder.io/qwik";
import { CartContext, useCartStore } from "~/stores/cart-store";

export interface CartProviderProps {
  children?: any;
}

export const CartProvider = component$<CartProviderProps>(({ children }) => {
  const cartStore = useCartStore();

  useContextProvider(CartContext, cartStore);

  useVisibleTask$(({ track }) => {
    console.log("Cart provider initialized", track);
  });

  return (
    <>
      <Slot />
    </>
  );
});
