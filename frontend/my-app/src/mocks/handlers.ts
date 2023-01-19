import { rest } from 'msw'
import type { RestHandler } from 'msw'

export const handlers : RestHandler[] = [
    rest.get('/test', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            test: 'it worked',
          }),
        )
      }),
]