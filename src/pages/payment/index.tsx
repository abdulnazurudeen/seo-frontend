import { useState } from 'react'
import { Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { loadStripe } from '@stripe/stripe-js'
import baseConst from 'src/data/const'
import { stripKey } from 'src/data/secret'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const stripePromise = loadStripe(stripKey)

// const result: {
//   error: StripeError
// }

const PaymentPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cookie] = useCookies(['token'])
  const router = useRouter()

  const handlePaymentClick = async () => {
    setLoading(true)
    setError(null)
    try {
      const stripe = await stripePromise

      const { token } = cookie
      const { plan } = router.query

      const response = await fetch(`${baseConst.apiUrl}v1/create-checkout-session/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          plan_id: plan
        })
      })

      const session = await response.json()

      if (stripe) {
        const result: any = await stripe.redirectToCheckout({
          sessionId: session.id
        })

        if (result.error) {
          setError(result.error.message)
        }
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Proceed to payment' titleTypographyProps={{ variant: 'h6' }} />
          <Button variant='contained' color='primary' onClick={handlePaymentClick} disabled={loading}>
            {loading ? 'Loading...' : 'Proceed to Payment'}
          </Button>
          {error && <div>Error: {error}</div>}
        </Card>
      </Grid>
    </Grid>
  )
}

export default PaymentPage
