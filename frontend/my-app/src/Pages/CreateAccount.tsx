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
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="address"
                  id="address"
                  autoComplete="address"
                  variant="standard"
                  onChange={(e) => { setAddress(e.target.value) }}
                  color="info"
                  sx={{ input: { color: 'white' } }}
                />
              </ThemeProvider>
            <Button
              onClick={handleCreate}
              fullWidth
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
