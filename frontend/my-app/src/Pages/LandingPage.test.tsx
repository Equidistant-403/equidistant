import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { handlers } from '../mocks/handlers'
import setupMocks from '../mocks/setupMocks'
import LandingPage from './LandingPage'

setupMocks(...handlers)

describe('LandingPage', () => {
  it('', () => {
    render(<LandingPage />, { wrapper: MemoryRouter })
    const createButton = screen.getByRole('button', { name: /create account/i })
    expect(createButton).toBeInTheDocument()
  })
})
