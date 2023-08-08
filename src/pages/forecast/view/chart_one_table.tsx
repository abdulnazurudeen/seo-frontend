import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

interface ChartOneTableProps {
  lables: any
  col1: any
  col2: any
  headings: any
}

const ChartOneTable = ({ lables, col1, col2, headings }: ChartOneTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Total Keyword Marketplace Potential</TableCell>
            <TableCell>{headings[0]}</TableCell>
            <TableCell>{headings[1]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lables.map((label: string, index: number) => (
            <TableRow key={index}>
              <TableCell>{label}</TableCell>
              <TableCell>{col1[index]}</TableCell>
              <TableCell>{col2[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default ChartOneTable
