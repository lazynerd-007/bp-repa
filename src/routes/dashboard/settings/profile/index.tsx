import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Loader from "~/components/loader/loader";

export default component$(() => {
  const isLoading = useSignal(false);
  const isSaving = useSignal(false);
  const showSuccessMessage = useSignal(false);
  
  const profileData = useSignal({
    fullName: "John Smith",
    email: "john@bploans.com",
    phone: "233-123-4567",
    joinedDate: "2022-05-15"
  });
  
  const saveProfile = $(async () => {
    isSaving.value = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSuccessMessage.value = true;
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
    } finally {
      isSaving.value = false;
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
              <p>Profile updated successfully!</p>
            </div>
          )}
          
          <div style="margin-bottom: 2rem;">
            <div class="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={profileData.value.fullName}
                onInput$={(_, target) => profileData.value = { ...profileData.value, fullName: target.value }}
              />
            </div>
            
            <div style="display: flex; gap: 1rem;">
              <div class="form-group" style="flex: 1;">
                <label>Email</label>
                <input 
                  type="email" 
                  value={profileData.value.email}
                  onInput$={(_, target) => profileData.value = { ...profileData.value, email: target.value }}
                />
              </div>
              
              <div class="form-group" style="flex: 1;">
                <label>Phone</label>
                <input 
                  type="text" 
                  value={profileData.value.phone}
                  onInput$={(_, target) => profileData.value = { ...profileData.value, phone: target.value }}
                />
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label>Change Password</label>
            <div style="display: flex; gap: 1rem;">
              <input 
                type="password" 
                placeholder="Current Password"
                style="flex: 1;"
              />
              <input 
                type="password" 
                placeholder="New Password" 
                style="flex: 1;"
              />
              <input 
                type="password" 
                placeholder="Confirm Password" 
                style="flex: 1;"
              />
            </div>
          </div>
          
          <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
            <button 
              class="cancel-button"
              disabled={isSaving.value}
            >
              Cancel
            </button>
            <button 
              class="login-button" 
              style="width: auto;"
              onClick$={saveProfile}
              disabled={isSaving.value}
            >
              {isSaving.value ? 'Saving...' : 'Save Changes'}
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