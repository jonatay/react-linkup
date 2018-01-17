/*
    Jono : 18 01 11
    RoleTree : React Class Component
*/
import React from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
// import FullNodeDragTheme from 'react-sortable-tree-theme-full-node-drag';

class RolesTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = { treeData: this.treeRoles(props.roles.toArray()) };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ treeData: this.treeRoles(nextProps.roles.toArray()) });
  }

  componentWillMount() {
    console.log(this.state);
  }

  treeRoles = roles =>
    roles.map(role => ({
      title: role.key,
      expanded: true,
      subtitle: 'role',
      noDragging: true,
      children: [
        {
          title: 'users',
          noDragging: true,
          expanded: false,
          children: role.users.map(user => ({
            title: user.name,
            subtitle: 'user',
            noDragging: true,
            noChildren: true
          }))
        }
      ]
    }));

  render() {
    return (
      <div style={{ height: 700 }}>
        <SortableTree
          treeData={this.state.treeData}
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
