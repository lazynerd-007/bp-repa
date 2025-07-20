import { component$, useSignal } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import ImgFinanceIllustration from "~/media/images/finance-illustration.svg?jsx";

export default component$(() => {
  const email = useSignal("");
  const password = useSignal("");
  const rememberMe = useSignal(false);
  const nav = useNavigate();

  return (
    <div class="login-container">
      <div class="login-form">
        <div class="login-header">
          <h1>Mini Finance Dashboard</h1>
          <p>Log in to manage merchant loans, track repayments, and generate financial reports.</p>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="finance@example.com" 
            value={email.value} 
            onInput$={(e, target) => email.value = target.value}
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password.value} 
            onInput$={(e, target) => password.value = target.value}
          />
        </div>

        <div class="checkbox-group">
          <input 
            type="checkbox" 
            id="remember-me" 
            checked={rememberMe.value} 
            onChange$={(e, target) => rememberMe.value = target.checked}
          />
          <label for="remember-me">Remember me</label>
        </div>

        <button 
          class="login-button" 
          onClick$={() => {
            // In a real app, we would validate credentials here
            nav.path = "/dashboard";
          }}
        >
          Sign in
        </button>

        <div class="forgot-password">
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </div>

      <div class="login-illustration">
        <ImgFinanceIllustration />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Login - Mini Finance Dashboard",
  meta: [
    {
      name: "description",
      content: "Log in to the Mini Finance Dashboard to manage merchant loans and repayments",
    },
  ],
}; 