import { aclActions } from './acl-actions';

export function aclReducer(state = {acl:{}}, { payload, type }) {
  switch (type) {
    case aclActions.ACL_LOADED_OK:
      return { ...state, acl: payload.acl };
    case aclActions.ACL_ALLOW_OK:
      return state.set('lastResult', payload);
    case aclActions.ACL_DENY_OK:
      return state.set('lastResult', payload);
    default:
      return state;
  }
}
