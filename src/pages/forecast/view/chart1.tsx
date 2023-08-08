import React, { useEffect, useState } from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import ChartOneTable from './chart_one_table'
import Switch from '@mui/material/Switch'
import { roundOff } from 'src/@core/utils/helper'

const labels: any = [
  'Best (1/2 these keywords in 1-3)',
  'Better (1/4 your keywords in 1-3)',
  'Good (1/8 your keywords in top 1-3)',
  'Best (1/2 these keywords in 4-10)',
  'Better (1/4 your keywords in 4-10)',
  'Good (1/8 your keywords in top 4-10)'
]

interface ViewChartProps {
  data: any
  barKey: string
  barLabel: string
  lineKey: string
  lineLabel: string
}
const ViewChartOne = ({ data, barKey, barLabel, lineKey, lineLabel }: ViewChartProps) => {
  console.log(data, barKey, lineKey)
  const [barData, setBarData] = useState([])
  const [lineData, setLineData] = useState([])
  useEffect(() => {
    const convertData = () => {
      const barvals: any = []
      const linevals: any = []
      ;['average_1_3', 'average_4_10'].forEach(i => {
        ;['best', 'better', 'good'].forEach(j => {
          const item = data[i][j]
          barvals.push(roundOff(item[barKey]))
          linevals.push(roundOff(item[lineKey]))
        })
      })
      setBarData(barvals)
      setLineData(linevals)
    }
    convertData()
  }, [data, barKey, lineKey])

  const chartData = {
    series: [
      {
        name: barLabel,
        type: 'bar',
        data: barData
      },
      {
        name: lineLabel,
        type: 'line',
        data: lineData
      }
    ]
  }

  const options = {
    chart: {
      height: 205
    },
    series: chartData.series,
    xaxis: {
      categories: labels
    },
    yaxis: {
      title: {
        text: 'Value'
      }
    },
    colors: ['#008FFB', '#FF4560']
  }

  const label = { inputProps: { 'aria-label': 'View More Data' } }

  const [viewTable, setTableChecked] = React.useState(false)

  const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setTableChecked(event.target.checked)
  }

  return (
    <Card>
      <CardHeader
        title={`${barLabel} and ${lineLabel}`}
        titleTypographyProps={{ variant: 'h6' }}
        action={<Switch {...label} onChange={handleChange} />}
      />
      {viewTable ? (
        <ChartOneTable lables={labels} col1={barData} col2={lineData} headings={[barLabel, lineLabel]} />
      ) : null}
      <ReactApexcharts options={options} series={chartData.series} type='line' height={500} />
    </Card>
  )
}

export default ViewChartOne
