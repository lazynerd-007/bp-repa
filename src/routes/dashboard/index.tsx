import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const summaryData = [
    {
      title: "Total Disbursed Loans",
      value: "$1,250,500",
      change: "+12.5%",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`,
      iconBg: "#e3f2fd",
      iconColor: "#1976d2"
    },
    {
      title: "Total Repaid Loans",
      value: "$980,250",
      change: "+8.2%",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`,
      iconBg: "#e7f5ea",
      iconColor: "#2e7d32"
    },
    {
      title: "Outstanding Balance",
      value: "$270,250",
      change: "-3.5%",
      isNegative: true,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`,
      iconBg: "#ffeaea",
      iconColor: "#d32f2f"
    },
    {
      title: "Active Merchants",
      value: "142",
      change: "+5.3%",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>`,
      iconBg: "#e3f2fd",
      iconColor: "#1976d2"
    }
  ];

  const recentLoans = [
    {
      id: "LN-2023-001",
      merchant: "ABC Store",
      amount: "$25,000",
      disbursed: "2023-10-15",
      nextPayment: "2023-11-15",
      status: "active"
    },
    {
      id: "LN-2023-002",
      merchant: "XYZ Enterprises",
      amount: "$50,000",
      disbursed: "2023-09-30",
      nextPayment: "2023-10-30",
      status: "overdue"
    },
    {
      id: "LN-2023-003",
      merchant: "123 Retail",
      amount: "$15,000",
      disbursed: "2023-10-05",
      nextPayment: "2023-11-05",
      status: "active"
    },
    {
      id: "LN-2023-004",
      merchant: "Best Foods Inc.",
      amount: "$75,000",
      disbursed: "2023-08-15",
      nextPayment: "-",
      status: "completed"
    },
    {
      id: "LN-2023-005",
      merchant: "Tech Gadgets Co.",
      amount: "$35,000",
      disbursed: "2023-10-10",
      nextPayment: "2023-11-10",
      status: "active"
    }
  ];

  return (
    <>
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the BP Loan Dashboard! Here's an overview of your financial data.</p>
      </div>

      <div class="card-grid">
        {summaryData.map((item) => (
          <div class="card" key={item.title}>
            <div class="card-header">
              <div class="card-title">{item.title}</div>
              <div 
                class="card-icon" 
                style={{
                  backgroundColor: item.iconBg,
                  color: item.iconColor
                }}
                dangerouslySetInnerHTML={item.icon}
              />
            </div>
            <div class="card-value">{item.value}</div>
            <div class={{
              'card-change': true,
              'negative': item.isNegative
            }}>
              {item.change} from last month
            </div>
          </div>
        ))}
      </div>

      <div class="data-table">
        <div class="table-header">
          <div class="table-title">Recent Loans</div>
          <div class="table-controls">
            <button class="login-button" style="width: auto">View All</button>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Merchant</th>
              <th>Amount</th>
              <th>Disbursed Date</th>
              <th>Next Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentLoans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.merchant}</td>
                <td>{loan.amount}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Dashboard - Mini Finance Dashboard",
}; 