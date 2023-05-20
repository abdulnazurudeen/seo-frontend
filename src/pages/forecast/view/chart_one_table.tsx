import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

let tableList = [
    {
      "f1": "Best (1/2 these keywords in 1-3)",
      "f2": "351055",
      "f3": "57830"
    },
    {
      "f1": "Better (1/4 your keywords in 1-3)",
      "f2": "175528",
      "f3": "28915"
    },
    {
      "f1": "Good (1/8 your keywords in top 1-3)",
      "f2": "87764",
      "f3": "14457"
    },
    {
      "f1": "Best (1/2 these keywords in 4-10)",
      "f2": "351055",
      "f3": "15352"
    },
    {
      "f1": "Better (1/4 your keywords in 4-10)",
      "f2": "175528",
      "f3": "7676"
    },
    {
      "f1": "Good (1/8 your keywords in top 4-10)",
      "f2": "87764",
      "f3": "3838"
    }
   ]

   const ChartOneTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Total Keyword Marketplace Potential</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell>Potential Traffic</TableCell>
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
   export default ChartOneTable;