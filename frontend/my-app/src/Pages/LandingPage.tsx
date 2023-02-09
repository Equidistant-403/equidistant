import React, { useState } from 'react'
import './LandingPage.css'
import { useNavigate } from 'react-router-dom'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const [friends, setFriends] = useState([
    { id: 1, name: 'John Doe', checked: false },
    { id: 2, name: 'Jane Doe', checked: false },
    { id: 3, name: 'Jim Smith', checked: false }
  ])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [checkedFriends, setCheckedFriends] = useState<number[]>([]) // holds checked friends list

  const toggleCheckbox = (id: number): void => {
    setFriends((prevFriends) => prevFriends.map((friend) => {
      if (friend.id === id) {
        return { ...friend, checked: !friend.checked }
      }
      return friend
    }))

    setCheckedFriends((prevCheckedFriends) => {
      if (prevCheckedFriends.includes(id)) {
        return prevCheckedFriends.filter((f) => f !== id)
      } else {
        return [...prevCheckedFriends, id]
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
          <li key={friend.id}>
            <input type="checkbox" checked={friend.checked} onChange={() => { toggleCheckbox(friend.id) }} />
            <span>{friend.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LandingPage
