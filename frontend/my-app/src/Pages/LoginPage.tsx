import React, { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (): void => {
    console.log('dummy login authentication')
    navigate('/landing')
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
