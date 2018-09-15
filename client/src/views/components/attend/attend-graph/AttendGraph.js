/*
    Jono : 18 09 09
    AttendGraph : React Class Component
*/
import React from 'react';
import ChartistGraph from 'react-chartist';

class AttendGraph extends React.Component {
  render() {
    const data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]]
    };

    const options = {
      high: 15,
      low: -10,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        }
      }
    };

    var type = 'Line';

    return <ChartistGraph data={data} options={options} type={type} />;
  }
}

export default AttendGraph;
