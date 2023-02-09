import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import LandingPage from './Pages/LandingPage'
import Results from './Pages/Results'
import Account from './Pages/Account'

function App (): React.ReactElement {
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
