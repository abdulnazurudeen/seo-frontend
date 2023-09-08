import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'
import axios from 'axios'
import baseConst from '../../../data/const'
import Autocomplete from '@mui/material/Autocomplete'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCookies } from 'react-cookie'

interface Language {
  id: number
  language_name: string
  language_code: string
}
interface Location {
  id: number
  location_name: string
  location_code: string
}
interface Position {
  id: number
  name: string
  value: number
}

// let userId = 4
const ForeCastForm = () => {
  const [cookie] = useCookies(['token'])

  const [langList, setLanguages] = useState<Language[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [locationOptions, setLocationOptions] = useState<Location[]>([])
  const [positions, setPositions] = useState<Position[]>([])

  // const [totalValue, setTotalValue] = useState<number>(0)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [fields, setFields] = useState<string[]>([''])
  const [state, setState] = useState({
    conversion_rate: 0,
    lead_close_rate: 0,
    order_val: 0,
    count: 0,
    four_ten_average: 0,
    one_three_average: 0,
    device: '',
    location: '',
    lang: '',
    os: ''
  })

  const searchLangList = (event: React.ChangeEvent<{}>, value: Language | null) => {
    setSelectedLanguage(value)
  }
  const router = useRouter()
  const handleClick = (e: { preventDefault: () => void }, path: string) => {
    e.preventDefault()
    router.push(path)
  }
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
    // reset value on select
    if (name == 'device') {
      setState(prevState => ({
        ...prevState,
        os: ''
      }))
    }
  }
  const addField = () => {
    setFields([...fields, ''])
  }
  const deleteField = (index: number) => {
    const updatedFields = [...fields]
    updatedFields.splice(index, 1)
    setFields(updatedFields)
  }
  const addDeleteKeywords = (index: number, value: string) => {
    const updatedFields = [...fields]
    updatedFields[index] = value
    setFields(updatedFields)
  }
  const handleLocationSearch = async (searchValue: string) => {
    const { token } = cookie
    if (searchValue.length >= 3) {
      try {
        const response = await axios.get(baseConst.apiUrl + `v1/forecast/locations/?limit=20&search=${searchValue}`, {
          headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        setLocationOptions(response.data.results)
      } catch (error) {
        console.error(error)
      }
    }
  }
  const searchLocationList = (event: React.ChangeEvent<{}>, value: Location | null) => {
    setSelectedLocation(value)
  }
  const handleSliderChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    const updatedPositions = [...positions]
    updatedPositions[index].value = newValue
    setPositions(updatedPositions)
    const sum = updatedPositions.reduce((acc, position) => acc + position.value, 0)
    if (sum > 100) {
      const remaining = 100 - (sum - newValue)
      const adjustedPositions = [...updatedPositions]
      adjustedPositions[index].value = remaining
      setPositions(adjustedPositions)
    }

    // calculateTotalValue(updatedPositions)
  }

  // const calculateTotalValue = (updatedPositions: Position[]) => {
  //   const sum = updatedPositions.reduce((acc, position) => acc + position.value, 0)
  //   setTotalValue(sum)
  // }
  // const validateTotalValue = (value: number) => {
  //   return value !== 100
  // }

  useEffect(() => {
    const { token } = cookie

    // const getCurrentUser = async () => {
    //   try {
    //     const response = await axios.get(baseConst.apiUrl + 'user/', {
    //       headers: {
    //         Authorization: `Token ${token}`,
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     // userId = response.data.id
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }
    const postRegister = async () => {
      try {
        const response = await axios.get(baseConst.apiUrl + 'v1/forecast/languages/', {
          headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        setLanguages(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(baseConst.apiUrl + 'v1/forecast/positions/', {
          headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })

        const positionValues = response.data[0].position_values
        state.one_three_average = response.data[0].one_three_average
        state.four_ten_average = response.data[0].four_ten_average
        const positionsData: Position[] = Object.entries(positionValues).map(([name, value], index) => ({
          id: index + 1,
          name,
          value: Number(value) // Explicitly cast value to number
        }))

        setPositions(positionsData)

        // calculateTotalValue(positionsData)
      } catch (error) {
        console.error(error)
      }
    }
    postRegister()
    fetchData()

    // getCurrentUser()
  }, [cookie, state])

  const validateForm = () => {
    const validationErrors: { [key: string]: string } = {}

    // Perform validation checks
    if (fields.includes('')) {
      validationErrors.fields = 'Minimum One Keyword is required'
    }
    if (!state.conversion_rate) {
      validationErrors.conversion_rate = 'Conversion Rate is required'
    }
    if (!state.lead_close_rate) {
      validationErrors.lead_close_rate = 'Lead to Sale is required'
    }
    if (!state.order_val) {
      validationErrors.order_val = 'Average Order is required'
    }
    if (!state.count) {
      validationErrors.count = 'No of Keywords is required'
    }
    if (!state.os.trim()) {
      validationErrors.os = 'OS is required'
    }
    if (!state.device.trim()) {
      validationErrors.device = 'Device is required'
    }
    if (!selectedLocation) {
      validationErrors.selectedLocation = 'Location is required'
    }
    if (!selectedLanguage) {
      validationErrors.selectedLanguage = 'Language is required'
    }
    setErrors(validationErrors)

    return Object.keys(validationErrors).length === 0
  }

  const createForecast = (event: React.FormEvent) => {
    event.preventDefault()
    if (validateForm()) {
      console.log(errors)
    }
    const { token } = cookie
    const getPosVal: any = {}
    positions.map(item => {
      getPosVal[item.name] = item.value
    })

    // const currentDate = new Date().toLocaleDateString('en-US', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit'
    // })
    const postData = {
      keyword: fields,
      conversion_rate: state.conversion_rate,
      lead_to_sale: state.lead_close_rate,
      enter_average_order_value: state.order_val,
      device: state.device,
      location: selectedLocation ? selectedLocation.id : '',
      language: selectedLanguage ? selectedLanguage.id : '',
      os: state.os,
      no_of_related_keyword: state.count,
      position_values: getPosVal,
      top_three_average: state.one_three_average,
      four_ten_average: state.four_ten_average,
      report_status: 'requested'

      // created_on: currentDate,
      // requested_by: userId
    }
    console.log(postData)
    try {
      axios
        .post(baseConst.apiUrl + 'v1/forecast/create/', postData, {
          headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response.data)
          toast.success('New Forcast Created!', {
            position: toast.POSITION.TOP_RIGHT
          })

          // console.log('blocek redirect')
          router.push('/forecast/list')
        })
    } catch (error) {
      toast.error('Forcast Not Created!. An error occurred!', {
        position: toast.POSITION.TOP_RIGHT
      })
      console.error(error)
    }
  }

  const os_options: any = {
    desktop: { windows: 'Windows', macos: 'Mac Os' },
    mobile: { android: 'Android', ios: 'IOS' }
  }

  return (
    <Card>
      <CardHeader
        title='Add New Forcast'
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Button variant='contained' color='warning' onClick={e => handleClick(e, '/forecast/list')}>
            Forcast List
          </Button>
        }
      />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <div>
                {fields.map((field, index) => (
                  <Box key={index} display='flex' alignItems='center' marginBottom={2}>
                    <TextField
                      style={{ width: '70%' }}
                      value={field}
                      onChange={e => addDeleteKeywords(index, e.target.value)}
                      label={`Keywords ${index + 1}`}
                      variant='outlined'
                    />
                    <Button
                      style={{ marginLeft: '15px' }}
                      onClick={() => deleteField(index)}
                      variant='contained'
                      color='warning'
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
                <Button onClick={addField} variant='contained' color='primary'>
                  Add Field
                </Button>
                {Boolean(errors.fields) && (
                  <FormHelperText style={{ color: '#FF4C51' }}>{errors.fields}</FormHelperText>
                )}
              </div>
            </Grid>
            <Divider
              sx={{ mt: 0, mb: 1 }}
              style={{ borderBottom: '1px solid #ccc', width: '100%', marginTop: '20px' }}
            />
            <Grid item xs={12}>
              <Typography variant='h6' component='h4' gutterBottom>
                Position Values
              </Typography>
            </Grid>
            {positions.map((position, index) => (
              <Grid item xs={2} key={index}>
                <FormControl fullWidth>
                  <TextField
                    type='number'
                    inputProps={{ min: 0, max: 100, step: '0.01' }}
                    label={position.name.toUpperCase()}
                    value={position.value}
                    onChange={handleSliderChange(index)}
                  />
                </FormControl>
              </Grid>
            ))}
            <Grid item xs={4}></Grid>
            {/* <Grid item xs={12}>
              <Typography variant='subtitle1' gutterBottom>
                Total Position Value: <strong>{totalValue}</strong>
              </Typography>
              {!validateTotalValue(totalValue) && (
                <FormHelperText error>Sum of position values must not exceed 100.</FormHelperText>
              )}
            </Grid> */}
            {/* <Grid item xs={4}>
              <TextField
                fullWidth
                type='number'
                name='one_three_average'
                value={state.one_three_average}
                onChange={handleChange}
                label='Enter One Three Average Value'
                placeholder='Enter Value'
              />
            </Grid> */}
            {/* <Grid item xs={4}>
              <TextField
                fullWidth
                type='number'
                name='four_ten_average'
                value={state.four_ten_average}
                onChange={handleChange}
                label='Enter Four Ten Average Value'
                placeholder='Enter Value'
              />
            </Grid> */}
            <Divider
              sx={{ mt: 0, mb: 1 }}
              style={{ borderBottom: '1px solid #ccc', width: '100%', marginTop: '20px' }}
            />

            <Grid item xs={3}>
              <TextField
                fullWidth
                type='number'
                name='conversion_rate'
                inputProps={{ min: 0, max: 100 }}
                value={state.conversion_rate}
                onChange={handleChange}
                label='Enter Your Conversion Rate %'
                placeholder='Enter value in %'
                error={Boolean(errors.conversion_rate)}
                helperText={errors.conversion_rate}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                type='number'
                name='lead_close_rate'
                inputProps={{ min: 0, max: 100 }}
                value={state.lead_close_rate}
                onChange={handleChange}
                label='Lead to Sale (Lead Close Rate) %'
                placeholder='Enter value in %'
                error={Boolean(errors.lead_close_rate)}
                helperText={errors.lead_close_rate}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                type='number'
                name='order_val'
                value={state.order_val}
                onChange={handleChange}
                label='Enter Average Order Value'
                placeholder='Enter your value'
                error={Boolean(errors.order_val)}
                helperText={errors.order_val}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                type='number'
                name='count'
                value={state.count}
                onChange={handleChange}
                label='No of Related keyword'
                placeholder='Enter your value'
                error={Boolean(errors.count)}
                helperText={errors.count}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={langList}
                    getOptionLabel={option => option.language_name}
                    renderInput={params => <TextField {...params} label='Choose Language' />}
                    value={selectedLanguage || null}
                    onChange={searchLangList}
                    filterOptions={(options, { inputValue }) =>
                      options.filter(option => option.language_name.toLowerCase().includes(inputValue.toLowerCase()))
                    }
                  />
                  {Boolean(errors.selectedLanguage) && (
                    <FormHelperText style={{ color: '#FF4C51' }}>{errors.selectedLanguage}</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>What is Your Device</InputLabel>
                  <Select
                    required
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    name='device'
                    value={state.device || ''}
                    label='What is Your Device'
                    onChange={handleChange}
                  >
                    <MenuItem value={'desktop'}>Desktop</MenuItem>
                    <MenuItem value={'mobile'}>Mobile</MenuItem>
                    {/* <MenuItem value={'tab'}>Tab</MenuItem> */}
                  </Select>
                  {Boolean(errors.device) && (
                    <FormHelperText style={{ color: '#FF4C51' }}>{errors.device}</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>OS</InputLabel>
                  <Select
                    required
                    labelId='demo-simple-select-label'
                    id='os-select'
                    name='os'
                    value={state.os || ''}
                    label='OS'
                    onChange={handleChange}
                  >
                    {state.device &&
                      os_options[state.device] &&
                      Object.keys(os_options[state.device]).map((item, ind) => (
                        <MenuItem key={item} value={item}>
                          {os_options[state.device][item]}
                        </MenuItem>
                      ))}
                  </Select>
                  {Boolean(errors.os) && <FormHelperText style={{ color: '#FF4C51' }}>{errors.os}</FormHelperText>}
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Autocomplete
                    options={locationOptions ?? []}
                    getOptionLabel={option => `${option.id}, ${option.location_name}`}
                    renderInput={params => <TextField {...params} label='Search Location' />}
                    value={selectedLocation || null}
                    onChange={searchLocationList}
                    onInputChange={(event, newInputValue) => handleLocationSearch(newInputValue)}
                  />
                  {Boolean(errors.selectedLocation) && (
                    <FormHelperText style={{ color: '#FF4C51' }}>{errors.selectedLocation}</FormHelperText>
                  )}
                </FormControl>
              </Box>
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
                <Button type='submit' variant='contained' onClick={createForecast} size='large'>
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
