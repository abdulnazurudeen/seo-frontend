import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { useState, ChangeEvent } from 'react'
import AllData from '../../../data/all_data'

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
                    </TableRow>
                </TableHead>
                <TableBody>
                {AllData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                        <TableCell>{row.f26}</TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={AllData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    )
   }
   export default Potentials;