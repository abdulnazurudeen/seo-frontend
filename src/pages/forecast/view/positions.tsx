import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Badge from '@mui/material/Badge'

const salesData = [
  {
    id: 1,
    color: 'primary',
  },
  {
    id: 2,
    color: 'success',
  },
  {
    id: 3,
    color: 'warning',
  },
  {
    id: 4,
    color: 'info',
  },
  {
    id: 5,
    color: 'warning',
  },
  {
    id: 6,
    color: 'primary',
  },
  {
    id: 7,
    color: 'warning',
  },
  {
    id: 8,
    color: 'secondary',
  },
  {
    id: 9,
    color: 'success',
  },
  {
    id: 10,
    color: 'info',
  }
]

const renderStats = (posistionList:any) => {
  return posistionList.map((item: any, index: number) => (
    <Grid item xs="auto" key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
      <Badge color={item.color} style={{fontSize: '8px'}} badgeContent={index+1} anchorOrigin={{vertical: 'top', horizontal: 'left' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 5,
            width: 75,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          <Typography variant='h6' style={{ fontSize: 13, color: '#fff' }}>{item.stats}</Typography>
        </Avatar>
        </Badge>
      </Box>
    </Grid>
  ))
}

interface PositionsProps {
  posistionList: any;
}
const Positions = ({ posistionList }: PositionsProps) => {
  posistionList.map((item: any)=>{
    salesData.map(x=>{
      if(x.id == item.id){
        item.color = x.color;
      }
    })
  });

  return (
    <Card>
      <CardHeader
        title='SERP Click Through Rate % for Positions'
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                Based on Research
            </Box>{' '}
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(posistionList)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Positions
