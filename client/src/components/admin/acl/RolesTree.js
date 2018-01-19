/*
    Jono : 18 01 11
    RoleTree : React Class Component
*/
import React from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
// import FullNodeDragTheme from 'react-sortable-tree-theme-full-node-drag';

// import { Button, Input } from 'antd';

class RolesTree extends React.Component {


  // treeRoles = roles =>
  //   roles.map(role => ({
  //     title: role.key,
  //     expanded: true,
  //     subtitle: 'role',
  //     noDragging: true,
  //     children: [
  //       {
  //         title: 'users',
  //         noDragging: true,
  //         expanded: false,
  //         children: role.users.map(user => ({
  //           title: user.name,
  //           subtitle: 'user',
  //           noDragging: true,
  //           noChildren: true
  //         }))
  //       },
  //       {
  //         title: 'permissions',
  //         noDragging: true,
  //         expanded: true,
  //         permissionsNode: true
  //       }
  //     ]
  //   }));

  render() {
    return (
      <div style={{ height: 700 }}>
        <SortableTree
          treeData={this.props.aclTree}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
          canDrag={({ node }) => !node.noDragging}
          canDrop={({ nextParent }) =>
            nextParent ? !nextParent.noChildren : false
          }
        />
      </div>
    );
  }
}

export default RolesTree;

/*
<Tree showLines>
{roles.map(role=><RoleNode role={role} />)}
</Tree>
*/

/*
generateNodeProps={({ node, path }) => {
            if (node.permissionsNode) {
              return {
                title: (
                  <div style={{ width: '40%' }}>
                    <Input placeholder="resource" size="small"  />
                    <Input placeholder="permission" size="small" />
                    <Button>add permission</Button>
                  </div>
                )
              };
            }
          }}
 */