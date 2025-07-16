// src/routes/products/index.tsx
import { component$ } from "@builder.io/qwik";
// Import the loader from its dedicated file
import { useProductsLoader as originalUseProductsLoader } from "./loader";
import { ProductCard } from "~/components/features/product/ProductCard";

// IMPORTANT: Re-export the loader here!
// eslint-disable-next-line qwik/loader-location
export const useProductsLoader = originalUseProductsLoader;

export default component$(() => {
  // Now, calling useProductsLoader() will correctly trigger the loader
  const productsSignal = useProductsLoader();

  return (
    // <div class="container mx-auto p-4">
    //   <h1 class="mb-6 text-3xl font-bold">Our Products</h1>
    //   <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    //     {productsSignal.value.length === 0 ? (
    //       <p>No products found.</p>
    //     ) : (
    //       productsSignal.value.map((product) => (
    //         <ProductCard key={product.id} product={product} />
    //       ))
    //     )}
    //   </div>
    // </div>

    /*<div class="center mt-4 grid grid-cols-3 sm:gap-8">
      <section
        aria-labelledby="product-heading"
        class="col-span-4 m-auto group-has-[[data-pending]]:animate-pulse lg:col-span-3"
      >
      <div class="mx-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-4">
          {productsSignal.value.length === 0 ? (
            <p>No products found.</p>
          ) : (
            productsSignal.value.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>
    </div>*/
    // A standard container to center your content on the page
    // Removed the outer grid, section, and extra divs.
    // Just a clean container for the grid.
    <div class="mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5">
        {productsSignal.value.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
});
