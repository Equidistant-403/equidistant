import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Account from './Pages/Account'
import CreateAccount from './Pages/CreateAccount'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import Results from './Pages/Results'
import { LOGIN_URL, CREATE_ACCOUNT_URL, LANDING_PAGE_URL, RESULTS_URL, ACCOUNT_URL } from './pageUrls'

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
    },
    error: { // red
      main: '#992525'
    }
  }
})

function App (): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path={LOGIN_URL} element={<LoginPage/>} />
        <Route path={CREATE_ACCOUNT_URL} element={<CreateAccount/>} />
        <Route path={LANDING_PAGE_URL} element={<LandingPage/>} />
        <Route path={RESULTS_URL} element={<Results/>} />
        <Route path={ACCOUNT_URL} element={<Account/>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
