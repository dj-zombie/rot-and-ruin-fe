// src/services/api.ts
const API_BASE_URL =
  import.meta.env.VITE_PUBLIC_API_BASE_URL

export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "text/plain",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let errorMessage = `API Error ${response.status} for ${url}`;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      try {
        const errorData = await response.json();
        // Assuming your .NET errors might have a 'message' or similar field
        errorMessage = errorData.message || JSON.stringify(errorData);
      } catch (jsonParseError) {
        // If it claims to be JSON but fails to parse, it's malformed JSON
        console.error(
          `Failed to parse JSON error response for ${url}:`,
          jsonParseError,
        );
        errorMessage = `API Error ${response.status}: Server returned malformed JSON error response.`;
      }
    } else if (response.status === 204) {
      // Handle 204 No Content specifically, it has no body
      errorMessage = `API Error ${response.status}: No Content`;
    } else {
      // Fallback: Try to read as plain text
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

  // Handle successful 204 responses (e.g., successful DELETE)
  if (response.status === 204) {
    return null as T; // Or undefined, or an empty object, depending on your API contract
  }

  console.log(`URL: ${url}`, response.body);
  console.table(response.body);
  // For successful responses, always parse as JSON
  return response.json() as Promise<T>;
}
