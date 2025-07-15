// components/features/cart/CartItem.tsx
import { component$, useContext } from "@builder.io/qwik";
import { CartContext } from "~/stores/cart-store";
import type { CartItem as CartItemType } from "~/types/cart";
import { Button } from "~/components/ui/Button";
import { OptimizedImage } from "~/components/ui/OptimizedImage";

export interface CartItemProps {
  item: CartItemType;
}

export const CartItem = component$<CartItemProps>(({ item }) => {
  const cartStore = useContext(CartContext);

  return (
    <div class="flex items-center border-b py-4">
      <div class="h-20 w-20 flex-shrink-0">
        <OptimizedImage
          src={item.originalUrl}
          alt={item.productName}
          width={80}
          height={80}
          class="rounded object-cover"
        />
      </div>

      <div class="ml-4 flex-grow">
        <h3 class="font-medium">{item.productName}</h3>
        <p class="text-sm text-gray-600">${item.price.toFixed(2)}</p>

        <div class="mt-2 flex items-center">
          <Button
            onClick$={() => {
              if (item.quantity > 1) {
                cartStore.updateCartItem(item.id, item.quantity - 1);
              } else {
                cartStore.removeCartItem(item.id);
              }
            }}
            class="px-2 py-1 text-sm"
          >
            -
          </Button>

          <span class="mx-2">{item.quantity}</span>

          <Button
            onClick$={() =>
              cartStore.updateCartItem(item.id, item.quantity + 1)
            }
            class="px-2 py-1 text-sm"
          >
            +
          </Button>
        </div>
      </div>

      <div class="ml-4 text-right">
        <div class="font-medium">${item.total.toFixed(2)}</div>
        <button
          onClick$={() => cartStore.removeCartItem(item.id)}
          class="mt-1 text-sm text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
});
