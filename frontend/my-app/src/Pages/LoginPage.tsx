import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import makeRequest from '../makeRequest'
import { LoginRequest } from '../requestObjects'
import type { LoginResponse } from '../responseTypes'
import { isError } from '../responseTypes'
import { Button, Box, Typography, TextField, Grid, Stack, createTheme, ThemeProvider } from '@mui/material'
import { CREATE_ACCOUNT_URL, LANDING_PAGE_URL } from '../pageUrls'

const theme = createTheme({
  palette: {
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(255,255,255,0.87)'
    }
  }
})

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (): void => {
    makeRequest(new LoginRequest(email, password))
      .then((res) => {
        if (isError(res)) {
          // TODO: Display the error message
          // TODO: Remove alert
          alert(res.error)
          return
        }
        const response = (res as LoginResponse)
        // TODO: Remove console.log
        console.log(response)
        navigate(LANDING_PAGE_URL, {
          state: {
            user: response.user,
            friends: response.friends,
            requests: response.friendRequests,
            bearer: response.bearer
          }
        })
      })
      .catch((e) => {
        console.error(e)
      })
    // TODO: Remove console.log
    console.log('dummy login authentication')
  }

  const handleCreate = (): void => {
    navigate(CREATE_ACCOUNT_URL)
  }

  const handleForgotPassword = (): void => {
    // TODO: Remove console.log
    console.log('dummy forgot password')
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
            onSubmit={handleLogin}
            noValidate
            sx={{
              mt: 1
            }}>
              <Typography
                align='center'
                component="h1"
                variant="h5"
                sx={{ mb: 2, color: 'text.primary' }}>
                Sign in
              </Typography>
              <ThemeProvider theme={theme}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                  autoFocus
                  onChange={(e) => { setEmail(e.target.value) }}
                  color="info"
                  sx={{
                    input: { color: 'white' }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="standard"
                  onChange={(e) => { setPassword(e.target.value) }}
                  color="info"
                  sx={{ input: { color: 'white' } }}
                />
              </ThemeProvider>
            <Button
              onClick={handleLogin}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button
                  onClick={handleCreate}
                  variant="contained"
                  sx={{ m: 2, bgcolor: 'secondary.main' }}
                >
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
              <Grid item>
              <Button
                  onClick={handleForgotPassword}
                  variant="contained"
                  sx={{ m: 2, bgcolor: 'secondary.main' }}
                >
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Stack>
    </div>
  )
}

export default LoginPage
