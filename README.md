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

to start the app
`npm start`

to rebuild your dependencies 
`npm rebuild`

to get your MSW worker going (1 time execution)
`npx msw init public/ --save`

### Backend

Relevant files can be found in `./backend`
