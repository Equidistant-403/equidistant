import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import makeRequest from '../makeRequest'
import { CreateAccountRequest } from '../requestObjects'
import type { CreateAccountResponse } from '../responseTypes'
import { isError } from '../responseTypes'
import { Button, Box, Typography, TextField, Grid, Stack, createTheme, ThemeProvider } from '@mui/material'
import { LANDING_PAGE_URL } from '../pageUrls'

const theme = createTheme({
  palette: {
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(255,255,255,0.87)'
    }
  }
})

const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState(false)
  const navigate = useNavigate()

  const isValidEmail = (email: string): boolean => {
    return !(/\S+@\S+\.\S+/.test(email))
  }

  const handleEmailTyping = (e: any): void => {
    setEmailError(isValidEmail(e.target.value))
    setEmail(e.target.value)
  }

  const isValidPassword = (password: string): boolean => {
    return password.length < 8
  }

  const handlePasswordTyping = (e: any): void => {
    setPasswordError(isValidPassword(e.target.value))
    setPassword(e.target.value)
  }

  const isValidAddress = (address: string): boolean => {
    return !(/^(\d{1,}) [a-zA-Z0-9\s]+(,)? [a-zA-Z]+(,)? [A-Z]{2} [0-9]{5,6}$/.test(address))
  }

  const handleAddressTyping = (e: any): void => {
    setAddressError(isValidAddress(e.target.value))
    setAddress(e.target.value)
  }

  const handleCreate = (): void => {
    makeRequest(new CreateAccountRequest(email, password, address))
      .then((res) => {
        if (isError(res)) {
          // TODO: Display the error message
          // TODO: Remove alert
          alert(res.error)
          return
        }

        const response = (res as CreateAccountResponse)
        // TODO: Remove console.log
        console.log('response', response)
        navigate(LANDING_PAGE_URL, {
          state: {
            user: response.user,
            friends: [],
            requests: [],
            bearer: response.bearer
          }
        })
      })
      .catch((e) => {
        console.error(e)
      })
    // TODO: Remove console.log
    console.log('dummy create account authentication')
  }

  const handleLogin = (): void => {
    navigate(-1)
  }

  return (
    <div style={{ height: '90vh', margin: 0, padding: 0 }}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={6}
        sx={{
          height: 1
        }}>
        <Typography
            component="h1"
            variant="h1">
            Equidistant
        </Typography>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mx: 'auto'
          }}>
          <Box
            component="form"
            onSubmit={handleCreate}
            noValidate
            sx={{
              mt: 1
            }}>
              <Typography
                align='center'
                component="h1"
                variant="h5"
                sx={{ mb: 2, color: 'text.primary' }}>
                Account Creation
              </Typography>
              <ThemeProvider theme={theme}>
                <TextField
                  error={emailError}
                  helperText={emailError ? 'Email is not formatted correctly' : ''}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                  autoFocus
                  onChange={handleEmailTyping}
                  color="info"
                  sx={{
                    input: { color: 'white' }
                  }}
                />
                <TextField
                  error={passwordError}
                  helperText={passwordError ? 'Password must be at least 8 characters' : ''}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="standard"
                  onChange={handlePasswordTyping}
                  color="info"
                  sx={{ input: { color: 'white' } }}
                />
                <TextField
                  error={addressError}
                  helperText={addressError ? 'Address must match specified format' : ''}
                  margin="normal"
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="address"
                  id="address"
                  autoComplete="address"
                  variant="standard"
                  onChange={handleAddressTyping}
                  color="info"
                  sx={{ input: { color: 'white' } }}
                />
                <Box component='p'>
                  Addresses must match this format: 3344 W Alameda Avenue, Lakewood, CO 80222
                </Box>
              </ThemeProvider>
            <Button
              onClick={handleCreate}
              fullWidth
              disabled={(emailError || passwordError || addressError ||
                        email.length === 0 || password.length === 0 || address.length === 0)}
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}
            >
              Create Account
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  onClick={handleLogin}
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}
                >
                  Already have an account? Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Stack>
    </div>
  )
}

export default CreateAccount
