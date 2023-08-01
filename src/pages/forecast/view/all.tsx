import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// import TablePagination from '@mui/material/TablePagination'
// import { useState, ChangeEvent } from 'react'
// import AllData from '../../../data/all_data'

const All = ({ report = [] }) => {
  //   const [page, setPage] = useState<number>(0)
  //   const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  //   const handleChangePage = (event: unknown, newPage: number) => {
  //     setPage(newPage)
  //   }

  //   const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
  //     setRowsPerPage(+event.target.value)
  //     setPage(0)
  //   }
  // console.log(report, 'report?')

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Relevance Score - Overlap</TableCell>
              <TableCell>Keyword</TableCell>
              <TableCell>Search Volume</TableCell>
              <TableCell>Keyword Difficulty</TableCell>
              <TableCell>Cost per Click</TableCell>
              <TableCell>#1 Traffic</TableCell>
              <TableCell>#1 Conversions</TableCell>
              <TableCell>#1 Sales</TableCell>
              <TableCell>#1 Revenue</TableCell>
              <TableCell>#2 Traffic</TableCell>
              <TableCell>#2 Conversions</TableCell>
              <TableCell>#2 Sales</TableCell>
              <TableCell>#2 Revenue</TableCell>
              <TableCell>#3 Traffic</TableCell>
              <TableCell>#3 Conversions</TableCell>
              <TableCell>#3 Sales</TableCell>
              <TableCell>#3 Revenue</TableCell>
              <TableCell>#4 Traffic</TableCell>
              <TableCell>#4 Conversions</TableCell>
              <TableCell>#4 Sales</TableCell>
              <TableCell>#4 Revenue</TableCell>
              <TableCell>#5 Traffic</TableCell>
              <TableCell>#5 Conversions</TableCell>
              <TableCell>#5 Sales</TableCell>
              <TableCell>#5 Revenue</TableCell>
              <TableCell>#6 Traffic</TableCell>
              <TableCell>#6 Conversions</TableCell>
              <TableCell>#6 Sales</TableCell>
              <TableCell>#6 Revenue</TableCell>
              <TableCell>#7 Traffic</TableCell>
              <TableCell>#7 Conversions</TableCell>
              <TableCell>#7 Sales</TableCell>
              <TableCell>#7 Revenue</TableCell>
              <TableCell>#8 Traffic</TableCell>
              <TableCell>#8 Conversions</TableCell>
              <TableCell>#8 Sales</TableCell>
              <TableCell>#8 Revenue</TableCell>
              <TableCell>#9 Traffic</TableCell>
              <TableCell>#9 Conversions</TableCell>
              <TableCell>#9 Sales</TableCell>
              <TableCell>#9 Revenue</TableCell>
              <TableCell>#10 Traffic</TableCell>
              <TableCell>#10 Conversions</TableCell>
              <TableCell>#10 Sales</TableCell>
              <TableCell>#10 Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row: any) => {
              return (
                <TableRow hover key={row.f2}>
                  <TableCell>{row.relevance_score_overlap}</TableCell>
                  <TableCell sx={{ minWidth: 300 }}>{row.keyword}</TableCell>
                  <TableCell>{row.search_volume}</TableCell>
                  <TableCell>{row.keyword_difficulty}</TableCell>
                  <TableCell>{row.cpc}</TableCell>
                  {Object.keys(row.all_position).map(posid => {
                    const posdata = row.all_position[posid]

                    return (
                      <>
                        <TableCell>{posdata.traffic}</TableCell>
                        <TableCell>{posdata.conversion}</TableCell>
                        <TableCell>{posdata.sale}</TableCell>
                        <TableCell>{posdata.revenue}</TableCell>
                      </>
                    )
                  })}
                  {/* <TableCell>{row.all_position.traffic}</TableCell>
                  <TableCell>{row.average_4_10.conversion}</TableCell>
                  <TableCell>{row.average_4_10.sale}</TableCell>
                  <TableCell>{row.average_4_10.revenue}</TableCell>

                  <TableCell>{row.f9}</TableCell>
                  <TableCell>{row.f10}</TableCell>
                  <TableCell>{row.f11}</TableCell>
                  <TableCell>{row.f12}</TableCell>
                  <TableCell>{row.f13}</TableCell>
                  <TableCell>{row.f14}</TableCell>
                  <TableCell>{row.f15}</TableCell>
                  <TableCell>{row.f16}</TableCell>
                  <TableCell>{row.f17}</TableCell>
                  <TableCell>{row.f18}</TableCell>
                  <TableCell>{row.f19}</TableCell>
                  <TableCell>{row.f20}</TableCell>
                  <TableCell>{row.f21}</TableCell>
                  <TableCell>{row.f21}</TableCell>
                  <TableCell>{row.f22}</TableCell>
                  <TableCell>{row.f23}</TableCell>
                  <TableCell>{row.f24}</TableCell>
                  <TableCell>{row.f25}</TableCell>
                  <TableCell>{row.f26}</TableCell> */}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={AllData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  )
}
export default All
