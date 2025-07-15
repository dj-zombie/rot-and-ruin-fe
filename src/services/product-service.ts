// product-service.ts
import { apiClient } from "./api";
import type { Product } from "~/types/product";

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    return apiClient.get<Product[]>("/Products");
  },

  getProductById: async (id: string): Promise<Product> => {
    return apiClient.get<Product>(`/products/${id}`);
  },
};
