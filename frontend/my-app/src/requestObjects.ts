/**
 * Enum that represents the different HTTP methods
 */
enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
}

const ENDPOINT = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_BACKEND as string
console.log(ENDPOINT)

/**
 * Represents a single request made between the frontend and the backend API
 */
class EquidistantRequest {
  path: string
  method: HttpMethods
  body: URLSearchParams | null
  headers: Headers

  /**
   * Constructs a new EquidistantRequest. This constructor should rarely ever be used. Instead an
   * appropriate subclass should be added as seen throughout this file.
   * @param method the appropriate HTTP method used
   * @param path the path to be queried
   * @param body the body of the request
   */
  constructor (method: HttpMethods, path: string, body: URLSearchParams) {
    this.path = ENDPOINT + path
    this.method = method
    this.body = null

    // Needed because of the specific backend tunnel we're using
    this.headers = new Headers({
      'ngrok-skip-browser-warning': 'true'
    })

    if (method === HttpMethods.GET) {
      this.path += '?' + body.toString()
    } else if (method === HttpMethods.POST) {
      this.body = body
      // Needed for the information to be stored within the POST itself
      this.headers.append('Content-type', 'application/x-www-form-urlencoded')
    }
  }
}

export { EquidistantRequest }

/**
 * Represents a login request between the client and server
 */
class LoginRequest extends EquidistantRequest {
  /**
   * Creates a new login request
   * @param email the email attempting to use
   * @param password the password associated with the email
   */
  constructor (email: string, password: string) {
    super(HttpMethods.GET, '/login', new URLSearchParams({
      email,
      password
    }))
  }
}

/**
 * Represents a create account request between the client and server
 */
class CreateAccountRequest extends EquidistantRequest {
  /**
   * Creates a new create account request
   * @param email the email to use
   * @param password the password to use
   * @param address the address of the user
   */
  constructor (email: string, password: string, address: string) {
    super(HttpMethods.POST, '/create', new URLSearchParams({
      email,
      password,
      address
    }))
  }
}

export { LoginRequest, CreateAccountRequest }

/**
 * Represents a bearer request, which is any request between the client and server
 * that requirers bearer authorization
 */
class BearerRequest extends EquidistantRequest {
  /**
   * Creates a new bearer request. Note that much like EquidistantRequest, this class
   * should raraely ever be used directly. Rather an appropriate subclass should be created
   * @param method the appropriate HTTP method used
   * @param path the path to be queried
   * @param bearer the bearer token to authorize the request
   * @param body the body of the request
   */
  constructor (method: HttpMethods, path: string, bearer: string, body: URLSearchParams) {
    super(method, path, body)
    this.headers.append('Authorization', bearer)
  }
}

/**
 * Represents a location request between the client and server. Note that this
 * requirers bearer authorization
 */
class LocationRequest extends BearerRequest {
  /**
   * Creates a new location request
   * @param users the users present in the request
   * @param bearer the bearer of the requester to make sure the request is legitimate
   */
  constructor (users: string[], bearer: string) {
    super(HttpMethods.GET, '/locations', bearer, new URLSearchParams())
    const params = new URLSearchParams()
    users.forEach((user) => {
      params.append('users', user)
    })
    this.path += '?' + params.toString()
  }
}

/**
 * Represents a friends request between the client and server. Note that this
 * requirers bearer authorization
 */
class FriendsRequest extends BearerRequest {
  /**
   * Constructs a new request that returns all friends of a user
   * @param email the email of the requester
   * @param bearer the authorization bearer of the requester
   */
  constructor (email: string, bearer: string) {
    super(HttpMethods.GET, '/friends', bearer, new URLSearchParams({
      email
    }))
  }
}

/**
 * Represents a user request between the client and server. Note that this
 * requirers bearer authorization
 */
class UserRequest extends BearerRequest {
  /**
   * Constructs a new user request
   * @param email the email of the user being requested
   * @param bearer the bearer of the requester
   */
  constructor (email: string, bearer: string) {
    super(HttpMethods.GET, '/user', bearer, new URLSearchParams({
      email
    }))
  }
}

/**
 * Represents a friend request between the client and server. Note that this
 * requirers bearer authorization
 */
class SendFriendRequest extends BearerRequest {
  /**
   * Constructs a new friend request
   * @param requesterEmail the email of the friend requester
   * @param receiverEmail the email of the friend requestee
   * @param bearer the bearer of the requester
   */
  constructor (requesterEmail: string, receiverEmail: string, bearer: string) {
    super(HttpMethods.POST, '/sendFriendReq', bearer, new URLSearchParams({
      requesterEmail,
      receiverEmail
    }))
  }
}

/**
 * Represents a response to a friend request between the client and server. Note that this
 * requirers bearer authorization
 */
class FriendRequestResponse extends BearerRequest {
  /**
   * Constructs a new friend request response
   * @param receiverEmail the reciever of the initial friend request (now the responder)
   * @param requesterEmail the requester of the intial friend request (now the reciever)
   * @param bearer the bearer of the current responder
   */
  constructor (receiverEmail: string, requesterEmail: string, bearer: string) {
    super(HttpMethods.POST, '/respondFriendReq', bearer, new URLSearchParams({
      receiverEmail,
      requesterEmail
    }))
  }
}

export {
  LocationRequest, FriendsRequest, UserRequest,
  SendFriendRequest, FriendRequestResponse
}
export { ENDPOINT }
