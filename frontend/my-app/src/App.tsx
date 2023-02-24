import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Account from './Pages/Account'
import CreateAccount from './Pages/CreateAccount'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import Results from './Pages/Results'

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

const URL_BASE: string = '/equidistant/#'

function App (): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path={URL_BASE + '/'} element={<LoginPage/>} />
        <Route path={URL_BASE + '/create-account'} element={<CreateAccount/>} />
        <Route path={URL_BASE + '/landing'} element={<LandingPage/>} />
        <Route path={URL_BASE + '/results'} element={<Results/>} />
        <Route path={URL_BASE + '/account'} element={<Account/>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
