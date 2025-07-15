// src/utils/cookies.ts
import { isBrowser } from "@builder.io/qwik/build";

const CART_ID_COOKIE_NAME = "cartId";

/**
 * Gets the cart ID from the document's cookie string.
 * This is the primary way to read the cookie on the client side.
 */
export const getCartIdFromBrowser = (): string | null => {
  if (!isBrowser) return null;
  const match = document.cookie.match(
    new RegExp("(^| )" + CART_ID_COOKIE_NAME + "=([^;]+)"),
  );
  return match ? match[2] : null;
};

/**
 * Parses the cart ID from a raw cookie header string.
 * This is used on the server side within a routeLoader$.
 */
export const getCartIdFromServerCookie = (
  cookieHeader: string | null,
): string | null => {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(
    new RegExp("(^| )" + CART_ID_COOKIE_NAME + "=([^;]+)"),
  );
  return match ? match[2] : null;
};

/**
 * Saves the cart ID to a cookie. Only runs in the browser.
 */
export const setCartIdCookie = (cartId: string) => {
  if (isBrowser) {
    // Set cookie to expire in 30 days
    const d = new Date();
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${CART_ID_COOKIE_NAME}=${cartId};${expires};path=/`;
    console.log(`[Cookie] Set cartId: ${cartId}`);
  }
};

/**
 * Deletes the cart ID cookie. Only runs in the browser.
 */
export const deleteCartIdCookie = () => {
  if (isBrowser) {
    document.cookie = `${CART_ID_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log("[Cookie] Deleted cartId.");
  }
};
