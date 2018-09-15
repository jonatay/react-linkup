import { combineReducers } from 'redux';
import {
  attendUserReducer,
  attendDeptReducer,
  attendLogReducer
} from './index';

export const attendReducer = combineReducers({
  attendUsers: attendUserReducer,
  attendDepts: attendDeptReducer,
  attendLogs: attendLogReducer
});
