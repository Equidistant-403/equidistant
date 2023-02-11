import { rest } from 'msw'
import type { RequestHandler } from 'msw'

export const handlers: RequestHandler[] = [

  rest.get('/locations', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        locations: [
          {
            place: [1, 1],
            name: 'CSE1',
            rating: 4,
            travelTimes: [12, 20, 8, 15, 16]
          },
          {
            place: [2, 2],
            name: 'CSE2',
            rating: 5,
            travelTimes: [12, 20, 8, 15, 16]
          }
        ]
      })
    )
  }),

  rest.get('/login', (req, res, ctx) => {
    const email = req.url.searchParams.get('email')
    const password = req.url.searchParams.get('password')

    if (password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          user: {
            email,
            address: '123 NE UW Street, Seattle, WA 98105'
          },
          listOfFriends: [
            {
              email: 'Joe@gmail.com',
              address: 'Paul Allen Center, 185 E Stevens Way NE AE100R, Seattle, WA 98195'
            },
            {
              email: 'Nelson@gmail.com',
              address: 'Bill & Melinda Gates Center For Computer Science & Engineering, 3800 E Stevens Way NE, Seattle, WA 98195'
            }
          ],
          listOfRequests: [
            {

            }
          ]
        })
      )
    }

    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: 'Invalid login credentials'
      })
    )
  }),

  rest.get('/friends', (req, res, ctx) => {
    // TODO - right now this if there is any header called 'auth' the request will go through
    const auth = req.headers.has('auth')

    if (auth) {
      return res(
        ctx.status(200),
        ctx.json({
          listOfFriends: [
            {
              id: 1,
              email: 'Joe@gmail.com',
              address: 'Paul Allen Center, 185 E Stevens Way NE AE100R, Seattle, WA 98195'
            },
            {
              id: 2,
              name: 'Nelson@gmail.com',
              address: 'Bill & Melinda Gates Center For Computer Science & Engineering, 3800 E Stevens Way NE, Seattle, WA 98195'
            }
          ],
          listOfRequests: [
            {

            }
          ]
        })
      )
    }

    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: 'Error: Not Authenticated'
      })
    )
  }),

  rest.get('/user', (req, res, ctx) => {
    const email = req.url.searchParams.get('email')

    // TODO - right now this if there is any header called 'auth' the request will go through
    const auth = req.headers.has('auth')

    if (auth) {
      return res(
        ctx.status(200),
        ctx.json({
          user: {
            email,
            address: '123 NE UW Street, Seattle, WA 98105'
          }
        })
      )
    }

    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: 'Error: Not Authenticated'
      })
    )
  }),

  rest.post('/create', (req, res, ctx) => {
    const email = req.url.searchParams.get('email')
    const password = req.url.searchParams.get('password')
    const address = req.url.searchParams.get('address')

    if (email === null || password === null || address === null) {
      return res(
        ctx.status(400),
        ctx.json({
          errorMessage: 'Error: Cannot make account with provided parameters'
        })
      )
    }

    return res(
      ctx.status(201),
      ctx.json({
        user: {
          email,
          address
        }
      })
    )
  }),

  rest.post('/sendFriendReq', (req, res, ctx) => {
    // TODO - right now this if there is any header called 'auth' the request will go through
    const auth = req.headers.has('auth')

    if (auth) {
      return res(
        ctx.status(201),
        ctx.json({
          message: 'Friend request sent'
        })
      )
    }

    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: 'Error: Not Authenticated'
      })
    )
  }),

  rest.post('/respondFriendReq', (req, res, ctx) => {
    const resp = req.url.searchParams.get('response')

    // TODO - right now this if there is any header called 'auth' the request will go through
    const auth = req.headers.has('auth')

    if (auth) {
      if (resp === 'true') {
        return res(
          ctx.status(200),
          ctx.json({
            response: true
          })
        )
      } else {
        return res(
          ctx.status(200),
          ctx.json({
            message: false
          })
        )
      }
    }

    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: 'Error: Not Authenticated'
      })
    )
  })

]
