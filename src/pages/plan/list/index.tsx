import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import baseConst from 'src/data/const'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

interface PlanType {
  id: number
  name: string
  duration?: number
  plan_type: string
  points: number
  price: number
  currency: string
}
const PlanList = () => {
  const [planList, setPlanList] = useState([])
  const [cookie] = useCookies(['token'])
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      // planList
      const { token } = cookie
      const response = await fetch(`${baseConst.apiUrl}v1/plans/?plan_type=pay_as_you_go`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      })
      const { status } = response
      if (status == 200) {
        const data = await response.json()

        // console.log(data)
        setPlanList(data)
      }
    }
    loadData()
  }, [cookie])

  const paymentRedirect = (id: number) => {
    router.push(`/payment?plan=${id}`)
  }

  return (
    <>
      <Card>
        <CardHeader title='Pay as You go' titleTypographyProps={{ variant: 'h6' }} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plan</TableCell>
                <TableCell>Credits</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planList.map((plan: PlanType, index) => (
                <TableRow hover key={index}>
                  <TableCell>{plan?.name}</TableCell>
                  <TableCell>{plan?.points}</TableCell>
                  <TableCell>
                    {plan?.currency} {plan?.price}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant='contained'
                      color='success'
                      onClick={() => paymentRedirect(plan.id)}
                      style={{ color: '#fff', padding: '2px 10px', fontSize: '12px' }}
                    >
                      Purchase
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}
export default PlanList
