// import type { User } from "~/types/user";
// import { apiClient } from "./api";

// export const authService = {
//   async login(email: string, password: string): Promise<User> {
//     const response = await apiClient.post("/auth/login", { email, password });
//     return response.data;
//   },

//   async register(
//     email: string,
//     password: string,
//     name?: string,
//   ): Promise<User> {
//     const response = await apiClient.post("/auth/register", {
//       email,
//       password,
//       name,
//     });
//     return response.data;
//   },

//   async logout(): Promise<void> {
//     await apiClient.post("/auth/logout");
//   },

//   async refreshToken(): Promise<User> {
//     const response = await apiClient.post("/auth/refresh-token");
//     return response.data;
//   },
// };
