import AdminUsersPage from '../views/pages/admin/admin-users-page';
import AdminRightsPage from '../views/pages/admin/admin-rights-page';
import FleetDriversPage from '../views/pages/fleet/fleet-drivers-page';
import FleetVehiclesPage from '../views/pages/fleet/fleet-vehicles-page';
import FleetTransactionsPage from '../views/pages/fleet/fleet-transactions-page';
import FleetSettingsPage from '../views/pages/fleet/fleet-settings-page';

export const privateRoutes = [
  { path: '/admin/users', component: AdminUsersPage },
  { path: '/admin/rights', component: AdminRightsPage },
  { path: '/fleet/drivers', component: FleetDriversPage },
  { path: '/fleet/vehicles', component: FleetVehiclesPage },
  { path: '/fleet/transactions', component: FleetTransactionsPage },
  { path: '/fleet/settings', component: FleetSettingsPage }
];
