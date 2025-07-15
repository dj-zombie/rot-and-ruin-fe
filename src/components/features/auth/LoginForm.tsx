// import { component$, useSignal } from "@builder.io/qwik";
// import { useAuthStore } from "~/stores/auth-store";

// export const LoginPage = component$(() => {
//   const authStore = useAuthStore();
//   const email = useSignal("");
//   const password = useSignal("");

//   return (
//     <div>
//       {authStore.error && <p class="text-red-500">{authStore.error}</p>}

//       <form
//         preventdefault:submit
//         onSubmit$={() => {
//           authStore.login(email.value, password.value);
//         }}
//       >
//         <input type="email" bind:value={email} required placeholder="Email" />
//         <input
//           type="password"
//           bind:value={password}
//           required
//           placeholder="Password"
//         />
//         <button type="submit" disabled={authStore.isLoading}>
//           {authStore.isLoading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// });
