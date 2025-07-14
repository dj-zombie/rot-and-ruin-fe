import { fetcher } from "./api";
import type { Product } from "~/types/product"; // Adjust path if needed

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    return fetcher<Product[]>("/Products");
  },

  getProductById: async (id: string): Promise<Product> => {
    return fetcher<Product>(`/products/${id}`);
  },
};
