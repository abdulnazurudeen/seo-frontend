import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

let tableList = [
    {
      f1: "Best (1/2 these keywords in 1-3)",
      f2: 57830,
      f3: 172.63
    },
    {
      f1: "Better (1/4 your keywords in 1-3)",
      f2: 28915,
      f3: 86.31
    },
    {
      f1: "Good (1/8 your keywords in top 1-3)",
      f2: 14457,
      f3: 43.16
    },
    {
      f1: "Best (1/2 these keywords in 4-10)",
      f2: 15352,
      f3: 45.27
    },
    {
      f1: "Better (1/4 your keywords in 4-10)",
      f2: 7676,
      f3: 22.63
    },
    {
      f1: "Good (1/8 your keywords in top 4-10)",
      f2: 3838,
      f3: 11.32
    }
   ]

   const ChartTwoTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Total Keyword Marketplace Potential</TableCell>
                    <TableCell>Potential Traffic</TableCell>
                    <TableCell>Conversions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableList.map((list, index) => (
                    <TableRow key={index}>
                        <TableCell>{list.f1}</TableCell>
                        <TableCell>{list.f2}</TableCell>
                        <TableCell>{list.f3}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
   }
   export default ChartTwoTable;