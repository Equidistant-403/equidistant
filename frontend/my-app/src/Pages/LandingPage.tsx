import React, { useState } from 'react'
import './LandingPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { isError } from '../responseTypes'
import type { LocationResponse, User } from '../responseTypes'
import { makeRequest } from '../requests'
import { LocationRequest } from '../requestObjects'

const LandingPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [friends, setFriends] = useState<User[]>(location.state.friends)
  // TODO: Allow user to accept friend requests
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [requests, setRequests] = useState<User[]>(location.state.requests)
  const user = location.state.user
  const bearer = location.state.bearer

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [checkedFriends, setCheckedFriends] = useState<string[]>([]) // holds checked friends list

  const toggleCheckbox = (email: string): void => {
    setFriends((prevFriends) => prevFriends.map((friend) => {
      if (friend.email === email) {
        return { ...friend, checked: !friend.checked }
      }
      return friend
    }))

    setCheckedFriends((prevCheckedFriends) => {
      if (prevCheckedFriends.includes(email)) {
        return prevCheckedFriends.filter((f) => f !== email)
      } else {
        return [...prevCheckedFriends, email]
      }
    })
  }

  const handleGenerateClick = (): void => {
    makeRequest(new LocationRequest([user.email, ...checkedFriends], bearer))
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
      <ul className="friends-list">
        {friends.map((friend) => (
          <li key={friend.email}>
            <input type="checkbox" checked={friend.checked} onChange={() => { toggleCheckbox(friend.email) }} />
            <span>{friend.email}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LandingPage
