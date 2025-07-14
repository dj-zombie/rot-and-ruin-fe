// src/components/features/product/ProductCard.tsx
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Product } from "~/types/product";
import { OptimizedImage } from "~/components/ui/OptimizedImage";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = component$((props: ProductCardProps) => {
  const { product } = props;

  // Use product.productImages (camelCase)
  // Add a defensive check for product.productImages being undefined or null
  // This ensures .find() is only called if productImages is an array
  const images = product.productImages || []; // Fallback to an empty array if productImages is null/undefined

  // Find the featured image or default to the first one, or a placeholder
  const featuredImage = images.find((img) => img.isFeatured) || images[0]; // Use img.isFeatured (camelCase)

  // Use optional chaining defensive for featuredImage, just in case `images` was empty
  const imageUrl =
    featuredImage?.originalUrl || "/assets/images/placeholder.jpg"; // Use gridThumbnailUrl (camelCase)
  const imageAltText = featuredImage?.altText || product.name; // Use altText (camelCase) and product.name (camelCase)

  return (
    <Link
      href={product.productUrl}
      class="group block flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg"
    >
      <div class="flex h-[40] w-full items-center justify-center overflow-hidden bg-gray-100">
        <OptimizedImage
          src={imageUrl}
          alt={imageAltText}
          width={400}
          height={400}
          sizes="(min-width: 768px) 50vw, 100vw"
          class="h-full w-full object-contain"
        />
        {/* <OptimizedImage
          src={imageUrl}
          alt={imageAltText}
          width={400}
          height={400}
          format="webp"
          class="h-full w-full object-contain"
        /> */}
      </div>

      <div class="flex flex-grow flex-col p-4">
        {product.brand && (
          <p class="mb-1 text-sm text-gray-500">{product.brand}</p>
        )}
        <h2 class="mb-2 text-lg leading-tight font-semibold text-gray-800 transition-colors duration-200 ease-in-out group-hover:text-blue-600">
          {product.name}
        </h2>
        <p class="mt-auto text-xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <button
          class="mt-4 self-stretch rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-blue-700"
          onClick$={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Add to cart: ${product.name}`);
          }}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
});
