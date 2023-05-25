import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { useState, ChangeEvent } from 'react'
import TopTenData from '../../../data/top_ten_data'

const Potentials = () => {
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Relevance Score (Overlap)"</TableCell>
                    <TableCell>Keyword"</TableCell>
                    <TableCell>Search Volume"</TableCell>
                    <TableCell>Cost per Click"</TableCell>
                    <TableCell>#4-10 Traffic"</TableCell>
                    <TableCell>#4-10 Conversions"</TableCell>
                    <TableCell>#4-10 Sales"</TableCell>
                    <TableCell>#4-10 Revenue"</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {TopTenData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    console.log(row.f2);

                    return (
                        <TableRow hover key={row.f2}>
                        <TableCell>{row.f1}</TableCell>
                        <TableCell sx={{ minWidth: 300 }}>{row.f2}</TableCell>
                        <TableCell>{row.f3}</TableCell>
                        <TableCell>{row.f4}</TableCell>
                        <TableCell>{row.f5}</TableCell>
                        <TableCell>{row.f6}</TableCell>
                        <TableCell>{row.f7}</TableCell>
                        <TableCell>{row.f8}</TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={TopTenData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    )
   }
   export default Potentials;