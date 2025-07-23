import { apiClient } from "./api";
import type { LoginPayload, RegisterPayload, User } from "~/types/user";

const AUTH_BASE_URL = "/Auth";

/**
 * Registers a new user.
 * @param payload - The registration data.
 * @returns A promise that resolves to the newly created user or relevant response.
 */
export const register = (payload: RegisterPayload): Promise<unknown> => {
  return apiClient.post(`${AUTH_BASE_URL}/Register`, payload);
};

/**
 * Logs in a user.
 * Your backend MUST handle setting an HttpOnly session cookie upon success.
 * @param payload - The login credentials.
 * @returns A promise that resolves to the logged-in user's data.
 */
export const login = (payload: LoginPayload): Promise<User> => {
  return apiClient.post<User>(`${AUTH_BASE_URL}/Login`, payload);
};

/**
 * Logs out the current user.
 * This function calls the backend logout endpoint, which should clear the session cookie.
 * @returns A promise that resolves when logout is complete.
 */
export const logout = (): Promise<void> => {
  // NOTE: You need to create this endpoint in your .NET backend.
  // It should invalidate the session/cookie.
  return apiClient.post<void>(`${AUTH_BASE_URL}/Logout`);
};

/**
 * Fetches the currently authenticated user's profile.
 * This relies on the browser sending the session cookie automatically.
 * @returns A promise that resolves with the current user's data.
 */
export const getMe = async (): Promise<User | null> => {
  try {
    console.log("Calling /Me endpoint...");
    const response = await apiClient.get<{ user: User | null }>(
      `${AUTH_BASE_URL}/me`,
    );
    console.log("GetMe full response:", response);
    console.log("GetMe response type:", typeof response);
    console.log("GetMe user property:", response.user);

    if (response && typeof response === "object" && "user" in response) {
      return response.user;
    } else {
      console.error("Unexpected response format:", response);
      return null;
    }
  } catch (error) {
    console.error("getMe error:", error);
    return null;
  }
};
