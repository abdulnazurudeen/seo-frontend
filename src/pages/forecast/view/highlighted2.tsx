import { ReactElement } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const initSalesData: DataType[] = [
  {
    stats: '',
    title: 'Conversion Rate %',
    color: 'primary',
    icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '',
    title: 'Lead to Sale',
    color: 'success',
    icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '',
    color: 'warning',
    title: 'Device',
    icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '',
    color: 'info',
    title: 'Location',
    icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '',
    color: 'warning',
    title: 'Language',
    icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '',
    color: 'info',
    title: 'OS',
    icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
  }
]

const renderStats = () => {
  return initSalesData.map((item: DataType, index: number) => (
    <Grid item xs={12} mb={5} sm={6} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

interface HighLightProps {
  salesData: []
}
const HighLight2 = ({ salesData }: HighLightProps) => {
  salesData?.map((item: DataType) => {
    initSalesData.map(x => {
      if (x.title == item.title) {
        x.stats = item.stats
      }
    })
  })

  return (
    <Card>
      <CardHeader
        title='Customer Information'
        style={{ paddingBottom: 0 }}
        titleTypographyProps={{
          sx: {
            mb: 0.5,
            pb: 0,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default HighLight2
