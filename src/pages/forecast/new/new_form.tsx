import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router'

// interface State {
//   password: string
//   showPassword: boolean
// }

const ForeCastForm = () => {
    const router = useRouter()
    const handleClick = (e: { preventDefault: () => void }, path: string) => {
        e.preventDefault()
        router.push(path)
    };
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

    const [fields, setFields] = useState<string[]>(['']);

    const addField = () => {
        setFields([...fields, '']);
    };

    const deleteField = (index: number) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const addDeleteKeywords = (index: number, value: string) => {
        const updatedFields = [...fields];
        updatedFields[index] = value;
        setFields(updatedFields);
    };

    return (
    <Card>
        <CardHeader 
            title='Add New Forcast' 
            titleTypographyProps={{ variant: 'h6' }}
            action={
                <Button variant="contained" color="warning" onClick={(e) => handleClick(e, "/forecast/list")}>
                    Forcast List
                </Button >
            }
        />
        <CardContent>
        <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={5}>
            <Grid item xs={12}>
            <div>
                {fields.map((field, index) => (
                    <Box key={index} display="flex" alignItems="center" marginBottom={2}>
                    <TextField
                        style={{ width: '70%' }}
                        value={field}
                        onChange={(e) => addDeleteKeywords(index, e.target.value)}
                        label={`Keywords ${index + 1}`}
                        variant="outlined"
                    />
                    <Button style={{marginLeft: '15px'}} onClick={() => deleteField(index)} variant="contained" color="warning">
                        Delete
                    </Button>
                    </Box>
                ))}
                <Button onClick={addField} variant="contained" color="primary">
                    Add Field
                </Button>
            </div>

            </Grid>
            <Grid item xs={6}>
                <TextField 
                fullWidth 
                name="conversion_rate"
                value={state.conversion_rate}
                onChange={handleChange}
                label='Enter Your Conversion Rate %' 
                placeholder='Enter value in %' 
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                fullWidth
                name="lead_close_rate"
                onChange={handleChange}
                label='Lead to Sale (Lead Close Rate) %'
                placeholder='Enter value in %'
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                fullWidth
                name="order_val"
                onChange={handleChange}
                label='Enter Average Order Value'
                placeholder='Enter your value'
                />
            </Grid>
            <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">What is Your Device</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="device"
                        label="What is Your Device"
                        onChange={handleChange}
                        >
                        <MenuItem value={'Desktop'}>Desktop</MenuItem>
                        <MenuItem value={'Mobile'}>Mobile</MenuItem>
                        <MenuItem value={'Tab'}>Tab</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Enter Your Country/State/Region</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="location"
                        label="Enter Your Country/State/Region"
                        onChange={handleChange}
                        >
                        <MenuItem value={'India'}>India</MenuItem>
                        <MenuItem value={'United States'}>United States</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Enter Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="lang"
                        label="Enter Language"
                        onChange={handleChange}
                        >
                        <MenuItem value={'English'}>English</MenuItem>
                        <MenuItem value={'Tamil'}>Tamil</MenuItem>
                        <MenuItem value={'Hindi'}>Hindi</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">OS</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="os"
                        label="OS"
                        onChange={handleChange}
                    >
                        <MenuItem value={'Window'}>Window</MenuItem>
                        <MenuItem value={'Mac'}>Mac</MenuItem>
                        <MenuItem value={'Android'}>Android</MenuItem>
                        <MenuItem value={'IOS'}>IOS</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <TextField
                fullWidth
                name="count"
                onChange={handleChange}
                label='No of Related keyword'
                placeholder='Enter your value'
                />
            </Grid>
            
            <Grid item xs={12}>
                <Box
                sx={{
                    gap: 5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'right',
                    justifyContent: 'end'
                }}
                >
                <Button type='submit' variant='contained' size='large'>
                    Get Started!
                </Button>
                </Box>
            </Grid>
            </Grid>
        </form>
        </CardContent>
    </Card>
    )
}

export default ForeCastForm
