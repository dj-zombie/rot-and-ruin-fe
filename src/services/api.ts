// src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL;

// Core fetch function with error handling
async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
    credentials: "include",
  });

  if (!response.ok) {
    let errorMessage = `API Error ${response.status} for ${url}`;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || JSON.stringify(errorData);
      } catch (jsonParseError) {
        console.error(
          `Failed to parse JSON error response for ${url}:`,
          jsonParseError,
        );
        errorMessage = `API Error ${response.status}: Server returned malformed JSON error response.`;
      }
    } else if (response.status === 204) {
      errorMessage = `API Error ${response.status}: No Content`;
    } else {
      try {
        const textError = await response.text();
        errorMessage =
          textError ||
          `API Error ${response.status}: No specific error message provided.`;
      } catch (textParseError) {
        console.error(
          `Failed to read text error response for ${url}:`,
          textParseError,
        );
        errorMessage = `API Error ${response.status}: Could not read response body.`;
      }
    }
    throw new Error(errorMessage);
  }

  // Handle successful 204 responses
  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}

// RESTful API client with method helpers
export const apiClient = {
  // GET request
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    console.log(`API: ${API_BASE_URL}${url}`);
    return fetchWithErrorHandling<T>(url, {
      method: "GET",
      credentials: "include",
      ...options,
    });
  },

  // POST request with JSON body
  async post<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return fetchWithErrorHandling<T>(url, {
      method: "POST",
      credentials: "include",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  // PUT request with JSON body
  async put<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return fetchWithErrorHandling<T>(url, {
      method: "PUT",
      credentials: "include",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  // PATCH request with JSON body
  async patch<T>(url: string, data?: any, options?: RequestInit): Promise<T> {
    return fetchWithErrorHandling<T>(url, {
      method: "PATCH",
      credentials: "include",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  // DELETE request
  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return fetchWithErrorHandling<T>(url, {
      method: "DELETE",
      credentials: "include",
      ...options,
    });
  },

  // The original function is still available if needed
  async request<T>(url: string, options?: RequestInit): Promise<T> {
    return fetchWithErrorHandling<T>(url, options);
  },
};
