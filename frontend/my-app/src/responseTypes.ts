interface LocationResponse {
  locations: Location[]
}

interface LoginResponse {
  bearer: string
  user: User
  listOfFriends: User[]
  listOfRequests: User[]
}

interface FriendsResponse {
  listOfFriends: User[]
  listOfRequests: User[]
}

interface ProfileResponse {
  user: User
}

interface CreateAccountResponse {
  user: User
}

interface SendRequestResponse {
  message: string
}

interface RespondFriendResponse {
  response: boolean
}

interface ErrorResponse {
  errorMessage: string
}

interface Location {
  place: [number, number]
  name: string
  rating: number
  travelTimes: number[]
}

interface User {
  id: number
  name: string
  address: string
}

export type { Location, User, LoginResponse, LocationResponse }