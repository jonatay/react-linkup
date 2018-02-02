export const navActions = {
  NAVIGATE_TO: 'NAVIGATE_TO',
  modules: {
    navToAdminUsers: {
      url: '/admin',
      name: 'navToAdminUsers'
    },
    navToAdminRights: {
      url: '/admin',
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
