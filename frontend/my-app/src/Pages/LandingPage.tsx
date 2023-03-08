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
  TextField,
  Avatar
} from '@mui/material'
import { FriendsRequest, LocationRequest, SendFriendRequest, FriendRequestResponse } from '../requestObjects'
import makeRequest from '../makeRequest'
import { isError } from '../responseTypes'
import type { LocationResponse, FriendsResponse, User, RespondFriendResponse, SendRequestResponse } from '../responseTypes'
import { RESULTS_URL, ACCOUNT_URL, LOGIN_URL } from '../pageUrls'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'

const LandingPage: React.FC = () => {
  const [openAdd, setOpenAdd] = useState(false)
  const [openReq, setOpenReq] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const user = location.state.user
  const bearer = location.state.bearer
  const [friends, setFriends] = useState<User[]>(location.state.friends)
  const [requests, setRequests] = useState<User[]>(location.state.requests)

  const handleRefresh = (): void => {
    makeRequest(new FriendsRequest(user.email, bearer))
      .then((res) => {
        if (isError(res)) {
          // TODO: Display this error message
          // TODO: remove console.log
          console.log(res.error)
          return
        }

        const response = (res as FriendsResponse)
        setRequests(response.friendRequests)
        setFriends(response.friends)
      })
      .catch((e) => { console.error(e) })
  }
  

  // TODO: add accepting friend request UI
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRespondToFriendRequest = (requester: string, accept: boolean): void => {
    makeRequest(new FriendRequestResponse(user.email, requester, accept, bearer))
      .then((res) => {
        if (isError(res)) {
          // TODO: Display this error message
          // TODO: remove console.log
          console.log(res.error)
          return
        }

        const response = (res as RespondFriendResponse)
        // TODO: Maybe this shouldn't be an alert
        alert(response.response)
        handleRefresh()
      })
      .catch((e) => { console.error(e) })
  }

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
    makeRequest(new LocationRequest([user.email, ...getCheckedFriends().map(u => u.email)], bearer))
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

  const handleToggleAdd = (): void => {
    setOpenAdd(true)
  }

  const handleCloseAdd = (): void => {
    setOpenAdd(false)
  }

  const handleSubmitAdd = (): void => {
    makeRequest(new SendFriendRequest(user.email, friendEmail, bearer))
      .then((res) => {
        if (isError(res)) {
          // TODO: Display this error message
          // TODO: remove console.log
          console.log(res.error)
          return
        }

        const response = (res as SendRequestResponse)
        // TODO: Display this message
        // TODO: maybe change this from an alert
        alert(response.message)
      })
      .catch((e) => { console.error(e) })
    handleCloseAdd()
  }

  const handleToggleReq = (): void => {
    setOpenReq(true)
  }

  const handleCloseReq = (): void => {
    setOpenReq(false)
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
                        backgroundColor: 'primary.dark'
                      }}
                      key={index}
                    >
                      <Avatar
                        component="h2">
                        {user.email[0]}
                      </Avatar>
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
          <Stack
            spacing={2}
            sx={{ my: 2 }}
          >
            <Button variant="outlined" color="primary" onClick={handleToggleAdd}>
                Add Friends
            </Button>
            <Dialog
              open={openAdd}
              onClose={handleCloseAdd}>
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
                <Button onClick={handleCloseAdd}>Cancel</Button>
                <Button onClick={handleSubmitAdd}>Send Request</Button>
              </DialogActions>
            </Dialog>
            <Button variant="outlined" color="primary" onClick={handleToggleReq}>
                Friend Requests
            </Button>
            <Dialog
              open={openReq}
              onClose={handleCloseReq}>
              <DialogTitle>Accept/Deny Friend Requests</DialogTitle>
              <DialogContent>
                <Stack
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    sx={{
                      display: 'flex',
                      flexWarp: 'wrap',
                      m: 'auto'
                    }}
                  >
                  <Button onClick={handleRefresh} sx={{ border: 1 }}>refresh</Button>
                  {requests.map((request, index) => (
                    <Paper
                    key={request.email}
                    sx={{
                      backgroundColor: 'secondary.main',
                      ml: 2,
                      my: 0.3,
                      py: 1,
                      border: 1,
                      borderColor: 'primary.main',
                      borderRadius: '20px',
                      '&:hover': {
                        backgroundColor: 'secondary.main',
                        opacity: [0.8, 0.8, 0.8]
                      }
                    }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        padding={1}
                      >
                        <IconButton
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
                          <Avatar component="h6" />
                        </IconButton>
                        <Typography variant="h6" component="h3">
                          {request.email}
                        </Typography>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                          sx={{
                            width: 50,
                            height: 50,
                            backgroundColor: 'primary.dark',
                            '&:hover': {
                              backgroundColor: 'success.main'
                            }
                          }}
                          key={index}
                          onClick={(e: any) => { handleRespondToFriendRequest(request.email, true) } }
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                          sx={{
                            width: 50,
                            height: 50,
                            backgroundColor: 'primary.dark',
                            '&:hover': {
                              backgroundColor: 'error.main'
                            }
                          }}
                          key={index}
                          onClick={(e: any) => { handleRespondToFriendRequest(request.email, false) } }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseReq}>Done</Button>
              </DialogActions>
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
                        backgroundColor: 'primary.dark'
                      }}
                      key={index}
                    >
                      <Avatar component="h2">
                        {friend.email[0]}
                      </Avatar>
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
