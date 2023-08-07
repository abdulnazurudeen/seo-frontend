import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Tooltip, Typography } from '@mui/material'
import InfoRoundedIcon from 'mdi-material-ui/Information'

// import TablePagination from '@mui/material/TablePagination'
// import { useState, ChangeEvent } from 'react'
// import TopTenData from '../../../data/top_ten_data'

function TopTen({ report = [] }) {
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

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Tooltip title='Relevance Score'>
                  <Typography className='tablehead'>
                    Overlap <InfoRoundedIcon fontSize={'small'} />
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>Keyword</TableCell>
              <TableCell>
                <Tooltip title='Search Volume'>
                  <Typography className='tablehead'>
                    S.V <InfoRoundedIcon fontSize={'small'} />
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title='Keyword Difficulty'>
                  <Typography className='tablehead'>
                    Difficulty <InfoRoundedIcon fontSize={'small'} />
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title='Cost per Click'>
                  <Typography className='tablehead'>
                    CPC <InfoRoundedIcon fontSize={'small'} />
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>Traffic</TableCell>
              <TableCell>Conversions</TableCell>
              <TableCell>Sales</TableCell>
              <TableCell>Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // TopThreeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              report.map((row: any) => {
                // console.log(row, 'row')

                return (
                  <TableRow hover key={row.Keyword}>
                    <TableCell>{row.relevance_score_overlap}</TableCell>
                    <TableCell sx={{ minWidth: 300 }}>{row.keyword}</TableCell>
                    <TableCell>{row.search_volume}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{row.cpc ? row.cpc : '-'}</TableCell>
                    <TableCell>{row.average_4_10.traffic}</TableCell>
                    <TableCell>{row.average_4_10.conversion}</TableCell>
                    <TableCell>{row.average_4_10.sale}</TableCell>
                    <TableCell>{row.average_4_10.revenue}</TableCell>
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
export default TopTen
