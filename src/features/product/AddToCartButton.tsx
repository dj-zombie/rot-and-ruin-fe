// components/features/product/AddToCartButton.tsx
import { component$, useContext, useSignal } from "@builder.io/qwik";
import { CartContext } from "~/stores/cart-store";
import { Button } from "~/components/ui/Button";

export interface AddToCartButtonProps {
  productId: string;
}

export const AddToCartButton = component$<AddToCartButtonProps>(
  ({ productId }) => {
    const cartStore = useContext(CartContext);
    const quantity = useSignal(1);
    const isAdding = useSignal(false);

    return (
      <div>
        <div class="mb-4 flex items-center">
          <Button
            onClick$={() => {
              if (quantity.value > 1) {
                quantity.value--;
              }
            }}
            class="px-3 py-1"
            aria-label="Decrease quantity"
          >
            -
          </Button>

          <span class="mx-4">{quantity.value}</span>

          <Button
            onClick$={() => {
              quantity.value++;
            }}
            class="px-3 py-1"
            aria-label="Increase quantity"
          >
            +
          </Button>
        </div>

        <Button
          onClick$={async () => {
            isAdding.value = true;
            await cartStore.addToCart(productId, quantity.value);
            isAdding.value = false;
          }}
          class="w-full"
          disabled={isAdding.value}
        >
          {isAdding.value ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    );
  },
);
