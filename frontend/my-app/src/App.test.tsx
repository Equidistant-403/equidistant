import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { setupServer } from 'msw/node'
import { handlers } from './mocks/handlers'

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

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
