import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const email = useSignal("");
  const submitted = useSignal(false);

  return (
    <div class="login-container">
      <div class="login-form">
        <div class="login-header">
          <h1>Forgot Password</h1>
          <p>Enter your email address below and we'll send you instructions to reset your password.</p>
        </div>

        {!submitted.value ? (
          <>
            <div class="form-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="finance@example.com" 
                value={email.value} 
                onInput$={(e, target) => email.value = target.value}
              />
            </div>

            <button 
              class="login-button" 
              onClick$={() => {
                if (email.value) {
                  submitted.value = true;
                }
              }}
            >
              Reset Password
            </button>
            
            <div class="forgot-password">
              <a href="/login">Back to login</a>
            </div>
          </>
        ) : (
          <div class="success-message">
            <p>If there's an account associated with {email.value}, we've sent password reset instructions.</p>
            <button 
              class="login-button" 
              style="margin-top: 1.5rem"
              onClick$={() => window.location.href = "/login"}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>

      <div class="login-illustration">
        <img src="/images/finance-illustration.svg" alt="Finance dashboard illustration" />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Forgot Password - Mini Finance Dashboard",
  meta: [
    {
      name: "description",
      content: "Reset your password for the Mini Finance Dashboard",
    },
  ],
}; 