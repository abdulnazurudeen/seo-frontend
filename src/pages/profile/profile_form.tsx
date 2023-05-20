import {useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
const ProfileeForm = () => {

    const router = useRouter()
    const [state, setState] = useState({
        conversion_rate: 0,
        lead_close_rate: 0,
        order_val: '',
        device: '',
        location: '',
        lang: '',
        os: '',
        count: '',
    });
    
    const handleChange = (event: { target: { name: any; value: any } }) => {
        const { name, value } = event.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value
        }));
    };

    return (
    <Card>
        <CardHeader 
            title='My Profile' 
            titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent>
        <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={5}>
                <Grid item xs={2}>
                    <Paper elevation={0} />
                        <img style={{ width: '100%' }} src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png" />
                        <Button variant="contained" color="info" style={{ fontSize: '10px' }}>Chanage Profile</Button>
                    <Paper />
                </Grid>
                <Grid item xs={5}>
                    <TextField 
                        fullWidth 
                        name="first Name"
                        onChange={handleChange}
                        label='First Name' 
                        placeholder='Enter First Name' 
                    />
                    <TextField
                        fullWidth
                        name="email"
                        style={{ marginTop: '20px'}}
                        onChange={handleChange}
                        label='Email Address'
                        placeholder='Enter Email Address'
                        />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        fullWidth
                        name="last_name"
                        onChange={handleChange}
                        label='Last Name'
                        placeholder='Enter Last Name'
                    />
                    <TextField
                        fullWidth
                        name="mobile_number"
                        style={{ marginTop: '20px'}}
                        onChange={handleChange}
                        label='Mobile Number'
                        placeholder='Enter Mobile Number'
                    />
                </Grid>
                <Grid item xs={12} md={12} pb={10}>
                    <div style={{ textAlign: 'right' }}>
                        <Button variant="contained" color="success">Save</Button>
                    </div>
                </Grid>
            </Grid>
        </form>
        </CardContent>
    </Card>
    )
}

export default ProfileeForm
