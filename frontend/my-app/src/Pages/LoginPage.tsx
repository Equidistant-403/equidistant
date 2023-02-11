import React, { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import makeRequest from '../makeRequest'
import { LoginRequest } from '../requestObjects'
import type { LoginResponse } from '../responseTypes'
import { isError } from '../responseTypes'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (): void => {
    makeRequest(new LoginRequest(email, password))
      .then((res) => {
        if (isError(res)) {
          // TODO: Display the error message
          // TODO: Remove console.log
          console.log(res)
          return
        }

        const response = (res as LoginResponse)
        // TODO: Remove console.log
        console.log(response)
        navigate('/landing', {
          state: {
            user: response.user,
            friends: response.listOfFriends,
            requests: response.listOfRequests,
            bearer: response.bearer
          }
        })
      })
      .catch((e) => {
        console.error(e)
      })
    // TODO: Remove console.log
    console.log('dummy login authentication')
  }

  return (
    <div className="container">
      <h1>Equidistant</h1>
      <input
        className="form"
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value) }}
        placeholder="Email"
      />
      <input
        className="form"
        type="password"
        value={password}
        onChange={(e) => { setPassword(e.target.value) }}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <a href="/forgot-password" className="links">Forgot password?</a>
      <a href="/create-account" className="links">Create account</a>
    </div>
  )
}

export default LoginPage
