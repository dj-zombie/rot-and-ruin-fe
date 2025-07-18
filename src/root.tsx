import { component$, isDev } from "@builder.io/qwik";
// import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { Header } from "./components/ui/Header";
import { CartProvider } from "./components/cart-provider";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  // return (
  //   <QwikCityProvider>
  //     <head>
  //       <meta charSet="utf-8" />
  //       <RouterHead />
  //     </head>
  //     <body lang="en">
  //       {/* Remove CartProvider temporarily */}
  //       <Header />
  //       <main>
  //         {/* No padding class */}
  //         <RouterOutlet />
  //       </main>
  //     </body>
  //   </QwikCityProvider>
  // );

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
            <RouterOutlet />
          </main>
        </CartProvider>
      </body>
    </QwikCityProvider>
  );
});
