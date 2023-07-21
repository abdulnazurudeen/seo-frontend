import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
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
