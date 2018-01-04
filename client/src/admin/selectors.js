import { createSelector } from "reselect";

export function getUsers(state) {
	return state.users;
}

export function getUserFilter(state) {
	return getUsers(state).filter;
}

export function getUserList(state) {
	return getUsers(state).list;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleUsers = createSelector(
	getUserFilter,
	getUserList,
	(filter, userList) => {
		switch (filter) {
			case "active":
				return userList.filter(user => !user.completed);

			case "completed":
				return userList.filter(user => user.completed);

			default:
				return userList;
		}
	}
);
