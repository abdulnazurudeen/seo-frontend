import { useEffect } from 'react'
import { Button } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import baseConst from 'src/data/const'
import { strip_key } from 'src/data/secret'

const stripePromise = loadStripe(strip_key)

const PaymentPage = () => {
  useEffect(() => {
    // Optional: Perform any necessary checks before redirecting to Stripe
  }, [])

  const handlePaymentClick = async () => {
    const stripe = await stripePromise

    const response = await fetch(`${baseConst.apiUrl}/api/v1/create-checkout-session/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan_id: 1
      })
    })
    const session = await response.json()
    // sessionId: session.id
    // Redirect the user to the Stripe payment page
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      // Handle any errors that may occur during the redirect
      console.error(result.error)
    }
  }

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handlePaymentClick}>
        Proceed to Payment
      </Button>
    </div>
  )
}

export default PaymentPage
