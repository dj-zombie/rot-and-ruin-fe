import { component$, useContext, useTask$ } from "@builder.io/qwik";
import {
  routeAction$,
  zod$,
  z,
  // Form,
  routeLoader$,
  useNavigate,
  type RequestEventLoader, // ✅ Import the type for the loader event
} from "@builder.io/qwik-city";
import { LoginForm } from "~/components/features/auth/LoginForm";
import * as authService from "~/services/auth-service";
import { AuthContext } from "~/stores/auth-store";

// The action remains the same - it is correct.
export const useLoginAction = routeAction$(
  async (data, { fail, redirect }) => {
    try {
      await authService.login(data);
    } catch (error: any) {
      console.log(error);
      return fail(401, {
        message: "Invalid username or password.",
      });
    }
    throw redirect(302, "/");
  },
  zod$({
    username: z.string().min(1, "Username is required."),
    password: z.string().min(1, "Password is required."),
  }),
);

// ✅ FIX: Explicitly type the destructured argument from RequestEventLoader
// This loader's only job is to check for the URL parameter on the server.
export const useLoginLoader = routeLoader$(({ url }: RequestEventLoader) => {
  return {
    isRegistered: url.searchParams.get("registered") === "true",
  };
});

export default component$(() => {
  const loginAction = useLoginAction();
  const loginLoader = useLoginLoader();
  const authState = useContext(AuthContext);
  const nav = useNavigate();

  // This task correctly handles redirecting a user who is already logged in.
  // It runs on the client and reacts to the global auth state provided by the root layout.
  useTask$(({ track }) => {
    track(() => authState.user);

    if (authState.user !== null && authState.user !== undefined) {
      console.log("User is logged in, redirecting:", authState.user);
      nav("/");
    }
  });

  return (
    <div class="container mx-auto max-w-md p-4">
      <h1 class="mb-6 text-center text-3xl font-bold">Login to Your Account</h1>
      {loginLoader.value.isRegistered && (
        <div
          class="relative mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
          role="alert"
        >
          Registration successful! Please log in.
        </div>
      )}
      <LoginForm action={loginAction} />
    </div>
  );
});
