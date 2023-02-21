import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { handlers } from '../mocks/handlers'
import setupMocks from '../mocks/setupMocks'
import LoginPage from './LoginPage'

setupMocks(...handlers)

describe('LoginPage', () => {
  it('Login button rendered', () => {
    render(<LoginPage />, { wrapper: MemoryRouter })
    const loginButton = screen.getByRole('button', { name: /sign in/i })
    expect(loginButton).toBeInTheDocument()
  })

  it('Sign up button rendered', () => {
    render(<LoginPage />, { wrapper: MemoryRouter })
    const signUpButton = screen.getByRole('link', { name: "Don't have an account? Sign Up" })
    expect(signUpButton).toBeInTheDocument()
  })

  it('Form rendered', () => {
    render(<LoginPage />, { wrapper: MemoryRouter })
    const signUpButton = screen.getByRole('link', { name: "Don't have an account? Sign Up" })
    expect(signUpButton).toBeInTheDocument()
  })
})
