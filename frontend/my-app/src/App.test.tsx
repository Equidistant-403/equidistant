import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
<<<<<<< HEAD

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
=======
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
>>>>>>> 5bf8ce32d1d63e53cf1ff11219e6f37da576c045
