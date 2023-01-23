import { rest } from 'msw'
import type { RestHandler } from 'msw'

export const handlers : RestHandler[] = [

    rest.get('/locations', (req, res, ctx) => {
      const users = req.url.searchParams.getAll('users')
      // TODO - remove console.log
      console.log(users)

        return res(
          ctx.status(200),
          ctx.json({
            locations: [
              {
                id: 1,
                name: 'CSE1'
              },
              {
                id: 2,
                name: 'CSE2'
              }
            ],
          }),
        )
      }),

      rest.get('/user', (req, res, ctx) => {
        const email = req.url.searchParams.get('email')
        const password = req.url.searchParams.get('password')
        // TODO - remove console.log
        console.log(email)
        console.log(password)

        if (password == 'password') {
          return res(
            ctx.status(200),
            ctx.json({
              listOfFriends: [
                {
                  id: 1,
                  name: 'Joe',
                  address: 'Paul Allen Center, 185 E Stevens Way NE AE100R, Seattle, WA 98195'
                },
                {
                  id: 2,
                  name: 'Nelson',
                  address: 'Bill & Melinda Gates Center For Computer Science & Engineering, 3800 E Stevens Way NE, Seattle, WA 98195'
                }
              ],
              listOfRequests: [
                {

                }
              ]
            }),
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
          const email = req.url.searchParams.get('email')
          // TODO - remove console.log
          console.log(email)

          const auth = req.headers.has('auth')

          if (auth) {
            return res(
              ctx.status(200),
              ctx.json({
                listOfFriends: [
                  {
                    id: 1,
                    name: 'Joe',
                    address: 'Paul Allen Center, 185 E Stevens Way NE AE100R, Seattle, WA 98195'
                  },
                  {
                    id: 2,
                    name: 'Nelson',
                    address: 'Bill & Melinda Gates Center For Computer Science & Engineering, 3800 E Stevens Way NE, Seattle, WA 98195'
                  }
                ],
                listOfRequests: [
                  {
  
                  }
                ]
              }),
            )
          }
    
            return res(
              ctx.status(401),
              ctx.json({
                errorMessage: 'Error: Not Authenticated'
              }),
            )
          }),

]