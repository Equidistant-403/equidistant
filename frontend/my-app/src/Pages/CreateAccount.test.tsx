import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { handlers } from '../mocks/handlers'
import setupMocks from '../mocks/setupMocks'
import CreateAccount from './CreateAccount'

setupMocks(...handlers)

describe('CreateAccount', () => {
  it('Create account button rendered', () => {
    render(<CreateAccount />, { wrapper: MemoryRouter })
    const createButton = screen.getByRole('button', { name: /create account/i })
    expect(createButton).toBeInTheDocument()
  })

  it('Login button rendered', () => {
    render(<CreateAccount />, { wrapper: MemoryRouter })
    const loginButton = screen.getByRole('button', { name: /Already have an account\? Login/i })
    expect(loginButton).toBeInTheDocument()
    expect(loginButton).toBeEnabled()
  })

  it('Form rendered', () => {
    render(<CreateAccount />, { wrapper: MemoryRouter })
    const emailForm = screen.getByRole('textbox', { name: /email/i })
    expect(emailForm).toBeInTheDocument()
    expect(emailForm).toBeEnabled()
  })
})
