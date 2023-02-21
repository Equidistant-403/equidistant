import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import setupMocks from './mocks/setupMocks'
import { handlers } from './mocks/handlers'

setupMocks(...handlers)

test('test test', () => {
  render(
    <Router>
      <App />
    </Router>
  )
  const loginButton = screen.getByRole('button', { name: /sign in/i })
  console.log(loginButton)
  expect(loginButton).toBeInTheDocument()
})
