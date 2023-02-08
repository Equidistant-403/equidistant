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