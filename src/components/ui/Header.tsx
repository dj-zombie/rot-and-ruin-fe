import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { CartContext } from "~/stores/cart-store";

export const Header = component$(() => {
  console.log("Header component rendering");

  try {
    const cartStore = useContext(CartContext);
    const itemCount = cartStore.state.cart?.items.length || 0;

    // Instead of useTask$, use useVisibleTask$ which runs client-side
    useVisibleTask$(({ track }) => {
      console.log("Header visible task running");
      // No need to call getCart here, the CartProvider already does that
    });

    return (
      <header class="bg-white shadow">
        <div class="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" class="text-xl font-bold">
            Rot And Ruin
          </Link>

          <nav class="flex items-center space-x-6">
            <Link href="/products" class="hover:text-blue-600">
              Products
            </Link>

            <Link href="/cart" class="relative hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>

              {itemCount > 0 && (
                <span class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link href="/login" class="hover:text-blue-600">
              Login
            </Link>
          </nav>
        </div>
      </header>
    );
  } catch (error) {
    console.error("Error in Header:", error);
    return (
      <header class="bg-white p-4 shadow">
        <div class="text-red-500">Error loading header</div>
      </header>
    );
  }
});

/*
// src/components/ui/Header.tsx
// import { component$, useContext, useTask$ } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
// import { useCartStore } from "~/stores/cart-store";
// import { useAuthStore } from "~/stores/auth-store";
// import { CartContext } from "~/stores/cart-store";

export const Header = component$(() => {
  // const cartStore = useCartStore();
  // const cartStore = useContext(CartContext);
  // const authStore = useAuthStore();

  // useTask$(({ track }) => {
  //   // Track the version to make sure we update when the cart changes
  //   // const version = track(() => cartStore._version);
  //   // const items = track(() => cartStore.totalItems);
  //   console.log(
  //     "Header detected cart change, total items:",
  //     items,
  //     "version:",
  //     version,
  //   );
  // });

  return (
    <header class="border-primary fixed top-0 left-0 z-50 flex h-[60px] w-full items-center justify-between gap-1 overflow-y-visible border-b bg-black/95 px-4 shadow-lg transition-all duration-300 sm:px-10 lg:gap-8 lg:px-12 2xl:mx-auto 2xl:px-8">
      <div class="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" class="text-2xl font-bold">
          Rot And Ruin
        </Link>

        <nav class="flex items-center space-x-4">
          <Link href="/products" class="hover:text-primary">
            Products
          </Link>

          <>
            <Link href="/login" class="hover:text-primary">
              Login
            </Link>
            <Link href="/register" class="hover:text-primary">
              Register
            </Link>
          </>

          <Link href="/cart" class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            { {cartStore.totalItems > 0 && (
              <span class="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                {cartStore.totalItems}
              </span>
            )} }
          </Link>
        </nav>
      </div>
    </header>
  );
});
*/
