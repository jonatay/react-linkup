import { createSelector } from 'reselect';

export function getAcl(state) {
  return state.admin.acl.acl;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

const childNode = (title, obj, depth = 1) => {
  return {
    title: title,
    noDragging: true,
    expanded: depth <= 1,
    ...(Object.keys(obj).length > 0
      ? {
          children: Object.keys(obj).map(key =>
            childNode(key, obj[key], depth + 1)
          )
        }
      : {})
  };
};

export const getAclTree = createSelector(getAcl, acl => {
  return Object.keys(acl).map((key, index) => childNode(key, acl[key]));
});

export const getRoles = createSelector(getAcl, acl => {
  return typeof acl.meta === 'object' && typeof acl.meta.roles === 'object'
    ? Object.keys(acl.meta.roles)
    : [];
});
