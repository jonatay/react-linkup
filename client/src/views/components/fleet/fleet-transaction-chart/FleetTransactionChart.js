/*
    Jono : 18 08 26
    FleetTransactionChart : React Class Component
*/
import React from 'react';

class FleetTransactionChart extends React.Component {
  state = {
    width: 1000,
    height: 200
  };
  // componentDidMount() {
  //   const width = document.getElementById('FleetTransactionChart').clientWidth;
  //   // const height = document.getElementById('FleetTransactionChart')
  //   //   .clientHeight;
  //   this.setState({ width });
  // }

  render() {
    return (
      <div>
        {/*{this.props.fleetTransactionChartData.map((data, idx) => (*/}
          {/*<LineChart*/}
            {/*key={idx}*/}
            {/*xType={'time'}*/}
            {/*axes*/}
            {/*grid*/}
            {/*verticalGrid*/}
            {/*// dataPoints*/}
            {/*axisLabels={{ x: 'Date', y: 'Rands' }}*/}
            {/*data={data}*/}
            {/*interpolate={'cardinal'}*/}
            {/*height={this.state.height}*/}
            {/*width={this.state.width}*/}
            {/*margin={{ top: 10, right: 10, bottom: 30, left: 30 }}*/}
          {/*/>*/}
        {/*))}*/}
      </div>
    );
  }
}

export default FleetTransactionChart;

/*

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const colors = [
  '#e6194b',
  '#3cb44b',
  '#ffe119',
  '#0082c8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#f032e6',
  '#d2f53c',
  '#fabebe',
  '#008080',
  '#e6beff',
  '#aa6e28',
  '#fffac8',
  '#800000',
  '#aaffc3',
  '#808000',
  '#ffd8b1',
  '#000080',
  '#808080',
  '#FFFFFF',
  '#000000'
];

// const ListLineTypes = ({ tranTypes }) =>
//   // tranTypes.map((tt, idx) => (
//   //   <Line type="monotone" dataKey={tt} stroke={colors[idx]} />
//   // ));

class FleetTransactionChart extends React.Component {
  state = {
    width: 1000,
    height: 600
  };
  componentDidMount() {
    const width = document.getElementById('FleetTransactionChart').clientWidth;
    this.setState({ width });
  }

  render() {
    return (
      <div id="FleetTransactionChart">
        <LineChart
          width={this.state.width}
          height={this.state.height}
          data={this.props.fleetTransactionChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Fuel" stroke={colors[0]} />
          <Line type="monotone" dataKey="Tyres" stroke={colors[1]} />
          <Line type="monotone" dataKey="Toll Fees" stroke={colors[2]} />
          <Line type="monotone" dataKey="Service" stroke={colors[3]} />
          <Line type="monotone" dataKey="Oil" stroke={colors[4]} />
          <Line type="monotone" dataKey="Intake & Exhaust" stroke={colors[5]} />
          <Line type="monotone" dataKey="Brakes" stroke={colors[6]} />
          <Line type="monotone" dataKey="Batteries" stroke={colors[7]} />
        </LineChart>
      </div>
    );
  }
}

export default FleetTransactionChart;

 */
