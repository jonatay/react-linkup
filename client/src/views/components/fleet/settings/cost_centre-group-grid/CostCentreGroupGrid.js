/*
    Jono : 18 04 25
    CostCentreGroupGrid : React Class Component
*/
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class CostCentreGroupGrid extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.props.loadCostCentreGroups();
  }

  static getDerivedStateFromProps({ costCentreGroups }, prevState) {
    return { ...prevState, data: costCentreGroups };
  }

  render() {
    const { data } = this.state;

    return <div>CCGG</div>;
  }
}

export default CostCentreGroupGrid;
