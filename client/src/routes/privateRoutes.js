import asyncComponent from 'src/views/components/common/async-component';

const AdminUsersPage = asyncComponent(() =>
  import('src/views/pages/admin/admin-users-page')
);
const AdminRightsPage = asyncComponent(() =>
  import('src/views/pages/admin/admin-rights-page')
);
const FleetDriversPage = asyncComponent(() =>
  import('src/views/pages/fleet/fleet-drivers-page')
);
const FleetVehiclesPage = asyncComponent(() =>
  import('src/views/pages/fleet/fleet-vehicles-page')
);
const FleetTransactionsPage = asyncComponent(() =>
  import('src/views/pages/fleet/fleet-transactions-page')
);
const FleetSettingsPage = asyncComponent(() =>
  import('src/views/pages/fleet/fleet-settings-page')
);
const UserProfilePage = asyncComponent(() =>
  import('src/views/pages/common/user-profile-page')
);
const RootPage = asyncComponent(() =>
  import('src/views/pages/common/root-page')
);

const BankAccountsPage = asyncComponent(() =>
  import('src/views/pages/sage-pay/bank-accounts-page')
);
const BanksAndBranchesPage = asyncComponent(() =>
  import('src/views/pages/sage-pay/banks-and-branches-page')
);
const SalaryBatchesPage = asyncComponent(() =>
  import('src/views/pages/sage-pay/salary-batches-page')
);

const AttendPage = asyncComponent(() =>
  import('src/views/pages/attend/attend-page')
);

const HomePage = asyncComponent(() => import('src/views/pages/common/user-home'));

export const privateRoutes = [
  { path: '/admin/users', component: AdminUsersPage },
  { path: '/admin/rights', component: AdminRightsPage },
  { path: '/fleet/drivers', component: FleetDriversPage },
  { path: '/fleet/vehicles', component: FleetVehiclesPage },
  { path: '/fleet/transactions', component: FleetTransactionsPage },
  { path: '/fleet/settings', component: FleetSettingsPage },

  { path: '/sage-pay/bank-accounts', component: BankAccountsPage },
  { path: '/sage-pay/banks-and-branches', component: BanksAndBranchesPage },
  { path: '/sage-pay/salary-batches', component: SalaryBatchesPage },
  { path: '/attend/attend', component: AttendPage },
  { path: '/user-profile', component: UserProfilePage },
  { path: '/home', component: HomePage },
  { path: '/', component: RootPage }
];
