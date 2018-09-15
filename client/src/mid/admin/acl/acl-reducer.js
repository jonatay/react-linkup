import { aclActions } from './acl-actions';

export function aclReducer(state = { acl: {}, users: [] }, { payload, type }) {
  switch (type) {
    case aclActions.ACL_LOADED_OK:
      return { ...state, acl: payload.acl };
    case aclActions.ACL_ON_CHANGE:
      return {
        ...state,
        acl: {
          ...state.acl,
          ...Object.keys(payload).map(key => payload[key])[0]
        }
      };
    case aclActions.ACL_ON_ADD:
      return {
        ...state,
        acl: {
          ...state.acl,
          ...payload.data
        }
      };
    case aclActions.ACL_ON_REMOVE:
      let acl = { ...state.acl }; //clone acl
      for (let key in payload.data) {
        delete acl[key];
      }
      return {
        ...state,
        acl: {
          ...acl
        }
      };
    default:
      return state;
  }
}
