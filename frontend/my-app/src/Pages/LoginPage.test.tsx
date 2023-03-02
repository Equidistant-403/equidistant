import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { handlers } from '../mocks/handlers'
import setupMocks from '../mocks/setupMocks'
import LoginPage from './LoginPage'
// import userEvent from '@testing-library/user-event'

setupMocks(...handlers)

describe('LoginPage', () => {
  it('Login button rendered', () => {
    render(<LoginPage />, { wrapper: MemoryRouter })
    const loginButton = screen.getByRole('button', { name: /sign in/i })
    expect(loginButton).toBeInTheDocument()
  })

  it('Sign up button rendered', () => {
    render(<LoginPage />, { wrapper: MemoryRouter })
    const signUpButton = screen.getByRole('button', { name: /Don't have an account\? Sign Up/i })
    expect(signUpButton).toBeInTheDocument()
    expect(signUpButton).toBeEnabled()
  })

  it('Forgot password button rendered', () => {
    render(<LoginPage />, { wrapper: MemoryRouter })
    const forgotPasswordButton = screen.getByRole('button', { name: /forgot password\?/i })
    expect(forgotPasswordButton).toBeInTheDocument()
    expect(forgotPasswordButton).toBeEnabled()
  })

  it('Form rendered', () => {
    render(<LoginPage />, { wrapper: MemoryRouter })
    const emailForm = screen.getByRole('textbox', { name: /email/i })
    expect(emailForm).toBeInTheDocument()
    expect(emailForm).toBeEnabled()
  })

  // it('Navigation to CreateAccount page works', () => {
  //   render(<LoginPage />, { wrapper: MemoryRouter })
  //   const signUpButton = screen.getByRole('button', { name: "Don't have an account? Sign Up" })
  //   userEvent.click(signUpButton)
  //   expect(signUpButton).not.toBeInTheDocument()
  //   const createAccountButton = screen.getByRole('button', { name: /create account/i })
  //   expect(createAccountButton).toBeInTheDocument()
  // })
})
