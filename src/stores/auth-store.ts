import { createContextId } from "@builder.io/qwik";
import type { User } from "~/types/user";

export interface AuthState {
  user: User | null;
}

export const AuthContext = createContextId<AuthState>("app.auth-context");
