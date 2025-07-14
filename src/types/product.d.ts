// src/types/product.d.ts

export interface ProductImage {
  id: string; // guid
  originalUrl: string;
  thumbnailUrl: string;
  gridThumbnailUrl: string;
  highResolutionUrl: string;
  displayOrder: number; // integer
  isFeatured: boolean;
  altText: string;
  title: string;
  createdAt: string; // Added from your API response
  updatedAt: string; // Added from your API response
}

export interface Product {
  id: string; // guid
  name: string;
  brand: string;
  description: string;
  price: number; // decimal
  shippingPrice: number; // decimal
  productVisible: boolean;
  stockLevel: number; // integer
  categoryDetails: string;
  metaKeywords: string;
  metaDescription: string;
  productUrl: string;
  createdAt: string; // Added from your API response
  updatedAt: string; // Added from your API response
  productImages: ProductImage[]; // <-- CHANGED TO camelCase!
}

// Optionally, if you also want to type the "Product Grid" response:
export interface ProductGridItem {
  id: string; // guid
  name: string;
  productUrl: string;
  productVisible: boolean;
  price: number; // decimal
  gridThumbnailUrl: string;
}
