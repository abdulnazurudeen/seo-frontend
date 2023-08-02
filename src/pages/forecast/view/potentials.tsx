import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { roundOff } from '../../../@core/utils/helper'

const lables: any = {
  average_1_3: {
    best: 'Best (1/2 these keywords in 1-3)',
    better: 'Better (1/4 your keywords in 1-3)',
    good: 'Good (1/8 your keywords in top 1-3)'
  },
  average_4_10: {
    best: 'Best (1/2 these keywords in 4-10)',
    better: 'Better (1/4 your keywords in 4-10)',
    good: 'Good (1/8 your keywords in top 4-10)'
  }
}

interface PotentialDataProps {
  potentialData: any
}

const Potentials = ({ potentialData }: PotentialDataProps) => {
  // console.log(lables)

  if (!potentialData) return <>Loading...</>

  return (
    <Card>
      <CardHeader title='Weighted Keyword Potential Forecast' titleTypographyProps={{ variant: 'h6' }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Potential</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Avg Cpc</TableCell>
              <TableCell>Traffic</TableCell>
              <TableCell>Conversions</TableCell>
              <TableCell>Sales</TableCell>
              <TableCell>Monthly Revenue </TableCell>
              <TableCell>Annual Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {['average_1_3', 'average_4_10'].map((k: string) =>
              Object.keys(potentialData[k]).map((pkey: any) => (
                <TableRow hover className={`potential-${pkey}`} key={potentialData[k][pkey]['id']}>
                  <TableCell>{lables[k][pkey]}</TableCell>
                  <TableCell>{potentialData[k][pkey]['search_volume']}</TableCell>
                  <TableCell>{potentialData[k][pkey]['cpc']}</TableCell>
                  <TableCell>{roundOff(potentialData[k][pkey]['traffic'])}</TableCell>
                  <TableCell>{roundOff(potentialData[k][pkey]['conversion'])}</TableCell>
                  <TableCell>{roundOff(potentialData[k][pkey]['sales'])}</TableCell>
                  <TableCell>{roundOff(potentialData[k][pkey]['revenue'])}</TableCell>
                  <TableCell>{roundOff(potentialData[k][pkey]['annual_revenue'])}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
export default Potentials
