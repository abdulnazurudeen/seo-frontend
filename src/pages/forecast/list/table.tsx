import { useState, ChangeEvent, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Button  from '@mui/material/Button'
import { useRouter } from 'next/router'
import baseConst from '../../../data/const'
import axios from 'axios';

interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'left'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'keyword', label: 'Keyword', minWidth: 100 },
  { id: 'conversion_rate', label: 'Conversion Rate', minWidth: 100 },
  { id: 'lead_to_sale', label: 'Lead to Sale', minWidth: 100 },
  { id: 'enter_average_order_value', label: 'Enter Average Order Value', minWidth: 100 },
  { id: 'device', label: 'Device', minWidth: 100 },
  { id: 'location', label: 'Location', minWidth: 100 },
  { id: 'language', label: 'Language', minWidth: 100 },
  { id: 'os', label: 'OS', minWidth: 100 },
  { id: 'no_of_related_keyword', label: 'No. of Related Keyword', minWidth: 100 },
];
const ForeCastListTable = () => {
  const [responseData, setResponseData] = useState([]);
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const router = useRouter()
  const handleClick = (e: { preventDefault: () => void }, path: string) => {
      e.preventDefault()
      router.push(path)
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    const getForecastList = async () => {
      try {
        const response = await axios.get(baseConst.apiUrl + 'v1/forecast/', {
          headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        setResponseData(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    getForecastList();
  },[]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell sx={{ minWidth: '50' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responseData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:any) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={(e) => handleClick(e, "/forecast/view/"+row.id)} style={{color: '#fff', padding: '2px 10px', fontSize: '12px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="25px" height="25px"><path fill="#FFF" d="M5.93,25.041c0,0,8.06-11.041,18.004-11.041S41.93,25.041,41.93,25.041S33.879,36,23.934,36S5.93,25.041,5.93,25.041z"/><path fill="#CFD8DC" d="M23.934,14c9.945,0,17.996,11.041,17.996,11.041S33.879,36,23.934,36S5.93,25.041,5.93,25.041S13.989,14,23.934,14 M23.934,12C13.098,12,4.668,23.377,4.314,23.862L3.45,25.046l0.868,1.18C4.672,26.707,13.102,38,23.934,38c10.833,0,19.254-11.294,19.607-11.774l0.867-1.18l-0.862-1.183C43.192,23.378,34.771,12,23.934,12L23.934,12z"/><path fill="#00ACC1" d="M14.935,24.994c0-4.971,4.034-8.994,9-8.994c4.968,0,9,4.023,9,8.994c0,4.977-4.032,9.006-9,9.006C18.968,34,14.935,29.971,14.935,24.994z"/><path fill="#006064" d="M19.935,24.999c0-2.213,1.786-3.999,4-3.999c2.204,0,4,1.786,4,3.999c0,2.22-1.796,4.001-4,4.001C21.721,29,19.935,27.219,19.935,24.999z"/><path fill="#90A4AE" d="M5.959,25c0.524-0.7,8.369-10.96,17.975-10.96c9.605,0,17.442,10.259,17.966,10.959L46.857,25l-1.699-2.322c-0.379-0.517-9.387-12.638-21.224-12.638c-11.837,0-20.853,12.12-21.231,12.636L1,25H5.959z"/></svg> View
                    </Button >
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={responseData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ForeCastListTable
