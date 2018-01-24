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
  constructor(props) {
    super(props);
    this.state = {
      treeData: this.props.aclTree
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      treeData: nextProps.aclTree
    });
  }

  componentWillMount() {
    // console.log(this.state);
  }

  render() {
    return (
      <div style={{ height: 650 }}>
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

