// import { createContextId, useStore, $ } from "@builder.io/qwik";
// import { authService } from "~/services/auth-service";
// import type { User } from "~/types/user";

// export interface AuthStore {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;

//   login: (email: string, password: string) => Promise<void>;
//   register: (email: string, password: string, name?: string) => Promise<void>;
//   logout: () => Promise<void>;
//   refreshToken: () => Promise<void>;
// }

// export const AuthContext = createContextId<AuthStore>("auth-context");

// export const useAuthStore = () => {
//   return useStore<AuthStore>(
//     {
//       user: null,
//       isAuthenticated: false,
//       isLoading: false,
//       error: null,

//       login: $(async function (
//         this: AuthStore,
//         email: string,
//         password: string,
//       ) {
//         this.isLoading = true;
//         this.error = null;
//         try {
//           const userData = await authService.login(email, password);
//           this.user = userData;
//           this.isAuthenticated = true;
//           // Use globalThis for browser-only code
//           if (typeof globalThis.localStorage !== "undefined") {
//             globalThis.localStorage.setItem("user", JSON.stringify(userData));
//           }
//         } catch (error) {
//           this.error = error instanceof Error ? error.message : "Login failed";
//           this.isAuthenticated = false;
//         } finally {
//           this.isLoading = false;
//         }
//       }),

//       register: $(async function (
//         this: AuthStore,
//         email: string,
//         password: string,
//         name?: string,
//       ) {
//         this.isLoading = true;
//         this.error = null;
//         try {
//           const userData = await authService.register(email, password, name);
//           this.user = userData;
//           this.isAuthenticated = true;
//           if (typeof globalThis.localStorage !== "undefined") {
//             globalThis.localStorage.setItem("user", JSON.stringify(userData));
//           }
//         } catch (error) {
//           this.error =
//             error instanceof Error ? error.message : "Registration failed";
//           this.isAuthenticated = false;
//         } finally {
//           this.isLoading = false;
//         }
//       }),

//       logout: $(async function (this: AuthStore) {
//         try {
//           await authService.logout();
//           this.user = null;
//           this.isAuthenticated = false;
//           if (typeof globalThis.localStorage !== "undefined") {
//             globalThis.localStorage.removeItem("user");
//           }
//         } catch (error) {
//           this.error = error instanceof Error ? error.message : "Logout failed";
//         }
//       }),

//       refreshToken: $(async function (this: AuthStore) {
//         try {
//           const userData = await authService.refreshToken();
//           this.user = userData;
//           this.isAuthenticated = true;
//           if (typeof globalThis.localStorage !== "undefined") {
//             globalThis.localStorage.setItem("user", JSON.stringify(userData));
//           }
//         } catch (error) {
//           console.log(error);
//           await this.logout();
//         }
//       }),
//     },
//     {
//       deep: true,
//     },
//   );
// };

// // Optional: Add initialization logic
// export const initializeAuthStore = (store: AuthStore) => {
//   // Check for existing user in localStorage on client-side
//   if (typeof globalThis.localStorage !== "undefined") {
//     const savedUser = globalThis.localStorage.getItem("user");
//     if (savedUser) {
//       try {
//         const parsedUser = JSON.parse(savedUser);
//         store.user = parsedUser;
//         store.isAuthenticated = true;
//       } catch {
//         globalThis.localStorage.removeItem("user");
//       }
//     }
//   }
// };
