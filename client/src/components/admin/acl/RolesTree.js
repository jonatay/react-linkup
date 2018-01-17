/*
    Jono : 18 01 11
    RoleTree : React Class Component
*/
import React from 'react';
import SortableTree from 'react-sortable-tree';
// import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
// import FullNodeDragTheme from 'react-sortable-tree-theme-full-node-drag';

const RolesTree = ({ roles }) => {
  const onChange = e => {
    console.log(e);
  };

  const treeRoles = roles.map(role => ({
    title: role.key,
    expanded: true,
    subtitle: 'role',
    noDragging: true,
    children: role.users.map(user => ({
      title: user.name,
      subtitle: 'user',
      noChildren: true
    }))
  }));
  return (
    <div style={{ height: 700 }}>
      <SortableTree
        treeData={treeRoles.toArray()}
        // theme={FullNodeDragTheme}
        onChange={onChange}
        canDrag={({ node }) => !node.noDragging}
        canDrop={({ nextParent }) =>
          nextParent ? !nextParent.noChildren : false
        }
      />
    </div>
  );
};

export default RolesTree;

/*
<Tree showLines>
{roles.map(role=><RoleNode role={role} />)}
</Tree>
*/
