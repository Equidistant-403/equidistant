import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isError, type LocationResponse, type User } from '../responseTypes'
import { LocationRequest } from '../requestObjects'
import makeRequest from '../makeRequest'
import './LandingPage.css'
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
  Typography
} from '@mui/material'

const LandingPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [friends] = useState<User[]>(location.state.friends)
  // TODO: Allow user to accept friend requests
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [requests, setRequests] = useState<User[]>(location.state.requests)
  const user = location.state.user
  const bearer = location.state.bearer

  const [checkedFriends, setCheckedFriends] = useState(() => friends.map((i) => false))

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
          console.log(res.errorMessage)
          return
        }

        const response = (res as LocationResponse)
        navigate('/results', {
          state: {
            locations: response.locations
          }
        })
      })
      .catch((e) => { console.error(e) })
  }

  const handlAccountClick = (): void => {
    navigate('/account', {
      state: {
        email: user.email,
        location: user.address
      }
    })
  }

  const handleLogoutClick = (): void => {
    console.log('dummy logout actuation')
    navigate('/')
  }

  const handleFriendMenu = (): void => {
    console.log('dummy friend pfp actuation')
  }

  return (
      <div className="container">
          <AppBar position="relative"
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
              <Button color='secondary' variant='contained' onClick={handleLogoutClick}>Logout</Button>
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
                  <IconButton color="primary" aria-label="upload picture" component="label"
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
                >
                  <div onClick={handleFriendMenu}></div>
                  <Typography variant="h5" component="h2">
                    {user.email[0]}
                  </Typography>
                </IconButton>
                ))}
              </Stack>
              <Button color='secondary' variant='contained' onClick={handleGenerateClick}
              sx={{
                display: 'flex',
                flexWarp: 'wrap',
                mr: 3
              }}
              >Generate</Button>
              <IconButton color="primary" aria-label="upload picture" component="label"
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: 'primary.dark',
                  '&:hover': {
                    backgroundColor: 'success.main',
                    opacity: [0.8, 0.8, 0.8]
                  }
                }}
              >
                <div onClick={handlAccountClick}></div>
              </IconButton>
            </Toolbar>
          </AppBar>
        <Box component="span" sx={{ p: 5 }}>
        </Box>
        <div />
        <Paper
        sx={{
          minWidth: 1 / 3,
          maxHeight: 1 / 2,
          overflow: 'auto',
          mb: 'auto'
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
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  opacity: [0.8, 0.8, 0.8]
                }
              }}
                key={friend.email}
                control={
                  <Checkbox
                    checked={checkedFriends[index]}
                    onChange={(e) => { toggleCheckbox(index, e.target.checked) } } />}
                label={
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <IconButton color="primary" aria-label="upload picture" component="label"
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
                    >
                      <div onClick={handleFriendMenu}></div>
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
      </div>
  )
}

export default LandingPage
