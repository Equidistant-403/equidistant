import React, { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import makeRequest from '../makeRequest'
import { CreateAccountRequest } from '../requestObjects'
import type { CreateAccountResponse } from '../responseTypes'
import { isError } from '../responseTypes'

const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

  const handleCreate = (): void => {
    makeRequest(new CreateAccountRequest(email, password, address))
      .then((res) => {
        if (isError(res)) {
          // TODO: Display the error message
          // TODO: Remove console.log
          console.log(res)
          return
        }

        const response = (res as CreateAccountResponse)
        // TODO: Remove console.log
        console.log('response', response)
        navigate('/landing', {
          state: {
            user: response.user,
            friends: [],
            requests: [],
            bearer: response.bearer
          }
        })
      })
      .catch((e) => {
        console.error(e)
      })
    // TODO: Remove console.log
    console.log('dummy create account authentication')
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
      <input
        className="form"
        type="address"
        value={address}
        onChange={(e) => { setAddress(e.target.value) }}
        placeholder="Address"
      />
      <button onClick={handleCreate}>Create Account</button>
      <a href="/forgot-password" className="links">Forgot password?</a>
      <a href="/" className="links">Login to existing account</a>
    </div>
  )
}

export default CreateAccount
