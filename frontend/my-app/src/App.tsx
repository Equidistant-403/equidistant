import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import LandingPage from './Pages/LandingPage'
import Results from './Pages/Results'
import Account from './Pages/Account'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

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
        <Route path="/landing" element={<LandingPage/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="/account" element={<Account/>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
