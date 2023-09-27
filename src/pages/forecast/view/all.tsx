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

const All = (props: { report: any; id: number }) => {
  const { report, id } = props

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CSVExportButton forecastRequestId={id} reportType={'all_position'} />
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
                  <TableCell sx={{ minWidth: 300 }}>
                    {row.keyword}
                    <small>{row.keyword_type}</small>
                  </TableCell>
                  <TableCell>{row.search_volume}</TableCell>
                  <TableCell>{row.keyword_difficulty}</TableCell>
                  <TableCell>${row.cpc ? row.cpc : '-'}</TableCell>
                  {Object.keys(row.all_position).map(posid => {
                    const posdata = row.all_position[posid]

                    return (
                      <>
                        <TableCell>{roundOff(posdata.traffic, 0)}</TableCell>
                        <TableCell>${roundOff(posdata.conversion, 0)}</TableCell>
                        <TableCell>${roundOff(posdata.sale, 0)}</TableCell>
                        <TableCell>${roundOff(posdata.revenue, 0)}</TableCell>
                      </>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
export default All
