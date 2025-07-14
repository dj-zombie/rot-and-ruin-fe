// src/routes/products/loader.ts
import { routeLoader$ } from "@builder.io/qwik-city";
import { productService } from "~/services/product-service"; // Adjust path if needed

export const useProductsLoader = routeLoader$(async () => {
  console.log(
    "Fetching products via loader$ on",
    import.meta.env.SSR ? "server" : "client",
  );
  const products = await productService.getProducts();
  console.log("fetched products", products);
  console.table(products);
  return products;
});

// For dynamic routes like [productId]
// src/routes/products/[productId]/loader.ts
// import { routeLoader$ } from '@builder.io/qwik-city';
// import { productService } from '~/services/product-service';
// import type { Product } from '~/types/product';

// export const useProductLoader = routeLoader$(async ({ params }): Promise<Product> => {
//   const productId = params.productId;
//   if (!productId) {
//     throw new Error('Product ID is missing');
//   }
//   console.log(`Fetching product ${productId} via loader$ on`, import.meta.env.SSR ? 'server' : 'client');
//   const product = await productService.getProductById(productId);
//   return product;
// });
