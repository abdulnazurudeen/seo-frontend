// ** React Imports
import { MouseEvent, ReactNode, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import baseConst from '../../../src/data/const'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { Alert } from '@mui/material'
import { useCookies } from 'react-cookie'

interface State {
  password: string
  showPassword: boolean
}

interface ErrorState {
  email: string
  password: string
  [key: string]: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  const [_, setCookie] = useCookies(['token']) // eslint-disable-line
  const router = useRouter()
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<ErrorState>({
    email: '',
    password: ''
  })

  const handleLoginProcess = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrors({
      email: '',
      password: ''
    })
    try {
      const param = {
        email: email,
        password: password
      }
      const response = await axios.post(baseConst.apiUrl + 'login/', param)
      const { status } = response
      if (status == 400) {
        const { data } = response
        setErrors(data)
      }
      if (status == 200) {
        const { token } = response.data
        // console.log('Logged in success', token)
        setCookie('token', token, { path: '/' })
        router.push('/forecast/list')
      }
    } catch (err: any) {
      const { response } = err
      console.log('error login', err, response)
      const { data } = response
      if (data) setErrors(data)
    }
  }

  // useEffect(() => {
  //   if (cookie) setCookie('token', '')
  // }, [cookie])

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
            {errors &&
              Object.keys(errors).map(err => {
                // Check if the key exists in the ErrorState interface or if it is an additional error
                return (
                  ['email', 'password'].indexOf(err) < 0 && (
                    <Alert key={err} severity='error' className='error alert'>
                      {errors[err]}
                    </Alert>
                  )
                )
              })}
          </Box>
          <Box component='form' noValidate autoComplete='off' onSubmit={handleLoginProcess}>
            <TextField
              autoFocus
              fullWidth
              id='email'
              value={email}
              label='Email'
              sx={{ marginBottom: 4 }}
              onChange={e => setEmail(e.target.value)}
            />
            {errors?.email && (
              <Alert severity='error' className='error alert'>
                {errors.email}
              </Alert>
            )}
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                error={errors?.password != ''}
                label='Password'
                value={password}
                id='auth-login-password'
                onChange={e => setPassword(e.target.value)}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {errors?.password && (
              <Alert severity='error' className='error alert'>
                {errors.password}
              </Alert>
            )}
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button
              type='submit'
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={handleLoginProcess}
            >
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default LoginPage
