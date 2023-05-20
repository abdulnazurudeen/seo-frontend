import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

let potentialsList = [
    {
      f1: "Best (1/2 these keywords in 1-3)",
      f2: "351055",
      f3: "$8.85",
      f4: "57830",
      f5: "172.63",
      f6: "172.63",
      f7: "8674569.05",
      f8: "104094828.60"
    },
    {
      f1: "Better (1/4 your keywords in 1-3)",
      f2: "175528",
      f3: "$4.43",
      f4: "28915",
      f5: "86.31",
      f6: "86.31",
      f7: "4337284.52",
      f8: "52047414.30"
    },
    {
      f1: "Good (1/8 your keywords in top 1-3)",
      f2: "87764",
      f3: "$2.21",
      f4: "14457",
      f5: "43.16",
      f6: "43.16",
      f7: "2168642.26",
      f8: "26023707.15"
    },
    {
      f1: "Best (1/2 these keywords in 4-10)",
      f2: "351055",
      f3: "$8.85",
      f4: "15352",
      f5: "45.27",
      f6: "45.27",
      f7: "2302920.80",
      f8: "27635049.60"
    },
    {
      f1: "Better (1/4 your keywords in 4-10)",
      f2: "175528",
      f3: "$4.43",
      f4: "7676",
      f5: "22.63",
      f6: "22.63",
      f7: "1151460.40",
      f8: "13817524.80"
    },
    {
      f1: "Good (1/8 your keywords in top 4-10)",
      f2: "87764",
      f3: "$2.21",
      f4: "3838",
      f5: "11.32",
      f6: "11.32",
      f7: "575730.20",
      f8: "6908762.40"
    }
   ]

   const Potentials = () => {
    return (
        <Card>
        <CardHeader 
            title='Weighted Keyword Potential Forecast' 
            titleTypographyProps={{ variant: 'h6' }}
        />
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Potential</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell>Avg Cpc</TableCell>
                    <TableCell>Potential Traffic</TableCell>
                    <TableCell>Conversions</TableCell>
                    <TableCell>Sales</TableCell>
                    <TableCell>Monthly Revenue Potential</TableCell>
                    <TableCell>Annual Revenue</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {potentialsList.map((potential, index) => (
                    <TableRow hover key={index}>
                        <TableCell>{potential.f1}</TableCell>
                        <TableCell>{potential.f2}</TableCell>
                        <TableCell>{potential.f3}</TableCell>
                        <TableCell>{potential.f4}</TableCell>
                        <TableCell>{potential.f5}</TableCell>
                        <TableCell>{potential.f6}</TableCell>
                        <TableCell>{potential.f7}</TableCell>
                        <TableCell>{potential.f8}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Card>
    )
   }
   export default Potentials;