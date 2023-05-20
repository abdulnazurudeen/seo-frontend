import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import ProfileForm from './profile_form'

const MyProfile = () =>{
    return (
        <Card>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <ProfileForm />
                </Grid>
            </Grid>
        </Card>
    )
}

export default MyProfile
