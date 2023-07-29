import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import baseConst from 'src/data/const'
import { useCookies } from 'react-cookie'
import { Typography } from '@mui/material'

const ProfileeForm = () => {
  const [cookie] = useCookies(['token'])
  const [state, setState] = useState({
    id: '',
    first_name: '',
    last_name: '',
    phone_no: '',
    email: '',
    remaining_point: 0,
    total_point: 0,
    used_point: 0
  })

  useEffect(() => {
    const loadData = async () => {
      const { token } = cookie
      const response = await fetch(`${baseConst.apiUrl}user/`, {
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
        console.log(data, 'data')
        setState(data)
      }
    }
    loadData()
  }, [])

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const save = async () => {
    const { token } = cookie
    const { id } = state
    const response = await fetch(`${baseConst.apiUrl}user/${id}/`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(state)
    })
  }

  return (
    <Card>
      <CardHeader title='My Profile' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            {/* <Grid item xs={2}>
                    <Paper elevation={0} />
                        <img alt="Profile Image" style={{ width: '100%' }} src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png" />
                        <Button variant="contained" color="info" style={{ fontSize: '10px' }}>Chanage Profile</Button>
                    <Paper />
                </Grid> */}
            <Grid item xs={5}>
              <TextField
                fullWidth
                name='first_name'
                value={state.first_name}
                onChange={handleChange}
                label='First Name'
                placeholder='Enter First Name'
              />
              <TextField
                fullWidth
                value={state.email}
                name='email'
                style={{ marginTop: '20px' }}
                onChange={handleChange}
                label='Email Address'
                placeholder='Enter Email Address'
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                value={state.last_name}
                name='last_name'
                onChange={handleChange}
                label='Last Name'
                placeholder='Enter Last Name'
              />
              <TextField
                fullWidth
                value={state.phone_no}
                name='phone_no'
                style={{ marginTop: '20px' }}
                onChange={handleChange}
                label='Mobile Number'
                placeholder='Enter Mobile Number'
              />
            </Grid>
            <Grid item xs={12} md={12} pb={10}>
              <div style={{ textAlign: 'right' }}>
                <Button variant='contained' color='success' onClick={save}>
                  Save
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardContent title='Credit Balance'>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          Remaining point {state?.remaining_point}
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          Total Point {state?.total_point}
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          Used Point {state?.used_point}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProfileeForm
