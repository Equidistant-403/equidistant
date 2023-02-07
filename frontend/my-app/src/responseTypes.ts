interface LocationResponse {
  locations: Location[]
}

interface LoginResponse {
  bearer: string
  user: User
  listOfFriends: User[]
  friendRequests: User[]
}

interface FriendsResponse {
  friends: User[]
  friend_requests: User[]
}

interface ProfileResponse {
  email: string
  address: string
}

interface CreateAccountResponse {
  email: string
  address: string
}

interface SendRequestResponse {

}

interface RespondFriendResponse {
  response: boolean
}

interface ErrorResponse {
  error: string
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