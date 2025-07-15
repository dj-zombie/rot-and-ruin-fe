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
      // class="group product-card flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg"
      class="product-card group relative flex w-full flex-col overflow-visible p-2 md:p-4"
    >
      <div class="flex h-[10rem] w-full items-center justify-center overflow-hidden bg-[var(--dark-red)] md:h-[15rem] lg:h-[25rem] xl:h-[35rem]">
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
        {/* {product.brand && (
          <p class="mb-1 text-sm text-gray-500">{product.brand}</p>
        )} */}
        {/* <h2 class="mb-2 text-lg leading-tight font-semibold text-gray-800 transition-colors duration-200 ease-in-out group-hover:text-blue-600"> */}
        <h2 class="font-secondary text-center text-base! text-white lg:text-xl!">
          {product.name}
        </h2>
        {/* <p class="mt-auto text-xl font-bold text-gray-900"> */}
        <p class="ghost-text mt-auto pt-1 text-center text-xl">
          ${product.price.toFixed(2)}
        </p>
        <button
          // class="mt-4 self-stretch rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-blue-700"
          class="glowing-btn animate-pulse-glow mt-4 cursor-pointer rounded-sm border border-[#8a0303] bg-black/50 px-8 py-3 text-lg tracking-wider text-white uppercase"
          onClick$={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Add to cart: ${product.name}`);
          }}
        >
          View Details
        </button>
      </div>
    </Link>
  );
});
