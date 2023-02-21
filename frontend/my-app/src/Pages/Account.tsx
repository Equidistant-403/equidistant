import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, IconButton, Paper, Stack, TextField, Toolbar, Typography } from '@mui/material'

const stackStyles = {
  backgroundColor: 'secondary.main',
  p: 1,
  justifyContent: 'space-evenly',
  alignItems: 'center'
}

const Account: React.FC = () => {
  const NEW_EMAIL = 'New Email'
  const NEW_ADDRESS = 'New Address'
  const NEW_PASSWORD = 'New Password'
  const NEW_CONFIRM_PASSWORD = 'Confirm New Password'

  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>(location.state.email)
  const [newEmail, setNewEmail] = useState<string>(NEW_EMAIL)
  const [address, setAddress] = useState<string>(location.state.location)
  const [newAddress, setNewAddress] = useState<string>(NEW_ADDRESS)
  const [newPassword, setNewPassword] = useState<string>(NEW_PASSWORD)
  const [confirmPassword, setConfirmPassword] = useState<string>(NEW_CONFIRM_PASSWORD)

  const handleDeleteAccount = (): void => {
    console.log('Delete Account dummy function (STRETCH GOAL)')
  }

  const handleUploadImage = (): void => {
    console.log('Upload Image dummy function (STRETCH GOAL)')
  }

  const handleBack = (): void => {
    navigate(-1)
  }

  const handleUpdateEmail = (): void => {
    setEmail(newEmail)
    setNewEmail(NEW_EMAIL)
    console.log('Update Email dummy function (STRETCH GOAL)')
  }

  const handleUpdateLocation = (): void => {
    setAddress(newAddress)
    setNewAddress(NEW_ADDRESS)
    console.log('Update Location dummy function (STRETCH GOAL)')
  }

  const handleUpdatePassword = (): void => {
    console.log('Update Password dummy function (STRETCH GOAL)')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <AppBar
        position='relative'
        sx={{
          color: '1a7fc1',
          alignSelf: 'start',
          width: 'auto',
          minWidth: 4 / 5,
          mb: 'auto',
          mt: 5,
          mx: 'auto'
        }}
      >
        <Toolbar>
          <Button
            color='secondary'
            variant='contained'
            onClick={handleBack}
            defaultValue={'Back'}
          >Back</Button>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{
              width: 50,
              height: 50,
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'success.main',
                opacity: [0.8, 0.8, 0.8]
              },
              marginLeft: 'auto'
            }}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="span"
        sx={{ p: 5 }}
      />
      <Paper
        sx={{
          minWidth: 1 / 3,
          maxHeight: 1 / 2,
          overflow: 'auto',
          mb: 'auto',
          alignItems: 'center'
        }}
      >
        <Stack
          sx={{
            backgroundColor: 'primary.main',
            p: 1,
            alignItems: 'center'
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              ...stackStyles
            }}
          >
            <Typography
              variant="h5"
              component="h2"
            >Email: {email}</Typography>
            <TextField
              placeholder={newEmail}
              onChange={e => { setNewEmail(e.target.value) }}
              color='primary'
            />
            <Button color='primary' variant='contained' onClick={handleUpdateEmail}>Update Email</Button>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              ...stackStyles
            }}
          >
            <Typography
              variant="h5"
              component="h2"
            >Address: {address}</Typography>
            <TextField
              placeholder={newAddress}
              onChange={e => { setNewAddress(e.target.value) }}
              color='primary'
            />
            <Button color='primary' variant='contained' onClick={handleUpdateLocation}>Update Address</Button>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              ...stackStyles
            }}
          >
            <Typography
              variant="h5"
              component="h2"
            >Password</Typography>
            <TextField
              placeholder={newPassword}
              onChange={e => { setNewPassword(e.target.value) }}
              color='primary'
            />
            <TextField
              placeholder={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value) }}
              color='primary'
            />
            <Button color='primary' variant='contained' onClick={handleUpdatePassword}>Update Password</Button>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              ...stackStyles
            }}
          >
            <Button color='primary' variant='contained' onClick={handleUploadImage}>Upload Profile Picture</Button>
            <Button color='primary' variant='contained' onClick={handleDeleteAccount}>Delete Account</Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Account
