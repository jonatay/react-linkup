export const navActions = {
  NAVIGATE_TO: 'NAVIGATE_TO',
  modules: {
    navToAdminUsers: {
      url: '/admin/users',
      name: 'navToAdminUsers'
    },
    navToAdminRights: {
      url: '/admin/rights',
      name: 'navToAdminRights'
    },
    navToFleetTransactions: {
      url: '/fleet/transactions',
      name: 'navToFleetTransactions'
    },
    navToFleetVehicles: {
      url: '/fleet/Vehicles',
      name: 'navToFleetVehicles'
    }
  },
  navigateTo: module => ({
    type: navActions.NAVIGATE_TO,
    payload: { module }
  })
};
