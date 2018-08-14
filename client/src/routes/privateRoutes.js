import asyncComponent from '../views/components/common/async-component';

const AdminUsersPage = asyncComponent(() =>
  import('../views/pages/admin/admin-users-page')
);
const AdminRightsPage = asyncComponent(() =>
  import('../views/pages/admin/admin-rights-page')
);
const FleetDriversPage = asyncComponent(() =>
  import('../views/pages/fleet/fleet-drivers-page')
);
const FleetVehiclesPage = asyncComponent(() =>
  import('../views/pages/fleet/fleet-vehicles-page')
);
const FleetTransactionsPage = asyncComponent(() =>
  import('../views/pages/fleet/fleet-transactions-page')
);
const FleetSettingsPage = asyncComponent(() =>
  import('../views/pages/fleet/fleet-settings-page')
);
const UserProfilePage = asyncComponent(() =>
  import('../views/pages/user/user-profile-page')
);
const RootPage = asyncComponent(() =>
  import('../views/pages/common/root-page')
);

const BankAccountsPage = asyncComponent(() =>
  import('../views/pages/sage-pay/bank-accounts-page')
);
const BanksAndBranchesPage = asyncComponent(() =>
  import('../views/pages/sage-pay/banks-and-branches-page')
);
const SalaryBatchesPage = asyncComponent(() =>
  import('../views/pages/sage-pay/salary-batches-page')
);

const AccessPage = asyncComponent(() =>
  import('../views/pages/access/access-page')
);

export const privateRoutes = [
  { path: '/admin/users', component: AdminUsersPage },
  { path: '/admin/rights', component: AdminRightsPage },
  { path: '/fleet/drivers', component: FleetDriversPage },
  { path: '/fleet/vehicles', component: FleetVehiclesPage },
  { path: '/fleet/transactions', component: FleetTransactionsPage },
  { path: '/fleet/settings', component: FleetSettingsPage },
  { path: '/user/profile', component: UserProfilePage },
  { path: '/sage-pay/bank-accounts', component: BankAccountsPage },
  { path: '/sage-pay/banks-and-branches', component: BanksAndBranchesPage },
  { path: '/sage-pay/salary-batches', component: SalaryBatchesPage },
  { path: '/access/access', component: AccessPage },
  { path: '/', component: RootPage }
];
