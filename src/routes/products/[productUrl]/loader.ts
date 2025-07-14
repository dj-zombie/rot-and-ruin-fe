// src/routes/products/[productUrl]/loader.ts
import { routeLoader$ } from "@builder.io/qwik-city";
import { productService } from "~/services/product-service";

export const useProductLoader = routeLoader$(async ({ params }) => {
  // --- ADD THIS LOG ---
  console.log("Loader params object:", params);
  // --- END ADDED LOG ---

  const productSlug = params.productUrl; // This captures the slug from the URL

  if (!productSlug) {
    console.error(
      "Error: No product slug found in params. Is the URL correct?",
    );
    // Instead of throwing a generic error, let's make it clearer
    // You could also redirect(302, '/404'); here
    throw new Error(
      `Product slug is missing from the URL. Actual params: ${JSON.stringify(params)}`,
    );
  }

  // Existing logic (fetch all products and find by slug)
  // This is still suboptimal but will work once productSlug is correctly passed
  const products = await productService.getProducts();
  const product = products.find(
    (p) => p.productUrl === `/products/${productSlug}`,
  );

  if (!product) {
    console.error(
      `Product not found in API response for URL slug: ${productSlug}`,
    );
    throw new Error(`Product not found for URL slug: ${productSlug}`);
  }

  return product;
});
