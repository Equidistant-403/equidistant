import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Account from './pages/Account'
import CreateAccount from './pages/CreateAccount'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Results from './pages/Results'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { // grey
      main: '#dedede'
    },
    secondary: { // blue
      main: '#1a7fc1'
    },
    background: { // background
      default: '#202020', // grey
      paper: '#1a7fc1' // blue
    },
    text: { // text
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(0,0,0,0.6)'
    },
    success: { // green
      main: '#3b7461'
    }
  }
})

function App (): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/create-account" element={<CreateAccount/>} />
        <Route path="/landing" element={<LandingPage/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="/account" element={<Account/>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
