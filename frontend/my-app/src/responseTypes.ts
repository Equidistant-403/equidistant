/**
 * Represents what is returned by a location request
 */
interface LocationResponse {
  locations: Location[]
}

/**
 * Represents what is returned by a login request
 */
interface LoginResponse {
  bearer: string
  user: User
  friends: User[]
  friendRequests: User[]
}

/**
 * Represents what is returned by a friends request
 */
interface FriendsResponse {
  friends: User[]
  friendRequests: User[]
}

/**
 * Represents what is returned by a profile request
 */
interface ProfileResponse {
  user: User
}

/**
 * Represents what is returned by a create account request
 */
interface CreateAccountResponse {
  bearer: string
  password: string
  user: User
}

/**
 * Represents what is returned by a send friend request
 */
interface SendRequestResponse {
  message: string
}

/**
 * Represents what is returned by the request that gives response to a friend request
 */
interface RespondFriendResponse {
  response: boolean
}

/**
 * Represents what is returned when a request fails
 */
interface ErrorResponse {
  error: string
}

/**
 * Represents a location as defined by the API contract
 */
class Location {
  place: [number, number]
  name: string
  rating: number
  travelTimes: number[]

  /**
   * Constructs a new location object
   * @param place the lat, long tuple representing the locations place
   * @param name the name of the location
   * @param rating the rating of the location out of 5
   * @param travelTimes the times required to travel to this location in order of those
   * present in the intial location request
   */
  constructor (place: [number, number], name: string, rating: number, travelTimes: number[]) {
    this.place = place
    this.name = name
    this.rating = rating
    this.travelTimes = travelTimes
  }
}

/**
 * Represents a user as defined by the API constract
 */
class User {
  email: string
  address: string
  checked: boolean

  /**
   * Constructs a new user
   * @param email the user's email
   * @param address the user's address
   * @param checked whether or not the user has been checked (used by the landing page
   * to add people to a request)
   */
  constructor (email: string, address: string, checked: boolean) {
    this.email = email
    this.address = address
    this.checked = checked
  }
}

/**
 * Returns whether or not the given parameter is an ErrorResponse
 * @param object the value to check
 * @returns if the value is an ErrorResponse
 */
function isError (object: any): object is ErrorResponse {
  return 'error' in object
}

/**
 * Combines all the types into one which allows our request function to return
 * all of these options
 */
type EquidistantResponse = LocationResponse | LoginResponse | FriendsResponse |
ProfileResponse | CreateAccountResponse | SendRequestResponse |
RespondFriendResponse | ErrorResponse

export type {
  EquidistantResponse, LocationResponse, LoginResponse, FriendsResponse, ProfileResponse,
  CreateAccountResponse, SendRequestResponse, RespondFriendResponse, ErrorResponse
}
export { Location, User }
export { isError }
