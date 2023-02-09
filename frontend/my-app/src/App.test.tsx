import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { setupServer } from 'msw/node'
import { handlers } from './mocks/handlers'
import { BrowserRouter as Router } from 'react-router-dom'

const server = setupServer(...handlers)

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close()
})

test('test test', () => {
  render(
    <Router>
      <App />
    </Router>
  )
  console.log('this test ran')
})