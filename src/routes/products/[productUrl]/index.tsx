// src/routes/products/[productUrl]/index.tsx
import { component$, useSignal, useContext, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useProductLoader } from "./loader"; // Import the loader
import type { Product, ProductImage } from "~/types/product";
import { OptimizedImage } from "~/components/ui/OptimizedImage";
// import { useCartStore } from "~/stores/cart-store";
import { CartContext } from "~/stores/cart-store";

// Re-export the loader to ensure it is recognized by Qwik City
export { useProductLoader } from "./loader";

export default component$(() => {
  const productSignal = useProductLoader(); // Access the product data from the loader
  const product: Product = productSignal.value; // Extract the product
  const cartStore = useContext(CartContext);
  const quantity = useSignal(1);

  const notification = useSignal<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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

  const setFeaturedImage = $((img: ProductImage) => {
    console.log("setFeaturedImage called", img);
  });

  // Find the featured image or default to the first one
  const images = product.productImages || [];
  const featuredImage = images.find((img) => img.isFeatured) || images[0];
  const imageUrl =
    featuredImage?.originalUrl || "/assets/images/placeholder.jpg";
  const imageAltText = featuredImage?.altText || product.name;

  return (
    <div class="container mx-auto max-w-6xl p-6">
      <div class="flex flex-col gap-8 md:flex-row">
        {/* Left Column - Product Images */}
        <div class="md:w-1/2">
          <div class="lg:w[40rem] flex items-center justify-center overflow-hidden rounded-lg bg-[var(--dark-red)] md:h-[37rem]">
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
                  class={`h-22 w-15 flex-shrink-0 overflow-hidden rounded-md border md:h-32 md:w-24 ${
                    img.id === featuredImage?.id
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  onClick$={() => {
                    setFeaturedImage(img);
                  }}
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
            <Link href="/" class="text-gray-400 hover:text-gray-300">
              Home
            </Link>
            <span class="mx-2 text-gray-400">›</span>
            <Link href="/products" class="text-gray-300 hover:text-gray-300">
              Products
            </Link>
            <span class="mx-2 text-gray-400">›</span>
            <span class="text-gray-100">{product.name}</span>
          </div>

          {/* Product Title and Brand */}
          <h1 class="gothic-title text-3xl text-red-800 md:mb-2 md:text-6xl">
            {product.name}
          </h1>
          {product.brand && (
            <p class="text-lg text-gray-300 md:mb-4">by {product.brand}</p>
          )}

          {/* Price */}
          <div class="mb-4">
            <p class="font-jost text-2xl font-bold text-gray-100">
              ${product.price.toFixed(2)}
            </p>
            {product.shippingPrice > 0 && (
              <p class="font-jost text-sm text-gray-500">
                + ${product.shippingPrice.toFixed(2)} Shipping
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div class="md:mb-6">
            {product.stockLevel > 0 ? (
              <div>
                <p class="font-semibold text-green-600">
                  In Stock ({product.stockLevel} available)
                </p>
                <div class="mt-4">
                  <label for="quantity" class="mr-4">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    min="1"
                    max={product.stockLevel}
                    // CHANGED: Use bind:value to two-way bind to the signal
                    bind:value={quantity}
                    class="w-20 rounded border border-gray-300 p-1 text-center"
                  />
                </div>
              </div>
            ) : (
              <p class="font-semibold text-red-600">Out of Stock</p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            // class="mb-6 w-full rounded-md bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-200 ease-in-out hover:bg-blue-700"
            class="glowing-btn animate-pulse-glow cursor font-inter mt-4 mb-4 w-full cursor-pointer rounded-sm border border-[#8a0303] bg-black/50 px-8 py-3 text-lg tracking-wider text-white uppercase md:mt-4 md:mb-8"
            disabled={!product.stockLevel || cartStore.state.isLoading}
            onClick$={async () => {
              console.log(
                `[UI] Button Clicked. Adding product ${product.id} with quantity ${quantity.value}.`,
              );
              notification.value = null; // Clear previous message
              try {
                await cartStore.addToCart(product.id, quantity.value);
                notification.value = {
                  message: "Item added to cart!",
                  type: "success",
                };
                // Optional: hide notification after 3 seconds
                setTimeout(() => (notification.value = null), 3000);
              } catch (error) {
                console.error("Failed to add to cart:", error);
                notification.value = {
                  message: "Could not add item.",
                  type: "error",
                };
              }
            }}
          >
            {cartStore.state.isLoading
              ? "Adding..."
              : product.stockLevel > 0
                ? "Add to Cart"
                : "Unavailable"}
          </button>

          {notification.value && (
            <div
              class={`mt-2 mb-4 rounded-md p-3 text-sm ${
                notification.value.type === "success"
                  ? "bg-green-800 text-green-100"
                  : "bg-red-800 text-red-100"
              }`}
            >
              {notification.value.message}
            </div>
          )}

          {/* Product Description */}
          <div class="mb-6">
            <h2 class="font-rocker mb-2 text-2xl font-semibold text-gray-300">
              Description
            </h2>
            <div
              class="product-description"
              dangerouslySetInnerHTML={product.description}
            ></div>
          </div>

          {/* Additional Info (Optional) */}
          {product.categoryDetails && (
            <div class="md:mb-6">
              <h2 class="font-rocker mb-2 text-2xl font-semibold text-gray-300">
                Details
              </h2>
              <p class="text-gray-400">Category: {product.categoryDetails}</p>
            </div>
          )}
        </div>
      </div>

      {/* Back to Products Link */}
      <div class="mt-4 md:mt-8">
        <Link
          href="/products"
          class="flex items-center text-red-600 hover:underline"
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
