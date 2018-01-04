
export const navActions = {
  NAVIGATE_TO: 'NAVIGATE_TO',
  modules: {
    navToAdminUsers: {
      url: '/admin-users-page'
    }
  },
  navigateTo: module => ({
    type: navActions.NAVIGATE_TO,
    payload: { module }
  })
};
