interface LocationResponse {
  locations: Location[]
}

interface LoginResponse {
  bearer: string
  user: User
  friends: User[]
  friendRequests: User[]
}

interface FriendsResponse {
  friends: User[]
  friendRequests: User[]
}

interface ProfileResponse {
  user: User
}

interface CreateAccountResponse {
  bearer: string
  password: string
  user: User
}

interface SendRequestResponse {
  message: string
}

interface RespondFriendResponse {
  response: boolean
}

interface ErrorResponse {
  error: string
}

class Location {
  place: [number, number]
  name: string
  rating: number
  travelTimes: number[]

  constructor (place: [number, number], name: string, rating: number, travelTimes: number[]) {
    this.place = place
    this.name = name
    this.rating = rating
    this.travelTimes = travelTimes
  }
}

class User {
  email: string
  address: string
  checked: boolean

  constructor (email: string, address: string, checked: boolean) {
    this.email = email
    this.address = address
    this.checked = checked
  }
}

function isError (object: any): object is ErrorResponse {
  return 'error' in object
}

type EquidistantResponse = LocationResponse | LoginResponse | FriendsResponse |
ProfileResponse | CreateAccountResponse | SendRequestResponse |
RespondFriendResponse | ErrorResponse

export type {
  EquidistantResponse, LocationResponse, LoginResponse, FriendsResponse, ProfileResponse,
  CreateAccountResponse, SendRequestResponse, RespondFriendResponse, ErrorResponse
}
export { Location, User }
export { isError }
