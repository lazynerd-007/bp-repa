import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Loader from "~/components/loader/loader";

export default component$(() => {
  const isLoading = useSignal(false);
  const isSaving = useSignal(false);
  const showSuccessMessage = useSignal(false);
  const currentPassword = useSignal("");
  const newPassword = useSignal("");
  const confirmPassword = useSignal("");
  const otpValue = useSignal("");
  
  const passwordChangeStore = useSignal({
    step: 1, // 1: Password input, 2: OTP verification
    otpSent: false,
    isSubmitting: false,
    errorMessage: ""
  });
  
  const profileData = useSignal({
    fullName: "John Smith",
    email: "john@bploans.com",
    phone: "233-123-4567",
    joinedDate: "2022-05-15"
  });
  
  const requestOTP = $(async () => {
    if (!currentPassword.value || !newPassword.value || !confirmPassword.value) return;
    if (newPassword.value !== confirmPassword.value) {
      passwordChangeStore.value.errorMessage = "New password and confirmation do not match";
      return;
    }
    
    passwordChangeStore.value.isSubmitting = true;
    
    try {
      // Simulate API call to send OTP
      isLoading.value = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      isLoading.value = false;
      passwordChangeStore.value.isSubmitting = false;
      passwordChangeStore.value.otpSent = true;
      passwordChangeStore.value.step = 2;
      passwordChangeStore.value.errorMessage = "";
    } catch (error) {
      passwordChangeStore.value.errorMessage = "Failed to send OTP. Please try again.";
      passwordChangeStore.value.isSubmitting = false;
      isLoading.value = false;
    }
  });

  const changePassword = $(async () => {
    if (!otpValue.value || otpValue.value.length < 6) {
      passwordChangeStore.value.errorMessage = "Please enter a valid OTP";
      return;
    }
    
    passwordChangeStore.value.isSubmitting = true;
    
    try {
      // Simulate API call
      isLoading.value = true;
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset fields
      currentPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
      otpValue.value = "";
      passwordChangeStore.value.step = 1;
      passwordChangeStore.value.otpSent = false;
      
      showSuccessMessage.value = true;
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
      
      isLoading.value = false;
      passwordChangeStore.value.isSubmitting = false;
    } catch (error) {
      passwordChangeStore.value.errorMessage = "Invalid OTP or password change failed. Please try again.";
      passwordChangeStore.value.isSubmitting = false;
      isLoading.value = false;
    }
  });

  return (
    <>
      <div class="dashboard-header">
        <h1>Profile Settings</h1>
        <p>Manage your personal information and account preferences.</p>
      </div>

      {isLoading.value ? (
        <Loader />
      ) : (
        <div class="card">
          {showSuccessMessage.value && (
            <div class="success-message" style="margin-bottom: 1.5rem;">
              <p>Password updated successfully!</p>
            </div>
          )}
          
          <div style="margin-bottom: 2rem;">
            <div class="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={profileData.value.fullName}
                readOnly
                style="background-color: #f5f5f5;"
              />
            </div>
            
            <div style="display: flex; gap: 1rem;">
              <div class="form-group" style="flex: 1;">
                <label>Email</label>
                <input 
                  type="email" 
                  value={profileData.value.email}
                  readOnly
                  style="background-color: #f5f5f5;"
                />
              </div>
              
              <div class="form-group" style="flex: 1;">
                <label>Phone</label>
                <input 
                  type="text" 
                  value={profileData.value.phone}
                  readOnly
                  style="background-color: #f5f5f5;"
                />
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label>Change Password</label>
            {passwordChangeStore.value.step === 1 ? (
              <div style="display: flex; gap: 1rem;">
                <input 
                  type="password" 
                  placeholder="Current Password"
                  style="flex: 1;"
                  value={currentPassword.value}
                  onInput$={(_, target) => currentPassword.value = target.value}
                  disabled={passwordChangeStore.value.isSubmitting}
                />
                <input 
                  type="password" 
                  placeholder="New Password" 
                  style="flex: 1;"
                  value={newPassword.value}
                  onInput$={(_, target) => newPassword.value = target.value}
                  disabled={passwordChangeStore.value.isSubmitting}
                />
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  style="flex: 1;"
                  value={confirmPassword.value}
                  onInput$={(_, target) => confirmPassword.value = target.value}
                  disabled={passwordChangeStore.value.isSubmitting}
                />
              </div>
            ) : (
              <div>
                <div class="form-group">
                  <label>Enter OTP sent to your phone</label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otpValue.value}
                    onInput$={(_, target) => otpValue.value = target.value}
                    disabled={passwordChangeStore.value.isSubmitting}
                    maxLength={6}
                    style="max-width: 200px;"
                  />
                  <div class="otp-info">
                    A one-time password has been sent to your registered phone number.
                  </div>
                </div>
              </div>
            )}
            
            {passwordChangeStore.value.errorMessage && (
              <div class="error-message" style="margin-top: 1rem;">
                <p>{passwordChangeStore.value.errorMessage}</p>
              </div>
            )}
          </div>
          
          <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
            <button 
              class="cancel-button"
              disabled={passwordChangeStore.value.isSubmitting}
              onClick$={() => {
                if (passwordChangeStore.value.step === 2) {
                  passwordChangeStore.value.step = 1;
                  passwordChangeStore.value.errorMessage = "";
                } else {
                  // Reset fields
                  currentPassword.value = "";
                  newPassword.value = "";
                  confirmPassword.value = "";
                  passwordChangeStore.value.errorMessage = "";
                }
              }}
            >
              {passwordChangeStore.value.step === 2 ? 'Back' : 'Cancel'}
            </button>
            <button 
              class="login-button" 
              style="width: auto;"
              onClick$={passwordChangeStore.value.step === 1 ? requestOTP : changePassword}
              disabled={
                passwordChangeStore.value.isSubmitting || 
                (passwordChangeStore.value.step === 1 && (!currentPassword.value || !newPassword.value || !confirmPassword.value)) ||
                (passwordChangeStore.value.step === 2 && (!otpValue.value || otpValue.value.length < 6))
              }
            >
              {passwordChangeStore.value.isSubmitting 
                ? 'Processing...' 
                : passwordChangeStore.value.step === 1 
                  ? 'Request OTP'  
                  : 'Change Password'
              }
            </button>
          </div>
        </div>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Profile Settings - BP Loans Dashboard",
}; 