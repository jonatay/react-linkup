import { createSelector } from "reselect";
import _ from "lodash";

// Originally by Branch - Dept - from access system
// 190809- jono - add by Dept selector

// use as pre-coded for now TODO: Decypher automatically
const Depts = () => [
  { title: "Link-Up Depts", value: 1, key: 1, parent_id: 0 },
  { title: "Control Room", value: 9999, key: 9999, parent_id: 1 },
  { title: "Admin", value: 9998, key: 9998, parent_id: 1 },
  { title: "Technical", value: 9997, key: 9997, parent_id: 1 },
  { title: "Reaction", value: 9996, key: 9996, parent_id: 1 },
  { title: "Sales", value: 9995, key: 9995, parent_id: 1 },
  { title: "Directors", value: 99944, key: 99944, parent_id: 1 },
  { title: "Manintanance", value: 9993, key: 9993, parent_id: 1 },
  { title: "Wireless", value: 9992, key: 9992, parent_id: 1 }
];

export const getAttendDeptsRoot = state => {
  return state.attend.attendDepts;
};

export const getAttendDeptList = state => {
  return getAttendDeptsRoot(state).list;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getAttendDeptById = createSelector(
  getAttendDeptList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getAttendDepts = createSelector(
  getAttendDeptList,
  list => list.toArray()
);

const unflatten = (array, parent, tree) => {
  tree = typeof tree !== "undefined" ? tree : [];
  parent = typeof parent !== "undefined" ? parent : { key: 0 };
  var children = _.filter(array, function(child) {
    return child.parent_id === parent.key;
  });
  if (!_.isEmpty(children)) {
    if (parent.key === 0) {
      tree = children;
    } else {
      parent["children"] = children;
    }
    _.each(children, function(child) {
      unflatten(array, child);
    });
  }
  return tree;
};

export const getAttendBranchesTree = createSelector(
  getAttendDepts,
  depts =>
    unflatten(
      depts.map(dept => ({
        title: dept.name,
        value: dept.id.toString(),
        key: dept.id,
        parent_id: dept.parent_id
      }))
    )
);

export const getAttendDeptsTree = createSelector(
  getAttendDepts,
  Depts,
  (aDepts, depts) =>
    // console.log(aDepts) ||
    unflatten(
      depts.reduce(
        (items, dept) => [
          ...items,
          dept,
          ...aDepts
            .filter(ad => ad.name.includes(dept.title))
            .map(ad => ({
              title: ad.name,
              value: ad.id.toString(),
              key: ad.id,
              parent_id: dept.key
            }))
        ],
        []
      )
    )
);
