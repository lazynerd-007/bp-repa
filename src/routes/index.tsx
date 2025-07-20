import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

// This uses routeLoader$ for server-side redirection
export const useRedirect = routeLoader$(async ({ redirect }) => {
  // Server-side redirect to the login page
  throw redirect(302, '/login');
});

export default component$(() => {
  // This component won't actually render because the redirect will happen first
  return (
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
      <p>Redirecting to login page...</p>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Mini Finance Dashboard",
  meta: [
    {
      name: "description",
      content: "A comprehensive tool for finance professionals to manage merchant loans",
    },
  ],
};
