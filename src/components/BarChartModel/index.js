import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default class BarChartModel extends PureComponent {
  render() {
    return (
      <BarChart
        width={300}
        height={250}
        data={this.props.data}
        margin={{
          top: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={this.props.barOne} fill='#4d8' />
        <Bar dataKey={this.props.barTwo} fill='#ff3338' />
      </BarChart>
    );
  }
}
