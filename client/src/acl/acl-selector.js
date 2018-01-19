import { createSelector } from 'reselect';

export function getAcl(state) {
  return state.acl.acl;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

const childNode = (title, obj) => {
  return {
    title: title,
    expanded:true,
    ...(Object.keys(obj).length > 0
      ? { children: Object.keys(obj).map(key => childNode(key, obj[key])) }
      : {})
  };
};

export const getAclTree = createSelector(getAcl, acl => {
  console.log(acl);
  return Object.keys(acl).map((key, index) => childNode(key, acl[key]));
});
