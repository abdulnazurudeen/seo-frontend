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
}
const PlanList = () => {
  const [planList, setPlanList] = useState([])
  const [cookie] = useCookies(['token'])
  const router = useRouter()

  //   const planList = [
  //     {
  //       active: true,
  //       f1: '1',
  //       f2: '10',
  //       f3: '10',
  //       f4: '0.15',
  //       f5: '1.5',
  //       f6: '1000%',
  //       f7: '15',
  //       f8: '100',
  //       f9: '1000'
  //     },
  //     {
  //       active: false,
  //       f1: '2',
  //       f2: '20',
  //       f3: '20',
  //       f4: '0.15',
  //       f5: '3',
  //       f6: '800%',
  //       f7: '24',
  //       f8: '100',
  //       f9: '2000'
  //     },
  //     {
  //       active: false,
  //       f1: '3',
  //       f2: '30',
  //       f3: '30',
  //       f4: '0.15',
  //       f5: '4.5',
  //       f6: '600%',
  //       f7: '27',
  //       f8: '100',
  //       f9: '3000'
  //     }
  //   ]
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

  // const PlanListTwo = [
  //   {
  //     active: false,
  //     f1: '1',
  //     f2: '20',
  //     f3: '20',
  //     f4: '0.15',
  //     f5: '3',
  //     f6: '500%',
  //     f7: '15',
  //     f8: '100',
  //     f9: '2000'
  //   },
  //   {
  //     active: false,
  //     f1: '2',
  //     f2: '40',
  //     f3: '40',
  //     f4: '0.15',
  //     f5: '6',
  //     f6: '400%',
  //     f7: '24',
  //     f8: '100',
  //     f9: '4000'
  //   },
  //   {
  //     active: false,
  //     f1: '3',
  //     f2: '60',
  //     f3: '60',
  //     f4: '0.15',
  //     f5: '9',
  //     f6: '300%',
  //     f7: '27',
  //     f8: '100',
  //     f9: '6000'
  //   }
  // ]

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
                {/* <TableCell>Keywords</TableCell> */}
                <TableCell>Cost</TableCell>
                {/* <TableCell>Actual</TableCell>
                <TableCell>Margin</TableCell>
                <TableCell>Selling Cost</TableCell> */}
                {/* <TableCell>Max Keywords</TableCell> */}
                {/* <TableCell>Max Potentials Keyword</TableCell> */}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planList.map((potential: PlanType, index) => (
                <TableRow hover key={index}>
                  <TableCell>{potential?.name}</TableCell>
                  <TableCell>{potential?.points}</TableCell>
                  <TableCell>{potential?.price}</TableCell>
                  {/*<TableCell>{potential.f2}</TableCell>
                  <TableCell>{potential.f3}</TableCell>
                  <TableCell>{potential.f4}</TableCell> */}
                  {/* <TableCell>{potential.f5}</TableCell>
                  <TableCell>{potential.f6}</TableCell>
                  <TableCell>{potential.f7}</TableCell> */}
                  {/* <TableCell>{potential.f8}</TableCell>
                  <TableCell>{potential.f9}</TableCell> */}
                  <TableCell>
                    <Button
                      variant='contained'
                      color='success'
                      onClick={() => paymentRedirect(potential.id)}
                      style={{ color: '#fff', padding: '2px 10px', fontSize: '12px' }}
                    >
                      Purchase
                    </Button>
                  </TableCell>
                  {/* {potential.active ? (
                    <TableCell>
                      <Button
                        variant='contained'
                        color='success'
                        style={{ color: '#fff', padding: '2px 10px', fontSize: '12px' }}
                      >
                        Activated
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Button
                        variant='contained'
                        color='warning'
                        style={{ color: '#fff', padding: '2px 10px', fontSize: '12px' }}
                      >
                        Activate
                      </Button>
                    </TableCell>
                  )} */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* <Card style={{ marginTop: 20 }}>
        <CardHeader 
            title={ <><span>Credits Subscription</span> <span style={{ color:"#FFA500"}}>(Quater / Half / 1 Year)</span></>} 
            titleTypographyProps={{ variant: 'h6' }}
        />
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Plan</TableCell>
                        <TableCell>Credits</TableCell>
                        <TableCell>Keywords</TableCell>
                        <TableCell>Cost</TableCell>
                        <TableCell>Actual</TableCell>
                        <TableCell>Margin</TableCell>
                        <TableCell>Selling Cost</TableCell>
                        <TableCell>Max Keywords</TableCell>
                        <TableCell>Max Potentials Keyword</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {PlanListTwo.map((potential, index) => (
                    <TableRow hover key={index}>
                        <TableCell>{potential.f1}</TableCell>
                        <TableCell>{potential.f2}</TableCell>
                        <TableCell>{potential.f3}</TableCell>
                        <TableCell>{potential.f4}</TableCell>
                        <TableCell>{potential.f5}</TableCell>
                        <TableCell>{potential.f6}</TableCell>
                        <TableCell>{potential.f7}</TableCell>
                        <TableCell>{potential.f8}</TableCell>
                        <TableCell>{potential.f9}</TableCell>
                        {
                            potential.active? <TableCell><Button variant="contained" color="success" style={{color: '#fff', padding: '2px 10px', fontSize: '12px'}}>Activated</Button></TableCell>
                            : <TableCell><Button variant="contained" color="warning" style={{color: '#fff', padding: '2px 10px', fontSize: '12px'}}>Activate</Button></TableCell>
                        }
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Card> */}
    </>
  )
}
export default PlanList
