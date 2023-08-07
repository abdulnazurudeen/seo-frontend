import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Router from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

const Dashboard = () => {
  const [cookie] = useCookies(['token'])
  useEffect(() => {
    const { token } = cookie

    // const { pathname } = Router
    // if (token) {
    //   console.log('Dashboard only redirecting forecast list')
    //   Router.push('/forecast/list')
    // } else {
    //   console.log('Dashboard only redirecting login')
    //   Router.push('/login')
    // }
  }, [cookie])

  return <ApexChartWrapper />
}

export default Dashboard
