import { component$, useSignal, $, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Loader from "~/components/loader/loader";

interface Loan {
  id: string;
  merchant: string;
  amount: string;
  disbursed: string;
  nextPayment: string;
  status: string;
  balance?: string;
}

export default component$(() => {
  const searchQuery = useSignal("");
  const selectedStatus = useSignal("all");
  const isLoading = useSignal(false);
  const currentPage = useSignal(1);
  const itemsPerPage = useSignal(5);
  const showPaymentModal = useSignal(false);
  const selectedLoan = useSignal<Loan | null>(null);
  const paymentAmount = useSignal("");
  
  const paymentStore = useStore({
    isSubmitting: false,
    isSuccess: false,
    errorMessage: ""
  });

  const loans: Loan[] = [
    {
      id: "LN-2023-001",
      merchant: "ABC Store",
      amount: "GHS 25,000",
      disbursed: "2023-10-15",
      nextPayment: "2023-11-15",
      status: "active",
      balance: "GHS 15,000"
    },
    {
      id: "LN-2023-002",
      merchant: "XYZ Enterprises",
      amount: "GHS 50,000",
      disbursed: "2023-09-30",
      nextPayment: "2023-10-30",
      status: "overdue",
      balance: "GHS 35,000"
    },
    {
      id: "LN-2023-003",
      merchant: "123 Retail",
      amount: "GHS 15,000",
      disbursed: "2023-10-05",
      nextPayment: "2023-11-05",
      status: "active",
      balance: "GHS 10,000"
    },
    {
      id: "LN-2023-004",
      merchant: "Best Foods Inc.",
      amount: "GHS 75,000",
      disbursed: "2023-08-15",
      nextPayment: "-",
      status: "completed",
      balance: "GHS 0"
    },
    {
      id: "LN-2023-005",
      merchant: "Tech Gadgets Co.",
      amount: "GHS 35,000",
      disbursed: "2023-10-10",
      nextPayment: "2023-11-10",
      status: "active",
      balance: "GHS 20,000"
    },
    {
      id: "LN-2023-006",
      merchant: "Fashion Forward",
      amount: "GHS 60,000",
      disbursed: "2023-09-15",
      nextPayment: "2023-10-15",
      status: "overdue",
      balance: "GHS 45,000"
    },
    {
      id: "LN-2023-007",
      merchant: "Healthy Eats",
      amount: "GHS 45,000",
      disbursed: "2023-07-10",
      nextPayment: "-",
      status: "completed",
      balance: "GHS 0"
    },
    {
      id: "LN-2023-008",
      merchant: "Auto Parts Plus",
      amount: "GHS 30,000",
      disbursed: "2023-10-20",
      nextPayment: "2023-11-20",
      status: "active",
      balance: "GHS 25,000"
    },
    {
      id: "LN-2023-009",
      merchant: "Green Gardens",
      amount: "GHS 22,000",
      disbursed: "2023-10-01",
      nextPayment: "2023-11-01",
      status: "active",
      balance: "GHS 18,000"
    },
    {
      id: "LN-2023-010",
      merchant: "Urban Books",
      amount: "GHS 15,000",
      disbursed: "2023-09-22",
      nextPayment: "2023-10-22",
      status: "overdue",
      balance: "GHS 12,000"
    },
    {
      id: "LN-2023-011",
      merchant: "Digital Solutions",
      amount: "GHS 65,000",
      disbursed: "2023-08-30",
      nextPayment: "2023-09-30",
      status: "overdue",
      balance: "GHS 50,000"
    },
    {
      id: "LN-2023-012",
      merchant: "Sportswear Plus",
      amount: "GHS 40,000",
      disbursed: "2023-07-15",
      nextPayment: "-",
      status: "completed",
      balance: "GHS 0"
    }
  ];

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.merchant.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          loan.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = selectedStatus.value === 'all' || loan.status === selectedStatus.value;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage.value);
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = Math.min(startIndex + itemsPerPage.value, filteredLoans.length);
  const currentLoans = filteredLoans.slice(startIndex, endIndex);

  const openPaymentModal = $((loan: Loan) => {
    selectedLoan.value = loan;
    showPaymentModal.value = true;
    // Default payment amount to the balance
    if (loan.balance) {
      paymentAmount.value = loan.balance.replace("GHS ", "");
    }
  });

  const processPayment = $(async () => {
    if (!selectedLoan.value || !paymentAmount.value) return;
    
    paymentStore.isSubmitting = true;
    paymentStore.errorMessage = "";
    
    try {
      // Simulate API call
      isLoading.value = true;
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      paymentStore.isSuccess = true;
      isLoading.value = false;
      
      // Reset after showing success message
      setTimeout(() => {
        showPaymentModal.value = false;
        paymentStore.isSuccess = false;
        paymentStore.isSubmitting = false;
        selectedLoan.value = null;
        paymentAmount.value = "";
      }, 2000);
    } catch (_) {
      paymentStore.errorMessage = "Failed to process payment. Please try again.";
      paymentStore.isSubmitting = false;
      isLoading.value = false;
    }
  });

  return (
    <>
      <div class="dashboard-header">
        <h1>Loans</h1>
        <p>Manage and track all loans in the system.</p>
      </div>

      <div class="data-table">
        <div class="table-header">
          <div class="table-title">All Loans</div>
          <div class="table-controls">
            <div class="form-group" style="margin-bottom: 0; width: 200px;">
              <input
                type="text"
                placeholder="Search loans..."
                value={searchQuery.value}
                onInput$={(e, target) => {
                  searchQuery.value = target.value;
                  currentPage.value = 1; // Reset to first page when searching
                }}
              />
            </div>
            <div class="form-group" style="margin-bottom: 0; width: 150px;">
              <select
                value={selectedStatus.value}
                onChange$={(e, target) => {
                  selectedStatus.value = target.value;
                  currentPage.value = 1; // Reset to first page when filtering
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="overdue">Overdue</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
        {isLoading.value ? (
          <Loader />
        ) : (
          <>
            <table class="table">
              <thead>
                <tr>
                  <th>Merchant ID</th>
                  <th>Merchant</th>
                  <th>Amount</th>
                  <th>Balance</th>
                  <th>Disbursed Date</th>
                  <th>Next Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentLoans.length > 0 ? (
                  currentLoans.map((loan) => (
                    <tr key={loan.id}>
                      <td>{loan.id}</td>
                      <td>{loan.merchant}</td>
                      <td>{loan.amount}</td>
                      <td>{loan.balance}</td>
                      <td>{loan.disbursed}</td>
                      <td>{loan.nextPayment}</td>
                      <td>
                        <span class={{
                          'status': true,
                          'active': loan.status === 'active',
                          'overdue': loan.status === 'overdue',
                          'completed': loan.status === 'completed'
                        }}>
                          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button 
                          class="login-button" 
                          style="width: auto; padding: 0.25rem 0.75rem; font-size: 0.8rem;"
                          onClick$={() => openPaymentModal(loan)}
                          disabled={loan.status === 'completed'}
                        >
                          Process Payment
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style="text-align: center; padding: 2rem;">
                      No loans found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {/* Pagination */}
            {filteredLoans.length > 0 && (
              <div class="pagination">
                <button 
                  onClick$={() => currentPage.value > 1 && (currentPage.value--)}
                  disabled={currentPage.value === 1}
                  class="pagination-button"
                >
                  Previous
                </button>
                <div class="pagination-info">
                  Page {currentPage.value} of {totalPages} (Showing {startIndex + 1} - {endIndex} of {filteredLoans.length})
                </div>
                <button 
                  onClick$={() => currentPage.value < totalPages && (currentPage.value++)}
                  disabled={currentPage.value === totalPages}
                  class="pagination-button"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal.value && selectedLoan.value && (
        <div class="modal-backdrop" onClick$={() => !paymentStore.isSubmitting && (showPaymentModal.value = false)}>
          <div class="modal" onClick$={(e) => e.stopPropagation()}>
            <div class="modal-header">
              <div class="modal-title">Process Payment for {selectedLoan.value.merchant}</div>
              {!paymentStore.isSubmitting && (
                <button 
                  class="modal-close" 
                  onClick$={() => showPaymentModal.value = false}
                >
                  &times;
                </button>
              )}
            </div>
            <div class="modal-body">
              {paymentStore.isSuccess ? (
                <div class="success-message">
                  <p>Payment processed successfully!</p>
                </div>
              ) : (
                <>
                  <div class="detail-item">
                    <div class="detail-label">Merchant ID</div>
                    <div class="detail-value">{selectedLoan.value.id}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Merchant</div>
                    <div class="detail-value">{selectedLoan.value.merchant}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Outstanding Balance</div>
                    <div class="detail-value">{selectedLoan.value.balance}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Next Payment Due</div>
                    <div class="detail-value">{selectedLoan.value.nextPayment}</div>
                  </div>
                  
                  <div class="form-group">
                    <label>Payment Amount (GHS)</label>
                    <input
                      type="text"
                      value={paymentAmount.value}
                      onInput$={(e, target) => paymentAmount.value = target.value}
                      disabled={paymentStore.isSubmitting}
                    />
                  </div>
                  
                  {paymentStore.errorMessage && (
                    <div class="error-message">
                      <p>{paymentStore.errorMessage}</p>
                    </div>
                  )}
                </>
              )}
              
              {isLoading.value && (
                <div style="text-align: center; padding: 1rem;">
                  <Loader size="small" />
                </div>
              )}
            </div>
            <div class="modal-footer">
              {!paymentStore.isSuccess && (
                <>
                  <button 
                    class="cancel-button" 
                    onClick$={() => showPaymentModal.value = false}
                    disabled={paymentStore.isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    class="login-button" 
                    onClick$={processPayment}
                    disabled={paymentStore.isSubmitting || !paymentAmount.value}
                  >
                    {paymentStore.isSubmitting ? 'Processing...' : 'Confirm Payment'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Loans - Mini Finance Dashboard",
}; 