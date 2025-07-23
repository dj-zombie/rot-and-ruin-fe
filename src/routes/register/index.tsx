import { component$ } from "@builder.io/qwik";
import { routeAction$, zod$, z } from "@builder.io/qwik-city";
import { RegisterForm } from "~/components/features/auth/RegisterForm";
import * as authService from "~/services/auth-service";

// Use Zod for server-side validation.
export const useRegisterAction = routeAction$(
  async (data, { fail, redirect }) => {
    try {
      await authService.register(data);
    } catch (error: any) {
      // If backend returns an error (e.g., username taken), display it.
      return fail(400, {
        message: error.message || "Registration failed. Please try again.",
      });
    }

    // On success, redirect to the login page with a success message.
    throw redirect(302, "/login?registered=true");
  },
  zod$({
    username: z.string().min(3, "Username must be at least 3 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
  }),
);

export default component$(() => {
  const registerAction = useRegisterAction();

  return (
    <div class="container mx-auto max-w-md p-4">
      <h1 class="mb-6 text-center text-3xl font-bold">Create an Account</h1>
      <RegisterForm action={registerAction} />
    </div>
  );
});
