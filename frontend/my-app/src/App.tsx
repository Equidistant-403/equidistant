import React, { useEffect } from 'react'
import './App.css'
import type { EquidistantRequest } from './requestObjects'
import { LoginRequest } from './requestObjects'
import type { LoginResponse } from './responseTypes'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import LandingPage from './Pages/LandingPage'
import Results from './Pages/Results'
import Account from './Pages/Account'

async function makeRequest (request: EquidistantRequest): Promise<LoginResponse> {
  const response = await fetch(request.path, request)
  const json = await response.json()
  return json
}

function App (): React.ReactElement {
  useEffect(() => {
    makeRequest(new LoginRequest('user', 'password'))
      .then(res => {
        console.log(res.listOfFriends)
      })
      .catch((e) => { console.error(e) })
  }, [])
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/landing" element={<LandingPage/>} />
      <Route path="/results" element={<Results/>} />
      <Route path="/account" element={<Account/>} />
    </Routes>
  )
}

export default App
