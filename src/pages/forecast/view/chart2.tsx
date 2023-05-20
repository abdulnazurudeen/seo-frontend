import React, { useState } from "react";
import { useTheme } from '@mui/material/styles'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import ChartTwoTable from './chart_two_table'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Switch from '@mui/material/Switch';

const ViewChartTwo = () => {

    const theme = useTheme()

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
        name: "Conversions",
        type: "bar",
        data: [
            172.63,
            86.31,
            43.16,
            45.27,
            22.63,
            11.32,
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
      },
    ]
  };
  
  const options2 = {
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
        title="Potentials Traffic and Conversions"
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Switch {...label} onChange={handleChange} />
        }
      />
      { viewTable ? <ChartTwoTable  /> : null }
      <ReactApexcharts options={options2} series={data.series} type="line" height={500} />
    </Card>
  );
};

export default ViewChartTwo;
