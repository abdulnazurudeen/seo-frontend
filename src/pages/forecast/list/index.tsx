import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button  from '@mui/material/Button'
import ForeCastListTable from './table'
import { useRouter } from 'next/router'

const ForcastList = () =>{
    const router = useRouter()
    const handleClick = (e: { preventDefault: () => void }, path: string) => {
        e.preventDefault()
        router.push(path)
    };
    
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                <CardHeader 
                    title='Forcasting List' 
                    titleTypographyProps={{ variant: 'h6' }}
                    action={
                        <Button variant="contained" onClick={(e) => handleClick(e, "/forecast/new")}>
                            New Forcast
                        </Button >
                    }
                 />
                <ForeCastListTable />
                </Card>
            </Grid>
        </Grid>
    )
    
}

export default ForcastList