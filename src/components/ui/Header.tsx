import { component$, useContext } from "@builder.io/qwik";
import { Link, Form } from "@builder.io/qwik-city";
import { CartContext } from "~/stores/cart-store";
import { AuthContext } from "~/stores/auth-store";
import { useLogoutAction } from "~/routes/layout";

export const Header = component$(() => {
  console.log("Header component rendering");

  const cartStore = useContext(CartContext);
  const itemCount = cartStore.state.cart?.items.length || 0;
  const authState = useContext(AuthContext);
  const logoutAction = useLogoutAction();

  return (
    <header class="fixed z-30 w-full bg-[var(--dark-red)] shadow">
      <div class="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" class="font-rocker text-2xl font-bold">
          Rot And Ruin
        </Link>

        <nav class="flex items-center space-x-6">
          <Link href="/products" class="font-rocker text-xl hover:text-red-600">
            Products
          </Link>

          <Link href="/cart" class="relative hover:text-red-600">
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

          {authState.user?.username ? (
            <>
              <span class="hidden sm:inline">
                Hello, {authState.user.username}
              </span>
              {/* The logout button MUST be inside a Form to trigger the server action */}
              <Form action={logoutAction}>
                <button
                  type="submit"
                  class="rounded bg-red-500 px-3 py-1 hover:bg-red-600"
                >
                  Logout
                </button>
              </Form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                class="font-rocker text-xl hover:text-red-600"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
});
