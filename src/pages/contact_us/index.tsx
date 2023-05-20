import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField';

const ContactUs = () =>{
    return (
        <Card>
            <CardHeader title="Contact us" titleTypographyProps={{ variant: 'h6' }} />
            <Grid container spacing={6}>
                <Grid item xs={6} md={6}>
                    <TextField
                    id="outlined-multiline-flexible"
                    label="Requirements"
                    style={{ width : '100%', marginLeft: '20px', marginBottom: '30px'}}
                    multiline
                    maxRows={4}
                    />
                </Grid>
                <Grid item xs={12} md={12} pb={10} ml={5} justifyContent={'right'}>
                    <Button variant="contained" color="success">Continue</Button>
                </Grid>
            </Grid>
        </Card>
    )
}

export default ContactUs