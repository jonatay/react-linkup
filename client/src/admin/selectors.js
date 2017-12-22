import { createSelector } from 'reselect';


export function getUsers(state) {
  return state.users;
}