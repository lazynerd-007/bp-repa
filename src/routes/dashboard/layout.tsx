import { component$, Slot } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Sidebar from "~/components/sidebar/sidebar";

export default component$(() => {
  return (
    <div class="dashboard-container">
      <Sidebar />
      <main class="main-content">
        <Slot />
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Dashboard - BP loan Dashboard",
  meta: [
    {
      name: "description",
      content: "BP Loan Dashboard for managing merchant loans",
    },
  ],
}; 