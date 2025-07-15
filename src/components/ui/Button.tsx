import { component$, Slot, QRL } from "@builder.io/qwik";
import { classNames } from "~/utils"; // Assuming you have a utility for combining class names

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "ghost";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  class?: string;
  disabled?: boolean;
  onClick$?: QRL<() => void> | QRL<(event: MouseEvent) => void>;
  form?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  ariaLabel?: string;
}

export const Button = component$<ButtonProps>(
  ({
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    fullWidth = false,
    isLoading = false,
    loadingText,
    ariaLabel,
    class: className,
    ...props
  }) => {
    // Define base styles
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

    // Define variant styles
    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
      outline:
        "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-blue-500",
    };

    // Define size styles
    const sizeStyles = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-2.5 text-lg",
      xl: "px-6 py-3 text-xl",
    };

    // Define disabled styles
    const disabledStyles = "opacity-50 cursor-not-allowed";

    // Define full width styles
    const fullWidthStyles = "w-full";

    // Combine styles based on props
    const buttonClasses = classNames(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      disabled ? disabledStyles : "",
      fullWidth ? fullWidthStyles : "",
      className || "",
    );

    return (
      <button
        type={type}
        disabled={disabled || isLoading}
        class={buttonClasses}
        aria-label={ariaLabel}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              class="mr-2 -ml-1 h-4 w-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {loadingText || <Slot />}
          </>
        ) : (
          <Slot />
        )}
      </button>
    );
  },
);
