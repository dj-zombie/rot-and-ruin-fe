// routes/cart/index.tsx
import { component$, useContext, useTask$ } from "@builder.io/qwik";
import { CartContext } from "~/stores/cart-store";
import { CartItem } from "~/components/features/cart/CartItem";
import { CartSummary } from "~/components/features/cart/CartSummary";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { cartService } from "~/services/cart-service";
import type { Cart } from "~/types/cart";

export const useCartLoader = routeLoader$<Cart | null>(async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  console.log(
    "[Loader on /cart] Received raw cookie header on server:",
    cookieHeader,
  );

  console.log("[Loader] Attempting to load cart on the server.");
  try {
    // Get the raw cookie header from the incoming browser request
    const cookieHeader = request.headers.get("cookie");
    // The service now contains all the logic to parse the cookie and call the API
    const cart = await cartService.getCart(cookieHeader);
    console.log("[Loader] Cart data received from service:", cart);
    return cart;
  } catch (error) {
    // This will catch the "CartNotFound" error from your apiClient
    if (error instanceof Error && error.message === "CartNotFound") {
      console.warn(
        "[Loader] Stale cartId detected. The cart was not found on the backend.",
      );
      // We don't need to delete the cookie here, the store's error handler will do it.
    } else {
      console.error("[Loader] Unexpected error loading cart:", error);
    }
    return null;
  }
});

export default component$(() => {
  const cartStore = useContext(CartContext);
  const cartData = useCartLoader();
  useTask$(({ track }) => {
    // Track the loader's value. If it changes (e.g., on navigation), this task re-runs.
    track(() => cartData.value);

    // Update the global store with the data fetched by the server.
    cartStore.state.cart = cartData.value;
  });

  const { cart, isLoading, error } = cartStore.state;

  if (isLoading) {
    return (
      <div class="container mx-auto py-8">
        <h1 class="mb-8 text-2xl font-bold">Your Cart</h1>
        <div>Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div class="container mx-auto py-8">
        <h1 class="mb-8 text-2xl font-bold">Your Cart</h1>
        <div class="mb-4 text-red-600">Error: {error}</div>
        <button
          onClick$={() => cartStore.getCart()}
          class="text-blue-600 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div class="container mx-auto py-8 text-center">
        <h1 class="mb-4 text-2xl font-bold">Your Cart</h1>
        <p class="mb-4">Your cart is empty.</p>
        <Link
          href="/products"
          class="inline-block rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div class="container mx-auto py-8">
      <h1 class="mb-8 text-2xl font-bold">Your Cart</h1>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2">
          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
});
