import Grid from '@mui/material/Grid'
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import Router from 'next/router'
import { useEffect } from 'react'

const Dashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem('token')

    // const { pathname } = Router
    if (token) {
      Router.push('/forecast/list')
    } else {
      Router.push('/login')
    }
  })
  
return <ApexChartWrapper />
}

export default Dashboard
