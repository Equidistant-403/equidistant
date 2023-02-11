import React, { useState } from 'react'
import './LandingPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { isError } from '../responseTypes'
import type { LocationResponse, User } from '../responseTypes'
import { makeRequest } from '../requests'
import { LocationRequest } from '../requestObjects'
import { Checkbox } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'

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

  return (
    <div className="container">
      <p>Current user: {user.email}</p>
      <div className="buttons">
        <button onClick={handleGenerateClick}>Generate</button>
        <button onClick={handlAccountClick}>Account</button>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
      <FormGroup>
        {friends.map((friend, index) => (
          <FormControlLabel
            key={friend.email}
            control={
              <Checkbox
                checked={checkedFriends[index]}
                onChange={(e) => { toggleCheckbox(index, e.target.checked) } }/>}
            label={friend.email}/>
        ))}
      </FormGroup>
    </div>
  )
}

export default LandingPage
