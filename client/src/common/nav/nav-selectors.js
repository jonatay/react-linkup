import { createSelector } from 'reselect';

export const getRouter = state => {
  return state.router;
};

export const getCurrentLocation = createSelector(
  getRouter,
  router => router.location.pathname
);
