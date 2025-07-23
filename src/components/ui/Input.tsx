import { component$ } from "@builder.io/qwik";

interface InputProps {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
}

export const Input = component$<InputProps>(
  ({ name, type, label, required, placeholder, value }) => {
    return (
      <div class="mb-4">
        <label for={name} class="mb-2 block text-sm font-medium text-gray-700">
          {label}
          {required && <span class="ml-1 text-red-500">*</span>}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          required={required}
          placeholder={placeholder}
          value={value}
          class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
    );
  },
);
