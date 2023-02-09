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

class Location {
  place: [number, number]
  name: string
  rating: number
  travelTimes: number[]

  constructor(place: [number, number], name: string, rating: number, travelTimes: number[]) {
    this.place = place
    this.name = name
    this.rating = rating
    this.travelTimes = travelTimes
  }
}

class User {
  name: string
  address: string

  constructor (name: string, address: string) {
    this.name = name
    this.address = address
  }
}

type EquidistantResponse = LocationResponse | LoginResponse | FriendsResponse |
                           ProfileResponse | CreateAccountResponse | SendRequestResponse |
                           RespondFriendResponse | ErrorResponse

export { User, Location }
export type { EquidistantResponse, LocationResponse, LoginResponse,
              FriendsResponse, ProfileResponse, CreateAccountResponse,
              SendRequestResponse, RespondFriendResponse, ErrorResponse }