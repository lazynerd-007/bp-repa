Platform Summary
The Mini Finance Dashboard is a comprehensive tool for finance professionals to manage the entire lifecycle of merchant loans. It provides a centralized system for tracking disbursed loans, monitoring repayment schedules, and processing payments. With features like real-time data summaries, detailed merchant and loan management pages, and a powerful report generation tool, the platform empowers finance teams to make data-driven decisions, reduce manual errors, and improve their overall workflow efficiency.


## 3. User Stories

-   **As a** Finance Team Member, **I want to** log in securely **so that** I can access sensitive loan data with confidence.
-   **As a** Finance Team Member, **I want to** see a high-level summary on my dashboard **so that** I can quickly assess the company's current financial standing.
-   **As a** Finance Team Member, **I want to** view a detailed list of all active loans **so that** I can track upcoming payments and identify potential risks.
-   **As a** Finance Team Member, **I want to** process a loan repayment for a merchant through a simple modal **so that** I can keep financial records accurate and up-to-date.
-   **As a** Finance Team Member, **I want to** search for a specific merchant by name or ID **so that** I can quickly access their loan history and contact details.
-   **As a** Finance Team Member, **I want to** generate a monthly loan summary report **so that** I can easily share performance metrics with management and stakeholders.
-   **As a** Finance Team Member, **I want to** change my account password **so that** I can maintain the security of my access to the platform.
-   **As a** Finance Team Member, **I want** a "Forgot Password" option **so that** I can regain access to my account without needing administrator assistance.



## 4. Features & Requirements

### 4.1. Authentication
-   **Login Page:** Secure user login with email and password fields.
-   **Forgot Password:** A flow for users to reset their password via email.
-   **User Session:** Persistent login sessions managed via context and localStorage.
-   **Protected Routes:** All pages except Login and Forgot Password must require authentication.

### 4.2. Dashboard
-   **Summary Widgets:** Display key metrics like Total Disbursed Loans, Total Repaid Loans, Outstanding Balance, and Active Merchants.
-   **Active Loans Table:** A table showing a summary of recent or high-priority active loans.
-   **Quick Actions:** Buttons to "Generate Report" or perform other common tasks.

### 4.3. Merchants Page
-   **Merchant List:** A paginated and searchable table of all merchants.
-   **Search & Filter:** Ability to search by merchant name/ID and filter by status (Active/Inactive).
-   **Merchant Details:** Display contact information, total loans, and active loans for each merchant.
-   **Actions:** A dropdown menu for each merchant to view details, initiate a new loan, or edit information.

### 4.4. Loans Page
-   **Loan List:** A paginated and searchable table of all loans.
-   **Search & Filter:** Ability to search by merchant and filter by loan status (Active, Overdue, Completed).
-   **Loan Repayment Modal:** A modal to process repayments with options for full, due, and partial amounts.

### 4.5. Reports Page
-   **Report Generation Modal:** A user-friendly modal to generate custom reports.
-   **Report Parameters:** Users can select the report type, date range, and file format (PDF, Excel, CSV).
-   **Report Templates:** Pre-defined templates for common reports (Loan Summary, Merchant Performance, etc.).
-   **Previous Reports:** A table listing previously generated reports with an option to download them.

### 4.6. Profile Page
-   **User Information:** Display the logged-in user's details (name, email, role).
-   **Edit Profile:** Allow users to update their personal information.
-   **Password Management:** A secure modal for users to change their password.

---

## 5. Technical Stack

-   **Frontend Framework:** solid js
-   **Styling:** tailwind

---

## 6. Design & UX Principles

-   **Consistency:** The UI should be consistent across all pages, using a shared layout and component library
-   **Clarity:** Information should be presented clearly and concisely. Data visualizations should be easy to understand.
-   **Responsiveness:** The application must be fully responsive and functional on desktop, tablet, and mobile devices.
-   **Feedback:** The system should provide immediate feedback for user actions (e.g., loading spinners, success/error messages).

---

