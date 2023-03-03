import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { handlers } from '../mocks/handlers'
import setupMocks from '../mocks/setupMocks'
import Results from './Results'

setupMocks(...handlers)

describe('Results', () => {
  it('', () => {
    render(<Results />, { wrapper: MemoryRouter })
    const createButton = screen.getByRole('button', { name: /create account/i })
    expect(createButton).toBeInTheDocument()
  })
})
