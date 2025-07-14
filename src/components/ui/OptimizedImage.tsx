// // src/components/OptimizedImage.tsx
// import { component$ } from "@builder.io/qwik";
// import { imageService } from "~/services/image-service";

// interface OptimizedImageProps {
//   src: string;
//   alt: string;
//   width?: number;
//   height?: number;
//   class?: string;
//   sizes?: string;
// }

// export const OptimizedImage = component$<OptimizedImageProps>((props) => {
//   const breakpoints = [320, 640, 768, 1024, 1280];
//   const defaultSizes = "(min-width: 1280px) 1280px, 100vw";

//   const generateSrcset = (format: "webp" | "jpg") => {
//     return breakpoints
//       .map((width) => {
//         const url = imageService.getOptimizedImageUrl(props.src, {
//           width,
//           height: Math.round(
//             (width / (props.width || 1)) * (props.height || 1),
//           ),
//           format,
//         });
//         return `${url} ${width}w`;
//       })
//       .join(", ");
//   };

//   return (
//     <picture>
//       <source
//         type="image/webp"
//         srcset={generateSrcset("webp")}
//         sizes={props.sizes || defaultSizes}
//       />
//       <source
//         type="image/jpeg"
//         srcset={generateSrcset("jpg")}
//         sizes={props.sizes || defaultSizes}
//       />
//       <img
//         src={imageService.getOptimizedImageUrl(props.src, {
//           width: props.width,
//           height: props.height,
//           format: "jpg",
//         })}
//         alt={props.alt}
//         width={props.width}
//         height={props.height}
//         class={props.class}
//         loading="lazy"
//       />
//     </picture>
//   );
// });

// src/components/OptimizedImage.tsx
import { component$, useSignal, useTask$, $, type QRL } from "@builder.io/qwik";
import { imageService } from "~/services/image-service";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  class?: string;
  sizes?: string;
}

export const OptimizedImage = component$<OptimizedImageProps>((props) => {
  const imageRef = useSignal<HTMLImageElement>();
  const isLoaded = useSignal(false);
  const breakpoints = [320, 640, 768, 1024, 1280];
  const defaultSizes = "(min-width: 1280px) 1280px, 100vw";

  const generateSrcset = (format: "webp" | "jpg"): string => {
    return breakpoints
      .map((width) => {
        const aspectRatio = (props.width || 1) / (props.height || 1);
        const height = Math.round(width / aspectRatio);

        const url = imageService.getOptimizedImageUrl(props.src, {
          width,
          height,
          format,
        });
        return `${url} ${width}w`;
      })
      .join(", ");
  };

  // Use intersection observer to lazy load images
  useTask$(({ track }) => {
    track(() => imageRef.value);

    if (imageRef.value) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                observer.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: "50px", // Start loading 50px before the image enters the viewport
        },
      );

      observer.observe(imageRef.value);

      // Cleanup
      return () => {
        observer.disconnect();
      };
    }
  });

  // Generate a tiny placeholder
  const placeholderSrc = imageService.getOptimizedImageUrl(props.src, {
    width: 20,
    height: Math.round((20 / (props.width || 1)) * (props.height || 1)),
    format: "webp",
  });

  const onLoad$: QRL<() => void> = $(() => {
    isLoaded.value = true;
  });

  return (
    <div class="relative overflow-hidden">
      <picture
        class={{
          "transition-opacity duration-300": true,
          "opacity-100": isLoaded.value,
          "opacity-0": !isLoaded.value,
        }}
      >
        <source
          type="image/webp"
          srcset={generateSrcset("webp")}
          sizes={props.sizes || defaultSizes}
        />
        <source
          type="image/jpeg"
          srcset={generateSrcset("jpg")}
          sizes={props.sizes || defaultSizes}
        />
        <img
          ref={imageRef}
          data-src={imageService.getOptimizedImageUrl(props.src, {
            width: props.width,
            height: props.height,
            format: "jpg",
          })}
          alt={props.alt}
          width={props.width}
          height={props.height}
          class={[props.class, "transition-opacity duration-300"]
            .filter(Boolean)
            .join(" ")}
          onLoad$={onLoad$}
          loading="lazy"
        />
      </picture>

      {/* Blur-up placeholder */}
      <img
        src={placeholderSrc}
        width={props.width}
        height={props.height}
        alt=""
        class={{
          "absolute inset-0 h-full w-full scale-110 object-cover blur-lg filter transition-opacity duration-300":
            true,
          "opacity-0": isLoaded.value,
          "opacity-100": !isLoaded.value,
        }}
      />
    </div>
  );
});
