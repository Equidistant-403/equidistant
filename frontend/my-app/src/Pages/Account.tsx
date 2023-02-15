import React, { useState } from 'react'
import './Account.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'

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
        }}>
      <Grid
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            <Typography
              variant="h5"
              component="h2">
                Email: {email}
            </Typography>
            <TextField
              defaultValue={newEmail}
              onChange={e => { setNewEmail(e.target.value) }}
            />
            <Button color='secondary' variant='contained' onClick={handleUpdateEmail}>Update Email</Button>
          </Grid>
          <Grid xs={6}>
            <Typography
              variant="h5"
              component="h2">
                Address: {address}
            </Typography>
            <TextField
              defaultValue={newAddress}
              onChange={e => { setNewAddress(e.target.value) }}
            />
            <Button color='secondary' variant='contained' onClick={handleUpdateLocation}>Update Email</Button>
          </Grid>
          <Grid xs={6}>
            <Typography
              variant="h5"
              component="h2">
                Password
            </Typography>
            <TextField
              defaultValue={newPassword}
              onChange={e => { setNewPassword(e.target.value) }}
            />
            <TextField
              defaultValue={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value) }}
            />
            <Button color='secondary' variant='contained' onClick={handleUpdatePassword}>Update Password</Button>
          </Grid>
          <Grid xs={6}>
            <Button color='secondary' variant='contained' onClick={handleUploadImage}>Upload Profile Picture</Button>
            <Button color='secondary' variant='contained' onClick={handleDeleteAccount}>Delete Account</Button>
            <Button color='secondary' variant='contained' onClick={handleBack}>Back</Button>
          </Grid>
      </Grid>
    </Box>
  )
}

export default Account
