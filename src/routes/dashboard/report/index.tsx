import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const reportType = useSignal("loan-summary");
  const startDate = useSignal("");
  const endDate = useSignal("");
  const fileFormat = useSignal("pdf");
  const showGeneratedReports = useSignal(true);

  const previousReports = [
    {
      id: "R-2023-001",
      name: "Loan Summary - October 2023",
      type: "Loan Summary",
      generated: "2023-10-25",
      format: "PDF"
    },
    {
      id: "R-2023-002",
      name: "Merchant Performance - Q3 2023",
      type: "Merchant Performance",
      generated: "2023-10-15",
      format: "Excel"
    },
    {
      id: "R-2023-003",
      name: "Outstanding Loans - September 2023",
      type: "Outstanding Loans",
      generated: "2023-10-01",
      format: "CSV"
    },
    {
      id: "R-2023-004",
      name: "Loan Summary - September 2023",
      type: "Loan Summary",
      generated: "2023-09-25",
      format: "PDF"
    },
    {
      id: "R-2023-005",
      name: "Merchant Performance - Q2 2023",
      type: "Merchant Performance",
      generated: "2023-07-15",
      format: "Excel"
    }
  ];

  return (
    <>
      <div class="dashboard-header">
        <h1>Reports</h1>
        <p>Generate and download financial reports.</p>
      </div>

      <div class="card" style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">Generate New Report</h2>
        
        <div class="form-group">
          <label>Report Type</label>
          <select
            value={reportType.value}
            onChange$={(e, target) => reportType.value = target.value}
          >
            <option value="loan-summary">Loan Summary</option>
            <option value="merchant-performance">Merchant Performance</option>
            <option value="outstanding-loans">Outstanding Loans</option>
            <option value="repayment-schedule">Repayment Schedule</option>
          </select>
        </div>
        
        <div style="display: flex; gap: 1rem;">
          <div class="form-group" style="flex: 1;">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate.value}
              onInput$={(e, target) => startDate.value = target.value}
            />
          </div>
          
          <div class="form-group" style="flex: 1;">
            <label>End Date</label>
            <input
              type="date"
              value={endDate.value}
              onInput$={(e, target) => endDate.value = target.value}
            />
          </div>
        </div>
        
        <div class="form-group">
          <label>File Format</label>
          <select
            value={fileFormat.value}
            onChange$={(e, target) => fileFormat.value = target.value}
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        
        <button class="login-button" style="width: auto; margin-top: 1rem;">Generate Report</button>
      </div>

      {showGeneratedReports.value && (
        <div class="data-table">
          <div class="table-header">
            <div class="table-title">Generated Reports</div>
            <div class="table-controls">
              <button 
                onClick$={() => showGeneratedReports.value = !showGeneratedReports.value}
                style="background: none; border: none; color: #4a90e2; cursor: pointer;"
              >
                Hide
              </button>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Generated Date</th>
                <th>Format</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {previousReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.name}</td>
                  <td>{report.type}</td>
                  <td>{report.generated}</td>
                  <td>{report.format}</td>
                  <td>
                    <button class="login-button" style="width: auto; padding: 0.25rem 0.75rem; font-size: 0.8rem;">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Reports - Mini Finance Dashboard",
}; 