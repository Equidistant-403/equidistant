import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  TextField
} from '@mui/material'
import { FriendsRequest, LocationRequest } from '../requestObjects'
import makeRequest from '../makeRequest'
import { isError } from '../responseTypes'
import type { LocationResponse, User, SendRequestResponse } from '../responseTypes'
import { RESULTS_URL, ACCOUNT_URL, LOGIN_URL } from '../pageUrls'

const LandingPage: React.FC = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const [friends] = useState<User[]>(location.state.friends)
  // TODO: Allow user to accept friend requests
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [requests, setRequests] = useState<User[]>(location.state.requests)
  const user = location.state.user
  const bearer = location.state.bearer

  const [checkedFriends, setCheckedFriends] = useState(() => friends.map((i) => false))

  const [friendEmail, setFriendEmail] = useState('')

  const toggleCheckbox = (index: number, checked: any): void => {
    setCheckedFriends((isChecked) => {
      return isChecked.map((c, i) => {
        if (i === index) return checked
        return c
      })
    })
  }

  const getCheckedFriends = (): User[] => {
    const users: User[] = friends.filter((friend, index) => checkedFriends[index])
    return users
  }

  const handleGenerateClick = (): void => {
    makeRequest(new LocationRequest([user.email, ...getCheckedFriends()], bearer))
      .then((res) => {
        if (isError(res)) {
          // TODO: Display this error message
          // TODO: remove console.log
          console.log(res.error)
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

  const handleFriendMenu = (): void => {
    <Dialog
      open={open}
      onClose={handleClose}
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
          onChange={(e: any) => {
            setFriendEmail(e.target.value)
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Send Request</Button>
      </DialogActions>
    </Dialog>
  }

  const handleToggle = (): void => {
    setOpen(true)
  }

  const handleSubmit = (): void => {
    makeRequest(new FriendsRequest(friendEmail, bearer))
      .then((res) => {
        if (isError(res)) {
          // TODO: Display this error message
          // TODO: remove console.log
          console.log(res.error)
          return
        }

        const response = (res as SendRequestResponse)
        // TODO: Display this message
        // TODO: Remove console.log
        console.log(response.message)
      })
      .catch((e) => { console.error(e) })
    handleClose()
  }

  const handleClose = (): void => {
    setOpen(false)
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
                      key={index}
                      onClick={handleFriendMenu}
                    >
                      <Typography
                        variant="h5"
                        component="h2">
                        {user.email[0]}
                      </Typography>
                    </IconButton>
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
        <Button variant="outlined" color="primary" onClick={handleToggle} sx={{ mb: 5 }}>
            Add Friends
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Send Request</Button>
          </DialogActions>
        </Dialog>
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
                    onChange={(e) => { toggleCheckbox(index, e.target.checked) } }
                  />}
                  label={
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
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
                      onClick={handleFriendMenu}
                    >
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
