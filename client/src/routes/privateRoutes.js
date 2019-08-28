import asyncComponent from "src/views/components/common/async-component";

const AdminUsersPage = asyncComponent(() =>
  import("src/views/pages/admin/admin-users-page")
);
const AdminRightsPage = asyncComponent(() =>
  import("src/views/pages/admin/admin-rights-page")
);
const FleetDriversPage = asyncComponent(() =>
  import("src/views/pages/fleet/fleet-drivers-page")
);
const FleetVehiclesPage = asyncComponent(() =>
  import("src/views/pages/fleet/fleet-vehicles-page")
);
const FleetTransactionsPage = asyncComponent(() =>
  import("src/views/pages/fleet/fleet-transactions-page")
);
const FleetSettingsPage = asyncComponent(() =>
  import("src/views/pages/fleet/fleet-settings-page")
);
const UserProfilePage = asyncComponent(() =>
  import("src/views/pages/common/user-profile-page")
);
const RootPage = asyncComponent(() =>
  import("src/views/pages/common/root-page")
);

// sage PAY
const BankAccountsPage = asyncComponent(() =>
  import("src/views/pages/sage-pay/bank-accounts-page")
);

const BanksAndBranchesPage = asyncComponent(() =>
  import("src/views/pages/sage-pay/banks-and-branches-page")
);

const SalaryBatchesPage = asyncComponent(() =>
  import("src/views/pages/sage-pay/salary-batches-page")
);

// sage ONE
const SOBankAccountsPage = asyncComponent(() =>
  import("src/views/pages/sage-one/so-bank-accounts-page")
);

// Attend
const AttendPage = asyncComponent(() =>
  import("src/views/pages/attend/attend-page")
);

const HomePage = asyncComponent(() =>
  import("src/views/pages/common/user-home")
);

const Emp501Page = asyncComponent(() => import("src/views/pages/hr/emp501"));

const EmployeesPage = asyncComponent(() =>
  import("src/views/pages/hr/employee")
);

export const privateRoutes = [
  { path: "/admin/users", component: AdminUsersPage },
  { path: "/admin/rights", component: AdminRightsPage },
  { path: "/fleet/drivers", component: FleetDriversPage },
  { path: "/fleet/vehicles", component: FleetVehiclesPage },
  { path: "/fleet/transactions", component: FleetTransactionsPage },
  { path: "/fleet/settings", component: FleetSettingsPage },

  { path: "/sage-pay/bank-accounts", component: BankAccountsPage },
  { path: "/sage-pay/banks-and-branches", component: BanksAndBranchesPage },
  { path: "/sage-pay/salary-batches", component: SalaryBatchesPage },

  { path: "/sage-one/bank-accounts", component: SOBankAccountsPage },

  { path: "/attend/attend", component: AttendPage },

  { path: "/hr/attendance", component: AttendPage },
  { path: "/user-profile", component: UserProfilePage },

  { path: "/hr/emp501", component: Emp501Page },
  { path: "/hr/employees", component: EmployeesPage },

  { path: "/home", component: HomePage },
  { path: "/", component: RootPage }
];
