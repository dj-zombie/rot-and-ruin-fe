// src/routes/products/[productUrl]/index.tsx
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useProductLoader } from "./loader"; // Import the loader
import type { Product } from "~/types/product";
import { OptimizedImage } from "~/components/ui/OptimizedImage";

// Re-export the loader to ensure it is recognized by Qwik City
export { useProductLoader } from "./loader";

export default component$(() => {
  const productSignal = useProductLoader(); // Access the product data from the loader
  const product: Product = productSignal.value; // Extract the product

  // Handle case where product is not found (though loader throws error, this is just in case)
  if (!product) {
    return (
      <div class="container mx-auto p-8">
        <h1 class="mb-6 text-3xl font-bold">Product Not Found</h1>
        <p class="mb-4 text-gray-700">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Link href="/products" class="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  // Find the featured image or default to the first one
  const images = product.productImages || [];
  const featuredImage = images.find((img) => img.isFeatured) || images[0];
  const imageUrl =
    featuredImage?.originalUrl || "/assets/images/placeholder.jpg";
  const imageAltText = featuredImage?.altText || product.name;

  return (
    <div class="container mx-auto p-6">
      <div class="flex flex-col gap-8 md:flex-row">
        {/* Left Column - Product Images */}
        <div class="md:w-1/2">
          <div class="flex h-96 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
            <OptimizedImage
              src={imageUrl}
              alt={imageAltText}
              width={800}
              height={800}
              // format="webp"
              class="h-full w-full object-contain"
            />
          </div>
          {/* Thumbnail Gallery - Only if there are multiple images */}
          {images.length > 1 && (
            <div class="mt-4 flex gap-2 overflow-x-auto pb-2">
              {images.map((img) => (
                <button
                  key={img.id}
                  class={`h-32 w-24 flex-shrink-0 overflow-hidden rounded-md border ${
                    img.id === featuredImage?.id
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                  // Add onClick$ to switch main image (requires state management, omitted for brevity)
                >
                  <OptimizedImage
                    src={img.originalUrl}
                    alt={img.altText || product.name}
                    width={100}
                    height={200}
                    // format="webp"
                    class="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Product Details */}
        <div class="md:w-1/2">
          {/* Breadcrumb */}
          <div class="mb-4">
            <Link href="/" class="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span class="mx-2 text-gray-400">›</span>
            <Link href="/products" class="text-gray-500 hover:text-gray-700">
              Products
            </Link>
            <span class="mx-2 text-gray-400">›</span>
            <span class="text-gray-900">{product.name}</span>
          </div>

          {/* Product Title and Brand */}
          <h1 class="mb-2 text-3xl font-bold text-gray-900">{product.name}</h1>
          {product.brand && (
            <p class="mb-4 text-lg text-gray-600">by {product.brand}</p>
          )}

          {/* Price */}
          <div class="mb-4">
            <p class="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {product.shippingPrice > 0 && (
              <p class="text-sm text-gray-500">
                + ${product.shippingPrice.toFixed(2)} Shipping
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div class="mb-6">
            {product.stockLevel > 0 ? (
              <p class="font-semibold text-green-600">
                In Stock ({product.stockLevel} available)
              </p>
            ) : (
              <p class="font-semibold text-red-600">Out of Stock</p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            class="mb-6 w-full rounded-md bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-200 ease-in-out hover:bg-blue-700"
            disabled={!product.stockLevel} // Disable if out of stock
            onClick$={() => {
              console.log(`Added ${product.name} to cart`);
              // TODO: Implement cart logic using a store or service
            }}
          >
            {product.stockLevel > 0 ? "Add to Cart" : "Unavailable"}
          </button>

          {/* Product Description */}
          <div class="mb-6">
            <h2 class="mb-2 text-xl font-semibold text-gray-800">
              Description
            </h2>
            <p class="leading-relaxed text-gray-700">{product.description}</p>
          </div>

          {/* Additional Info (Optional) */}
          {product.categoryDetails && (
            <div class="mb-6">
              <h2 class="mb-2 text-xl font-semibold text-gray-800">Details</h2>
              <p class="text-gray-700">Category: {product.categoryDetails}</p>
            </div>
          )}
        </div>
      </div>

      {/* Back to Products Link */}
      <div class="mt-8">
        <Link
          href="/products"
          class="flex items-center text-blue-600 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Back to Products
        </Link>
      </div>
    </div>
  );
});
