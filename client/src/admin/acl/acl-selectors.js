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

const extractResources = resources => {
  return Object.keys(flattenObject(resources)).map(key => {
    return (
      '/' +
      key
        .split('/')
        .slice(1)
        .join('/')
    );
  });
};

export const getResources = createSelector(getAcl, acl => {
  return typeof acl.resources === 'object'
    ? extractResources(acl.resources)
    : [];
});

export const getPermissions = createSelector(getAcl, acl => {
  return ['get', 'post', 'delete', 'put'];
});
