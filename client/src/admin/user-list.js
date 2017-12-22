import { FirebaseList } from 'src/firebase';
import { userActions } from './actions';
import { User } from './user';


export const userList = new FirebaseList({
  onAdd: userActions.createUserFulfilled,
  onChange: userActions.updateUserFulfilled,
  onLoad: userActions.loadUsersFulfilled,
  onRemove: userActions.removeUserFulfilled
}, User);
