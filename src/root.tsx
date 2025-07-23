import { component$, isDev } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { CartProvider } from "./components/cart-provider";
import { cleanupCartCookies } from "./utils/cookies";

import "./global.css";

// ❌ REMOVE the useUserLoader and useLogoutAction from this file.

export default component$(() => {
  /*
   * The root of a QwikCity site always start with <QwikCityProvider> and
   * should contain the <RouterOutlet> component, and is generally not
   * a good idea to add other structure around it.
   */
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body lang="en">
        <button
          class="glowing-btn ml-8 cursor-pointer rounded-md p-3"
          onClick$={() => {
            console.log("cart cleared!");
            cleanupCartCookies();
          }}
        >
          Clear Cart
        </button>
        <CartProvider>
          <RouterOutlet />
        </CartProvider>
      </body>
    </QwikCityProvider>
  );
});

/*import { component$, isDev } from "@builder.io/qwik";
// import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { Header } from "./components/ui/Header";
import { CartProvider } from "./components/cart-provider";
import { cleanupCartCookies } from "./utils/cookies";

import "./global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body lang="en">
        <CartProvider>
          <Header />
          <main class="min-h-screen bg-neutral-900 pt-20">
            <button
              class="glowing-btn ml-8 cursor-pointer rounded-md p-3"
              onClick$={() => {
                console.log("cart cleared!");
                cleanupCartCookies();
              }}
            >
              Clear Cart
            </button>
            <RouterOutlet />
          </main>
        </CartProvider>
      </body>
    </QwikCityProvider>
  );
});
*/
