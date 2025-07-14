// src/services/image-service.ts
export interface ImageOptions {
  width?: number;
  height?: number;
  format?: "webp" | "jpg" | "png";
}

const API_BASE_URL =
  import.meta.env.VITE_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const imageService = {
  getOptimizedImageUrl: (
    imageUrl: string,
    options: ImageOptions = {},
  ): string => {
    if (!imageUrl) return ""; // Return empty string or placeholder for missing images

    const { width, height, format } = options;
    const params = new URLSearchParams();

    if (width) params.append("width", width.toString());
    if (height) params.append("height", height.toString());
    if (format) params.append("format", format);

    const queryString = params.toString();
    return `${API_BASE_URL}/images/${encodeURIComponent(imageUrl)}${queryString ? `?${queryString}` : ""}`;
  },
};
