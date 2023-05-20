import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import ForeCastForm from './new_form'

const forcastNew = () =>{
    return (
        <Card>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <ForeCastForm />
                </Grid>
            </Grid>
        </Card>
    )
}

export default forcastNew