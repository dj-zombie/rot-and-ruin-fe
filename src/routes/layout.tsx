import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  // type Signal,
} from "@builder.io/qwik";
import {
  routeLoader$,
  routeAction$,
  type RequestEventAction,
} from "@builder.io/qwik-city";
import { Header } from "~/components/ui/Header";
import { getMe, logout as logoutService } from "~/services/auth-service";
import { AuthContext, type AuthState } from "~/stores/auth-store";

// ✅ CORRECT: Loaders are defined in a route file. This runs for every route.
export const useUserLoader = routeLoader$(async () => {
  try {
    const user = await getMe();
    console.log("User from getMe:", user); // Debug log
    return { user: user || null }; // Ensure null, not undefined
  } catch (error) {
    console.log("User loader error:", error);
    return { user: null };
  }
});

// ✅ CORRECT: Actions are defined in a route file. This can be used by child components.
export const useLogoutAction = routeAction$(
  async (_data: unknown, event: RequestEventAction) => {
    try {
      await logoutService();
    } catch (e) {
      console.error("Server logout failed", e);
    } finally {
      // Delete the cookie
      event.cookie.delete("is-logged-in", { path: "/" });
    }

    // Instead of throwing, return the redirect
    // Option 1: Use redirect method directly (recommended)
    return event.redirect(302, "/");

    // Option 2: If you need to use throw, wrap it in a function
    // const doRedirect = () => {
    //   throw event.redirect(302, "/");
    // };
    // doRedirect();
  },
);

export default component$(() => {
  const userLoaderSignal = useUserLoader();

  console.log("User loader value:", userLoaderSignal.value);

  // Initialize the store correctly - make sure user is actually null if not logged in
  const authState = useStore<AuthState>({
    user: userLoaderSignal.value?.user ?? null,
  });

  // Provide this reactive store to the entire component tree via context.
  useContextProvider(AuthContext, authState);

  // This component now defines the layout for EVERY page.
  return (
    <>
      <Header />
      <main class="min-h-screen bg-neutral-900 pt-20">
        <Slot />{" "}
        {/* The actual page component (e.g., login, products) renders here */}
      </main>
    </>
  );
});
