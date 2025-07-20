import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Loader from "~/components/loader/loader";

interface Merchant {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  activeLoans: number;
  totalLoans: number;
  status: string;
  address?: string;
  registrationDate?: string;
  lastActivity?: string;
  totalAmountLoaned?: string;
}

export default component$(() => {
  const searchQuery = useSignal("");
  const selectedStatus = useSignal("all");
  const showModal = useSignal(false);
  const selectedMerchant = useSignal<Merchant | null>(null);
  const isLoading = useSignal(false);
  const currentPage = useSignal(1);
  const itemsPerPage = useSignal(5);

  const merchants: Merchant[] = [
    {
      id: "M-001",
      name: "ABC Store",
      contact: "John Smith",
      email: "john@abcstore.com",
      phone: "555-123-4567",
      activeLoans: 1,
      totalLoans: 3,
      status: "active",
      address: "123 Main St, Anytown, USA",
      registrationDate: "2022-05-15",
      lastActivity: "2023-10-30",
      totalAmountLoaned: "GHS 120,000"
    },
    {
      id: "M-002",
      name: "XYZ Enterprises",
      contact: "Jane Doe",
      email: "jane@xyzent.com",
      phone: "555-234-5678",
      activeLoans: 1,
      totalLoans: 2,
      status: "active",
      address: "456 Market St, Somecity, USA",
      registrationDate: "2022-07-22",
      lastActivity: "2023-11-02",
      totalAmountLoaned: "GHS 75,000"
    },
    {
      id: "M-003",
      name: "123 Retail",
      contact: "Robert Johnson",
      email: "robert@123retail.com",
      phone: "555-345-6789",
      activeLoans: 1,
      totalLoans: 1,
      status: "active",
      address: "789 Oak Ave, Othercity, USA",
      registrationDate: "2023-01-10",
      lastActivity: "2023-10-28",
      totalAmountLoaned: "GHS 15,000"
    },
    {
      id: "M-004",
      name: "Best Foods Inc.",
      contact: "Maria Garcia",
      email: "maria@bestfoods.com",
      phone: "555-456-7890",
      activeLoans: 0,
      totalLoans: 2,
      status: "inactive",
      address: "101 Pine St, Somewhere, USA",
      registrationDate: "2022-03-18",
      lastActivity: "2023-09-15",
      totalAmountLoaned: "GHS 95,000"
    },
    {
      id: "M-005",
      name: "Tech Gadgets Co.",
      contact: "David Lee",
      email: "david@techgadgets.com",
      phone: "555-567-8901",
      activeLoans: 1,
      totalLoans: 1,
      status: "active",
      address: "202 Maple Dr, Techville, USA",
      registrationDate: "2023-02-05",
      lastActivity: "2023-11-01",
      totalAmountLoaned: "GHS 35,000"
    },
    {
      id: "M-006",
      name: "Fashion Forward",
      contact: "Sarah Kim",
      email: "sarah@fashionforward.com",
      phone: "555-678-9012",
      activeLoans: 1,
      totalLoans: 1,
      status: "active",
      address: "303 Elm Blvd, Styletown, USA",
      registrationDate: "2023-04-20",
      lastActivity: "2023-10-25",
      totalAmountLoaned: "GHS 60,000"
    },
    {
      id: "M-007",
      name: "Healthy Eats",
      contact: "Michael Brown",
      email: "michael@healthyeats.com",
      phone: "555-789-0123",
      activeLoans: 0,
      totalLoans: 1,
      status: "inactive",
      address: "404 Cedar Lane, Greenville, USA",
      registrationDate: "2022-09-12",
      lastActivity: "2023-08-30",
      totalAmountLoaned: "GHS 45,000"
    },
    {
      id: "M-008",
      name: "Auto Parts Plus",
      contact: "Lisa Wilson",
      email: "lisa@autoparts.com",
      phone: "555-890-1234",
      activeLoans: 1,
      totalLoans: 1,
      status: "active",
      address: "505 Walnut Ave, Motortown, USA",
      registrationDate: "2023-03-15",
      lastActivity: "2023-10-29",
      totalAmountLoaned: "GHS 30,000"
    },
    {
      id: "M-009",
      name: "Bakery Delight",
      contact: "Thomas Wright",
      email: "thomas@bakerydelight.com",
      phone: "555-901-2345",
      activeLoans: 1,
      totalLoans: 2,
      status: "active",
      address: "606 Cherry St, Bakerville, USA",
      registrationDate: "2022-11-05",
      lastActivity: "2023-10-28",
      totalAmountLoaned: "GHS 50,000"
    },
    {
      id: "M-010",
      name: "Office Supplies Inc.",
      contact: "Amanda Taylor",
      email: "amanda@officesupplies.com",
      phone: "555-012-3456",
      activeLoans: 0,
      totalLoans: 1,
      status: "inactive",
      address: "707 Birch Rd, Officetown, USA",
      registrationDate: "2023-02-22",
      lastActivity: "2023-09-05",
      totalAmountLoaned: "GHS 25,000"
    },
    {
      id: "M-011",
      name: "Garden Center",
      contact: "Kevin Martinez",
      email: "kevin@gardencenter.com",
      phone: "555-123-4567",
      activeLoans: 1,
      totalLoans: 1,
      status: "active",
      address: "808 Spruce Ave, Gardenville, USA",
      registrationDate: "2023-03-30",
      lastActivity: "2023-10-31",
      totalAmountLoaned: "GHS 40,000"
    },
    {
      id: "M-012",
      name: "City Bookstore",
      contact: "Emily Johnson",
      email: "emily@citybookstore.com",
      phone: "555-234-5678",
      activeLoans: 0,
      totalLoans: 2,
      status: "inactive",
      address: "909 Willow Dr, Bookville, USA",
      registrationDate: "2022-08-15",
      lastActivity: "2023-07-22",
      totalAmountLoaned: "GHS 55,000"
    }
  ];

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          merchant.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          merchant.contact.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = selectedStatus.value === 'all' || merchant.status === selectedStatus.value;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage.value);
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = Math.min(startIndex + itemsPerPage.value, filteredMerchants.length);
  const currentMerchants = filteredMerchants.slice(startIndex, endIndex);

  const openMerchantDetails = $((merchant: Merchant) => {
    // Simulate loading
    isLoading.value = true;
    
    // Simulate API call delay
    setTimeout(() => {
      selectedMerchant.value = merchant;
      showModal.value = true;
      isLoading.value = false;
    }, 700);
  });

  return (
    <>
      <div class="dashboard-header">
        <h1>Merchants</h1>
        <p>Manage and track all merchants in the system.</p>
      </div>

      <div class="data-table">
        <div class="table-header">
          <div class="table-title">All Merchants</div>
          <div class="table-controls">
            <div class="form-group" style="margin-bottom: 0; width: 200px;">
              <input
                type="text"
                placeholder="Search merchants..."
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
                <option value="inactive">Inactive</option>
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
                  <th>Name</th>
                  <th>Contact Person</th>
                  <th>Phone</th>
                  <th>Active Loans</th>
                  <th>Total Loans</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentMerchants.length > 0 ? (
                  currentMerchants.map((merchant) => (
                    <tr key={merchant.id}>
                      <td>{merchant.id}</td>
                      <td>{merchant.name}</td>
                      <td>{merchant.contact}</td>
                      <td>{merchant.phone}</td>
                      <td>{merchant.activeLoans}</td>
                      <td>{merchant.totalLoans}</td>
                      <td>
                        <span class={{
                          'status': true,
                          'active': merchant.status === 'active',
                          'completed': merchant.status === 'inactive'
                        }}>
                          {merchant.status.charAt(0).toUpperCase() + merchant.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button 
                          class="login-button" 
                          style="width: auto; padding: 0.25rem 0.75rem; font-size: 0.8rem;"
                          onClick$={() => openMerchantDetails(merchant)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style="text-align: center; padding: 2rem;">
                      No merchants found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {/* Pagination */}
            {filteredMerchants.length > 0 && (
              <div class="pagination">
                <button 
                  onClick$={() => currentPage.value > 1 && (currentPage.value--)}
                  disabled={currentPage.value === 1}
                  class="pagination-button"
                >
                  Previous
                </button>
                <div class="pagination-info">
                  Page {currentPage.value} of {totalPages} (Showing {startIndex + 1} - {endIndex} of {filteredMerchants.length})
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

      {/* Merchant Details Modal */}
      {showModal.value && selectedMerchant.value && (
        <div class="modal-backdrop" onClick$={() => showModal.value = false}>
          <div class="modal" onClick$={(e) => e.stopPropagation()}>
            <div class="modal-header">
              <div class="modal-title">{selectedMerchant.value.name} Details</div>
              <button 
                class="modal-close" 
                onClick$={() => showModal.value = false}
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <div class="detail-item">
                <div class="detail-label">Merchant ID</div>
                <div class="detail-value">{selectedMerchant.value.id}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Name</div>
                <div class="detail-value">{selectedMerchant.value.name}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Contact Person</div>
                <div class="detail-value">{selectedMerchant.value.contact}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Email</div>
                <div class="detail-value">{selectedMerchant.value.email}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Phone</div>
                <div class="detail-value">{selectedMerchant.value.phone}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Address</div>
                <div class="detail-value">{selectedMerchant.value.address}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Registration Date</div>
                <div class="detail-value">{selectedMerchant.value.registrationDate}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Last Activity</div>
                <div class="detail-value">{selectedMerchant.value.lastActivity}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Status</div>
                <div class="detail-value">
                  <span class={{
                    'status': true,
                    'active': selectedMerchant.value.status === 'active',
                    'completed': selectedMerchant.value.status === 'inactive'
                  }}>
                    {selectedMerchant.value.status.charAt(0).toUpperCase() + selectedMerchant.value.status.slice(1)}
                  </span>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Active Loans</div>
                <div class="detail-value">{selectedMerchant.value.activeLoans}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Total Loans</div>
                <div class="detail-value">{selectedMerchant.value.totalLoans}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Total Amount Loaned</div>
                <div class="detail-value">{selectedMerchant.value.totalAmountLoaned}</div>
              </div>
            </div>
            <div class="modal-footer">
              <button 
                class="login-button" 
                onClick$={() => showModal.value = false}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Merchants - Mini Finance Dashboard",
}; 