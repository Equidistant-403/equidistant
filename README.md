# Equidistant
Equidistant is an app to help you and your group get over the decision fatigue of a common meeting place by suggesting great rated places. It works by taking the commute time and what the users want to do as a main criterion to suggest great options for the whole group.

## Goals
### Major features
- [ ] Users are able to search / friend other users
- [ ] Users can search for restaurants that have “equidistant” travel times (based on a user defined threshold) between all users involved in the search
- [ ] Display ratings such that users are able factor that into their considerations
- [ ] Allow for users to cycle through search results

### Stretch Goals
- [ ] Mutable user profiles
- [ ] Email Confirmation on login
- [ ] Allow users to make more specific searches (food restrictions, price range, etc.)
- [ ] Expanding to more locations than just restaurants / food (parks, activities, etc.)
- [ ] Allowing users involved in the search to pick their transportation method


## Layout
### Frontend

Guide to some basic commands. all should be run from the `./frontend/my-app` directory

#### to start the app
`npm start`

#### to rebuild your dependencies 
`npm rebuild`

#### to get your MSW worker going for local development (1 time execution)
`npx msw init public/ --save`

#### to turn MSW on & off for local development
MSW is by default turned off. This is controlled via an evironmental variable. If you wish to change this so the default is on, go to the `equidistant/frontend/my-app/.env.development` files and change the value for `REACT_APP_MOCKS_ENABLED` to true. If you just wish to run the development build once with mocking enabled, run `REACT_APP_MOCKS_ENABLED=true npm start`

#### to run the formatter and receive information on errors in the terminal
`npm run lint`

#### to run the formatter and automatically fix all errors, add
`--fix` to the lint command in `package.json` so it looks like
`eslint --fix --ext .ts,.tsx ./src`

#### to run the suite of all unit and integration tests
`npm test`

#### to run a specific test suite
`npm test <filename>`

### Backend
Relevant files can be found in `./backend`

### Reports
Weekly progress reports can be found in `./reports`

### Shared
Any documents / files relevant to both frontend and backend teams can be found in `./shared`

### Operational Use Cases
-Create a new account
-Log in to an existing account

## Non-Operational Use Cases
- Start a search with a list of people
- Password reset
- Cycle through results until a satisfactory one is found
- Search and friend another user
