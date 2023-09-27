import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Tooltip, Typography } from '@mui/material'
import InfoRoundedIcon from 'mdi-material-ui/Information'
import CSVExportButton from 'src/layouts/components/CsvDownload'
import { roundOff } from 'src/@core/utils/helper'

function TopThree(props: { report: any; id: number }) {
  const { report, id } = props
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CSVExportButton forecastRequestId={id} reportType={'average_1_3'} />
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
                    <TableCell sx={{ minWidth: 300 }}>
                      {row.keyword}
                      <small>{row.keyword_type}</small>
                    </TableCell>
                    <TableCell>{row.search_volume}</TableCell>
                    <TableCell>{row.keyword_difficulty}</TableCell>
                    <TableCell>${row.cpc ? row.cpc : '-'}</TableCell>
                    <TableCell>{roundOff(row.average_1_3.traffic, 0)}</TableCell>
                    <TableCell>${roundOff(row.average_1_3.conversion, 0)}</TableCell>
                    <TableCell>${roundOff(row.average_1_3.sale, 0)}</TableCell>
                    <TableCell>${roundOff(row.average_1_3.revenue, 0)}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
export default TopThree
