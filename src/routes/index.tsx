import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div>
        <h1 class="p-10 text-center text-3xl font-bold">
          Hi 👋 Rot and Ruin is currently getting an upgrade. We'll be back
          soon!!
        </h1>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Rot and Ruin",
  meta: [
    {
      name: "description",
      content: "Rot and Ruin Store",
    },
  ],
};
