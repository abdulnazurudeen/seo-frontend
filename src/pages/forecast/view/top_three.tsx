import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
// import TablePagination from '@mui/material/TablePagination'
// import { useState, ChangeEvent } from 'react'
// import TopThreeData from '../../../data/top_three_data'

function TopThree({ report = [] }) {
  // const [page, setPage] = useState<number>(0)
  // const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage)
  // }
  // const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(+event.target.value)
  //   setPage(0)
  // }
  //, page, rowsPerPage
  console.log('TopThreeData', report)

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Relevance Score</TableCell>
              <TableCell>Keyword</TableCell>
              <TableCell>Search Volume</TableCell>
              <TableCell>Cost per Click</TableCell>
              <TableCell>#1-3 Traffic</TableCell>
              <TableCell>#1-3 Conversions</TableCell>
              <TableCell>#1-3 Sales</TableCell>
              <TableCell>#1-3 Revenue</TableCell>
              {/* <TableCell>Top 1-3 Pos CTR - 16.47%</TableCell>
              <TableCell>Conversion</TableCell>
              <TableCell>Sale</TableCell>
              <TableCell>Revenue</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // TopThreeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              report.map((row: any) => {
                console.log(row, 'row')
                return (
                  <TableRow hover key={row.Keyword}>
                    <TableCell>{row.relevance_score_overlap}</TableCell>
                    <TableCell sx={{ minWidth: 300 }}>{row.keyword}</TableCell>
                    <TableCell>{row.search_volume}</TableCell>
                    <TableCell>{row.cpc}</TableCell>
                    <TableCell>{row.average_1_3.traffic}</TableCell>
                    <TableCell>{row.average_1_3.conversion}</TableCell>
                    <TableCell>{row.average_1_3.sale}</TableCell>
                    <TableCell>{row.average_1_3.revenue}</TableCell>
                    {/* <TableCell>{row.f9}</TableCell>
                    <TableCell>{row.f10}</TableCell>
                    <TableCell>{row.f11}</TableCell>
                    <TableCell>{row.f12}</TableCell> */}
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={TopThreeData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
    </Paper>
  )
}
export default TopThree
