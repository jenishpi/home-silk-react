import React from "react";
import ReactApexChart from "react-apexcharts";

type ChartProps = {
  // using `interface` is also ok
  [x: string]: any;
};
type ChartState = {
  chartData: any[];
  chartOptions: any;
};

class PieChart extends React.Component<ChartProps, ChartState> {
  constructor(props: { chartData: any[]; chartOptions: any,count:any }) {

    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    let chartOptions=this.props.chartOptions;
    let chartData=[this.props.count.low,this.props.count.high,this.props.count.critical,this.props.count.medium];
    chartOptions.colors=["#5dbb63","#f4c430","#d67229","#9eecff"]
    chartOptions.fill=["#5dbb63","#f4c430","#d67229","#9eecff"]
    chartOptions.labels=["Low","High","Critical","Medium"]
    this.setState({
      chartData: chartData,
      chartOptions: chartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="pie"
        width="100%"
        height="100%"
      />
    );
  }
}

export default PieChart;
