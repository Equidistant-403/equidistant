import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isError } from '../responseTypes'
import { LocationRequest } from '../requestObjects'
import makeRequest from '../makeRequest'
import {
  AppBar,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Toolbar,
  IconButton,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Avatar
} from '@mui/material'
import type { LocationResponse, User } from '../responseTypes'
import { RESULTS_URL, ACCOUNT_URL, LOGIN_URL } from '../pageUrls'

const LandingPage: React.FC = () => {
  const [openAdd, setOpenAdd] = useState(false)
  const [openAccept, setOpenAccept] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const [friends] = useState<User[]>(location.state.friends)
  const [requests] = useState<User[]>(location.state.requests)
  const user = location.state.user
  const bearer = location.state.bearer

  const [checkedFriends, setCheckedFriends] = useState(() => friends.map((i) => false))
  const [checkedRequests, setCheckedRequests] = useState(() => requests.map((i) => false))

  const toggleFriendsCheckbox = (index: number, checked: any): void => {
    setCheckedFriends((isChecked) => {
      return isChecked.map((c, i) => {
        if (i === index) return checked
        return c
      })
    })
  }

  const toggleRequestCheckbox = (index: number, checked: any): void => {
    setCheckedRequests((isChecked) => {
      return isChecked.map((c, i) => {
        if (i === index) return checked
        return c
      })
    })
  }

  const getCheckedFriends = (): User[] => {
    const users: User[] = requests.filter((friend, index) => checkedFriends[index])
    return users
  }

  const getCheckedRequests = (): User[] => {
    const users: User[] = friends.filter((friend, index) => checkedRequests[index])
    return users
  }

  const handleGenerateClick = (): void => {
    makeRequest(new LocationRequest([user.email, ...getCheckedFriends()], bearer))
      .then((res) => {
        if (isError(res)) {
          // TODO: Display this error message
          // TODO: remove console.log
          console.log(res.errorMessage)
          return
        }

        const response = (res as LocationResponse)
        navigate(RESULTS_URL, {
          state: {
            locations: response.locations
          }
        })
      })
      .catch((e) => { console.error(e) })
  }

  const handleAcceptFriendsClick = (): void => {
    makeRequest(new FriendsRequest([user.email, ...getCheckedRequests()], bearer))
      .then((res) => {
        if (isError(res)) {
          // TODO: Display this error message
          // TODO: remove console.log
          console.log(res.errorMessage)
          return
        }

        const response = (res as LocationResponse)
        navigate(RESULTS_URL, {
          state: {
            locations: response.locations
          }
        })
      })
      .catch((e) => { console.error(e) })
  }


  const handlAccountClick = (): void => {
    navigate(ACCOUNT_URL, {
      state: {
        email: user.email,
        location: user.address
      }
    })
  }

  const handleLogoutClick = (): void => {
    console.log('dummy logout actuation')
    navigate(LOGIN_URL)
  }

  const handleAddToggle = (): void => {
    setOpenAdd(true)
  }

  const handleAddSubmit = (): void => {
    // TODO: add friend functionality
    console.log('add friend')
    handleAddClose()
  }

  const handleAddRemoveSubmit = (): void => {
    console.log('remove friend')
    handleAddClose()
  }

  const handleAddClose = (): void => {
    setOpenAdd(false)
  }

  const handleAcceptToggle = (): void => {
    setOpenAccept(true)
  }

  const handleAcceptSubmit = (): void => {
    console.log('add friend')
    handleAcceptClose()
  }

  const handleAcceptClose = (): void => {
    setOpenAccept(false)
  }

  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px'
        }}>
          <AppBar
            position='relative'
            sx={{
              color: '1a7fc1',
              alignSelf: 'start',
              width: 'auto',
              minWidth: 4 / 5,
              mb: 'auto',
              mt: 5,
              mx: 'auto',
              borderRadius: '40px'
            }}
          >
            <Toolbar>
              <Button color='secondary' variant='contained' sx={{ borderRadius: 28 }}onClick={handleLogoutClick}>Logout</Button>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    display: 'flex',
                    flexWarp: 'wrap',
                    m: 'auto'
                  }}
                >
                  {getCheckedFriends().map((user, index) => (
                    <Avatar
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: 'primary.dark'
                      }}
                      key={index}
                    >
                      <Typography
                        variant="h5"
                        component="h2">
                        {user.email[0]}
                      </Typography>
                    </Avatar>
                  ))}
                </Stack>
              <Button
                color='secondary'
                variant='contained'
                onClick={handleGenerateClick}
                sx={{
                  display: 'flex',
                  flexWarp: 'wrap',
                  mr: 3,
                  borderRadius: 28
                }}
                >
                  Generate
              </Button>
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
                  }
                }}
                onClick={handlAccountClick}
              >
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box
            component="span"
            sx={{ p: 5 }}
          />
        <Stack
          direction="row">
          <Button variant="outlined" color="primary" onClick={handleAddToggle} sx={{ mb: 5 }}>
            Add/remove Friends
          </Button>
          <Dialog
            open={openAdd}
            onClose={handleAddClose}
            sx={{
              borderRadius: '20px'
            }}>
            <DialogTitle>Add Friend</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddClose}>Cancel</Button>
              <Button onClick={handleAddSubmit}>Send Request</Button>
              <Button onClick={handleAddRemoveSubmit}>Delete Friend</Button>
            </DialogActions>
          </Dialog>
          <Button variant="outlined" color="primary" onClick={handleAcceptToggle} sx={{ mb: 5 }}>
              Accept Friends
          </Button>
          <Dialog
            open={openAccept}
            onClose={handleAcceptClose}
            sx={{
              borderRadius: '20px'
            }}>
            <DialogTitle>Accept Friends</DialogTitle>
            {friends.map((friend, index) => (
              <FormControlLabel
                sx={{
                  backgroundColor: 'secondary.main',
                  ml: 2,
                  my: 0.3,
                  py: 1,
                  borderRadius: '20px',
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    opacity: [0.8, 0.8, 0.8]
                  }
                }}
                key={friend.email}
                control={
                  <Checkbox
                    checked={checkedFriends[index]}
                    onChange={(e) => { toggleRequestCheckbox(index, e.target.checked) } }
                  />}
                label={
                    <Typography variant="h5" component="h2">
                      {friend.email}
                    </Typography>
                }/>
            ))}
          </Dialog>
        </Stack>
        <Paper
          sx={{
            minWidth: 1 / 3,
            maxHeight: 1 / 2,
            overflow: 'auto',
            mb: 'auto',
            borderRadius: '40px'
          }}
        >
          <FormGroup
            sx={{
              backgroundColor: 'primary.main',
              py: 1
            }}
          >
            {friends.map((friend, index) => (
              <FormControlLabel
                sx={{
                  backgroundColor: 'secondary.main',
                  ml: 2,
                  my: 0.3,
                  py: 1,
                  borderRadius: '20px',
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    opacity: [0.8, 0.8, 0.8]
                  }
                }}
                key={friend.email}
                control={
                  <Checkbox
                    checked={checkedFriends[index]}
                    onChange={(e) => { toggleFriendsCheckbox(index, e.target.checked) } }
                  />}
                label={
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}>
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
                          opacity: [0.6, 0.6, 0.6]
                        }
                      }}
                      key={index}
                      onClick={handleMenuClick}>
                      <Typography variant="h5" component="h2">
                        {friend.email[0]}
                      </Typography>
                    </IconButton>
                    <Typography variant="h5" component="h2">
                      {friend.email}
                    </Typography>
                  </Stack>
                }/>
            ))}
          </FormGroup>
        </Paper>
      </Box>
  )
}

export default LandingPage
