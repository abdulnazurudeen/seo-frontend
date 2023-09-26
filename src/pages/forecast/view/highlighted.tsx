import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// import { styled, useTheme } from '@mui/material/styles'

// const TriangleImg = styled('img')({
//   right: 0,
//   bottom: 0,
//   height: 170,
//   position: 'absolute'
// })

// const TrophyImg = styled('img')({
//   right: 36,
//   bottom: 20,
//   height: 98,
//   position: 'absolute'
// })

interface HighLightProps {
  isLoading: boolean
  orderVal: number
}

const HighLight = ({ isLoading, orderVal }: HighLightProps) => {
  // const theme = useTheme()
  // const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
  setTimeout(() => {
    // console.log(orderVal)
  }, 1000)
  if (isLoading) {
    return null
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography>Average Order Value</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Based on the customer data
        </Typography>
        <Typography variant='body2' sx={{ color: 'primary.main' }}>
          ${orderVal}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default HighLight
