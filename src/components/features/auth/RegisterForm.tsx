import { component$ } from "@builder.io/qwik";
import { type ActionStore, Form } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";

interface RegisterFormProps {
  action: ActionStore<any, any>;
}

export const RegisterForm = component$<RegisterFormProps>(({ action }) => {
  return (
    <Form action={action} class="space-y-4">
      <div>
        <Input name="username" type="text" label="Username" required />
        {action.value?.fieldErrors?.username && (
          <p class="mt-1 text-sm text-red-500">
            {action.value.fieldErrors.username}
          </p>
        )}
      </div>
      <div>
        <Input name="email" type="email" label="Email" required />
        {action.value?.fieldErrors?.email && (
          <p class="mt-1 text-sm text-red-500">
            {action.value.fieldErrors.email}
          </p>
        )}
      </div>
      <div>
        <Input name="password" type="password" label="Password" required />
        {action.value?.fieldErrors?.password && (
          <p class="mt-1 text-sm text-red-500">
            {action.value.fieldErrors.password}
          </p>
        )}
      </div>

      {action.value?.message && (
        <p class="rounded-md bg-red-100 p-3 text-sm text-red-500">
          {action.value.message}
        </p>
      )}

      <Button type="submit" isLoading={action.isRunning} class="w-full">
        Register
      </Button>
    </Form>
  );
});
