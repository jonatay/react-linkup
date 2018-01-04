import { ApiList } from 'src/api';
import { userActions } from './user-actions';
import { User, path } from './user';


export const userList = new ApiList({
  onAdd: userActions.createUserFulfilled,
  onChange: userActions.updateUserFulfilled,
  onLoad: userActions.loadUsersFulfilled,
  onRemove: userActions.removeUserFulfilled
}, User, path);
