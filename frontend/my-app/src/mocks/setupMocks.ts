import { setupServer } from 'msw/lib/node'
import type { SetupServerApi } from 'msw/lib/node'
import type { RequestHandler } from 'msw'

const setupMocks = (...handlers: RequestHandler[]): SetupServerApi => {
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

  return server
}

export default setupMocks
