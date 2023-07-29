import { useEffect, useState } from 'react'
import { Alert, Button, CardContent } from '@mui/material'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import baseConst from 'src/data/const'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

// const result: {
//   error: StripeError
// }

const PaymentCancelPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [iserror, setIsError] = useState(false)
  const [cookie] = useCookies(['token'])
  const router = useRouter()

  useEffect(() => {
    const sendUpdate = async () => {
      const { txid } = router.query
      setLoading(true)
      setIsError(false)
      setError('')
      try {
        const { token } = cookie
        const response = await fetch(`${baseConst.apiUrl}v1/update-transaction-status/${txid}/`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
          },
          body: JSON.stringify({
            status: 'completed'
          })
        })
        const { status } = response
        if (status == 400) {
          const { status } = await response.json()
          setError(status)
          setIsError(true)
        }
      } catch (error: any) {
        console.log('error,', error)
        setIsError(true)
      } finally {
        setLoading(false)
      }
    }
    sendUpdate()
  }, [router])
  const err_msg = error ? <div>Error: {error}</div> : 'Something went wrong'
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Proceed to payment' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            {loading && 'Loading...'}
            {iserror
              ? err_msg
              : !loading && (
                  <Alert variant='filled' color='success' severity='success'>
                    Thankyou, Your payment success
                  </Alert>
                )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PaymentCancelPage
