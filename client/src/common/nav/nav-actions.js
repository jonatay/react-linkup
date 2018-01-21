
export const navActions = {
  NAVIGATE_TO: 'NAVIGATE_TO',
  modules: {
    navToAdminUsers: {
      url: '/admin-users-page',
      name:'navToAdminUsers'
    },
    navToAdminRights: {
      url: '/admin-rights-page',
      name:'navToAdminRights'
    }
  },
  navigateTo: module => ({
    type: navActions.NAVIGATE_TO,
    payload: { module }
  })
};
