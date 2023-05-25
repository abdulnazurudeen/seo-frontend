import * as React from 'react';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button  from '@mui/material/Button'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Positions from './positions'
import HighLight from './highlighted'
import HighLight2 from './highlighted2'
import Potentials from './potentials'
import ViewChartOne from './chart1'
import ViewChartTwo from './chart2'
import TopThree from './top_three'
import TopTen from './top_ten'
import All from './all'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
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
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
const ForcastList = () =>{
    const router = useRouter()
    const handleClick = (e, path) => {
        e.preventDefault()
        router.push(path)
    };
    
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader 
                        title={ <><span>Forcasting Report</span> - <span style={{ color: '#f00' }}>How to become a seed investor</span></>}
                        titleTypographyProps={{ variant: 'h6' }}
                        action={
                            <Button variant="contained" color="warning" onClick={(e) => handleClick(e, "/forecast/list")}>
                                Forcast List
                            </Button >
                        }
                    />
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="Forcasting Report">
                            <Tab label="Dashboard" {...a11yProps(0)} />
                            <Tab label="Top 3 by Relevance Score" {...a11yProps(1)} />
                            <Tab label="4-10 by Relevance Score" {...a11yProps(2)} />
                            <Tab label="All Data" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <ApexChartWrapper>
                                <Grid container spacing={6}>
                                    <Grid item xs={12} md={4}>
                                        <HighLight />
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <HighLight2 />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Positions />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Potentials />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <ViewChartOne />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <ViewChartTwo />
                                    </Grid>
                                </Grid>
                            </ApexChartWrapper>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TopThree />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <TopTen />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <All />
                        </TabPanel>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ForcastList