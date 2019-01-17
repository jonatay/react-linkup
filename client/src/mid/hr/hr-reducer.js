import { combineReducers } from 'redux';
import { hrSarsReducer } from './index';

export const hrReducer = combineReducers({
  hrSars: hrSarsReducer
});
