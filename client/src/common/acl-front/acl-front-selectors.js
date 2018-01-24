import { createSelector } from 'reselect';

const getAcl = state => {
  return state.common.acl.acl;
};

const getUid = state => {
  return state.common.acl.uid;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

const flattenObject = ob => {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if (typeof ob[i] === 'object') {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '/' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

export const getAclRoles = createSelector(getAcl, getUid, (acl, uid) => {
  if (
    typeof acl === 'object' &&
    typeof acl.users === 'object' &&
    typeof acl.users[uid] === 'object'
  ) {
    return Object.keys(acl.users[uid]);
  }
});
/*
 */
const extractFront = (node, roles) => {
  let ret = [];
  for (let r of Object.keys(node)) {
    if (roles.indexOf(r) >= 0 && typeof node[r].front === 'object') {
      let front = node[r].front;
      for (let res of Object.keys(front)) {
        ret.push({ resource: res, children: Object.keys(front[res]) });
      }
    }
  }
  return ret;
};

export const getAclFront = createSelector(getAcl, getAclRoles, (acl, roles) => {
  if (
    typeof acl === 'object' &&
    typeof acl.resources === 'object' &&
    typeof roles === 'object'
  ) {
    return extractFront(acl.resources, roles);
  }
  return [];
});
