import React from "react";
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import ChartOneTable from './chart_one_table'
import Switch from '@mui/material/Switch';

const ViewChartOne = () => {
  const data = {
    labels: [
      "Best (1/2 these keywords in 1-3)",
      "Better (1/4 your keywords in 1-3)",
      "Good (1/8 your keywords in top 1-3)",
      "Best (1/2 these keywords in 4-10)",
      "Better (1/4 your keywords in 4-10)",
      "Good (1/8 your keywords in top 4-10)"
    ],
    series: [
      {
        name: "Volume",
        type: "bar",
        data: [
          351055,
          175528,
          87764,
          351055,
          175528,
          87764
        ]
      },
      {
        name: "Potential Traffic",
        type: "line",
        data: [
          57830,
          28915,
          14457,
          15352,
          7676,
          3838
        ]
      }
    ]
  };
  
  const options = {
    chart: {
      height: 205,
    },
    series: data.series,
    xaxis: {
      categories: data.labels
    },
    yaxis: {
      title: {
        text: "Value"
      }
    },
    colors: ["#008FFB", "#FF4560"]
  };
  
  const label = { inputProps: { 'aria-label': 'View More Data' } };
  
  const [viewTable, setTableChecked] = React.useState(false);

  const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setTableChecked(event.target.checked);
  };

  return (
    <Card>
    <CardHeader 
        title='Volume and Potential Traffic' 
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Switch {...label} onChange={handleChange} />
        }
    />
    { viewTable ? <ChartOneTable  /> : null }
      <ReactApexcharts options={options} series={data.series} type="line" height={500} />
    </Card>
  );
};

export default ViewChartOne;
