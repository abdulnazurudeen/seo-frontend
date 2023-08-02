import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Positions from './positions'
import HighLight from './highlighted'
import HighLight2 from './highlighted2'

import Potentials from './potentials'

// import ViewChartOne from './chart1'
// import ViewChartTwo from './chart2'
import TopThree from './top_three'
import TopTen from './top_ten'
import All from './all'
import baseConst from '../../../data/const'
import axios from 'axios'
import { useCookies } from 'react-cookie'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const ForcastList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState([])
  const [reportData, setReportData] = useState([])
  const [dashboardReportData, setDashboardReportData] = useState([])

  const [getSalesData, setSalesData] = useState([])
  const [posistionList, setPositionData] = useState([])

  const router = useRouter()
  const handleClick = (e, path) => {
    e.preventDefault()
    router.push(path)
  }

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { id } = router.query
  const [cookie] = useCookies(['token'])
  useEffect(() => {
    if (!id) return
    const { token } = cookie
    const getForecastDashBoard = async () => {
      try {
        const response = await axios.get(`${baseConst.apiUrl}v1/forecast/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        setDashboardData(response.data)

        const report_response = await axios.get(`${baseConst.apiUrl}v1/forecast/${id}/report/`, {
          headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        const {
          data: { results }
        } = report_response
        setReportData(results)

        const dashbaord_response = await axios.get(`${baseConst.apiUrl}v1/forecast/${id}/dashboard/`, {
          headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })

        const { data: dash_result } = dashbaord_response
        console.log(dash_result, 'dashbaord_response')
        setDashboardReportData(dash_result)

        const salesData = [
          {
            stats: response.data.conversion_rate,
            title: 'Conversion Rate %'
          },
          {
            stats: response.data.lead_to_sale,
            title: 'Lead to Sale'
          },
          {
            stats: response.data.device,
            title: 'Device'
          },
          {
            stats: response.data.location_object.location_name,
            title: 'Location'
          },
          {
            stats: response.data.language_object.language_name,
            title: 'Language'
          },
          {
            stats: response.data.os,
            title: 'OS'
          }
        ]

        const posistionList = [
          {
            id: 1,
            stats: response.data.position_values.pos_1
          },
          {
            id: 2,
            stats: response.data.position_values.pos_2
          },
          {
            id: 3,
            stats: response.data.position_values.pos_3
          },
          {
            id: 4,
            stats: response.data.position_values.pos_4
          },
          {
            id: 5,
            stats: response.data.position_values.pos_5
          },
          {
            id: 6,
            stats: response.data.position_values.pos_6
          },
          {
            id: 7,
            stats: response.data.position_values.pos_7
          },
          {
            id: 8,
            stats: response.data.position_values.pos_8
          },
          {
            id: 9,
            stats: response.data.position_values.pos_9
          },
          {
            id: 10,
            stats: response.data.position_values.pos_10
          }
        ]
        setSalesData(salesData)
        setPositionData(posistionList)
      } catch (error) {
        console.error(error, 'detail page')
      }
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsLoading(false)
    }
    getForecastDashBoard()
  }, [id, cookie])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <>
                <span>Forcasting Report</span> - <span style={{ color: '#f00' }}>{dashboardData?.keyword}</span>
              </>
            }
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <>
                <Button variant='contained' color='warning' onClick={e => handleClick(e, '/forecast/list')}>
                  Forcast List
                </Button>
              </>
            }
            subheader={
              <Button variant='contained' color='warning' onClick={e => handleClick(e, '/forecast/list')}>
                {dashboardData.report_status}
              </Button>
            }
          />
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label='Forcasting Report'>
                <Tab label='Dashboard' {...a11yProps(0)} />
                <Tab label='Top 3 by Relevance Score' {...a11yProps(1)} />
                <Tab label='4-10 by Relevance Score' {...a11yProps(2)} />
                <Tab label='All Data' {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ApexChartWrapper>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={4}>
                    <HighLight isLoading={isLoading} orderVal={dashboardData.enter_average_order_value} />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <HighLight2 salesData={getSalesData} />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Positions posistionList={posistionList} />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Potentials potentialData={dashboardReportData} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* <ViewChartOne />  NEED TO FIX */}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* <ViewChartTwo />  NEED TO FIX */}
                  </Grid>
                </Grid>
              </ApexChartWrapper>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {reportData.length > 0 && <TopThree report={reportData} />}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {reportData.length > 0 && <TopTen report={reportData} />}
            </TabPanel>
            <TabPanel value={value} index={3}>
              {reportData.length > 0 && <All report={reportData} />}
            </TabPanel>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ForcastList
