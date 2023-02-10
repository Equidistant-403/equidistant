import React, { useState } from 'react'
import './LandingPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import type { User } from '../responseTypes'

const LandingPage: React.FC = () => {
  const location = useLocation()

  const navigate = useNavigate()
  const [friends, setFriends] = useState<User[]>(location.state.friends)

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
    console.log('dummy generation actuation')
    navigate('/results')
  }

  const handlAccountClick = (): void => {
    navigate('/account')
  }

  const handleLogoutClick = (): void => {
    console.log('dummy logout actuation')
    navigate('/')
  }

  return (
    <div className="container">
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
