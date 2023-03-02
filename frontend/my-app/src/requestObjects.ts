enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
}

const ENDPOINT = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_BACKEND as string
class EquidistantRequest {
  path: string
  method: HttpMethods
  body: URLSearchParams | null
  headers: Headers

  constructor (method: HttpMethods, path: string, body: URLSearchParams) {
    this.path = ENDPOINT + path
    this.method = method
    this.body = null
    this.headers = new Headers({
      'ngrok-skip-browser-warning': 'true'
    })

    if (method === HttpMethods.GET) {
      this.path += '?' + body.toString()
    } else if (method === HttpMethods.POST) {
      this.body = body
      this.headers.append('Content-type', 'application/x-www-form-urlencoded')
    }
  }
}

export { EquidistantRequest }

// Login
class LoginRequest extends EquidistantRequest {
  constructor (email: string, password: string) {
    super(HttpMethods.GET, '/login', new URLSearchParams({
      email,
      password
    }))
  }
}

// Create
class CreateAccountRequest extends EquidistantRequest {
  constructor (email: string, password: string, address: string) {
    super(HttpMethods.POST, '/create', new URLSearchParams({
      email,
      password,
      address
    }))
  }
}

export { LoginRequest, CreateAccountRequest }

class BearerRequest extends EquidistantRequest {
  constructor (method: HttpMethods, path: string, bearer: string, body: URLSearchParams) {
    super(method, path, body)
    this.headers.append('Authorization', bearer)
  }
}

// Location
class LocationRequest extends BearerRequest {
  constructor (users: string[], bearer: string) {
    super(HttpMethods.GET, '/locations', bearer, new URLSearchParams())
    const params = new URLSearchParams()
    users.forEach((user) => {
      params.append('users', user)
    })
    this.path += '?' + params.toString()
  }
}

// Friends
class FriendsRequest extends BearerRequest {
  constructor (email: string, bearer: string) {
    super(HttpMethods.GET, '/friends', bearer, new URLSearchParams({
      email
    }))
  }
}

// User
class UserRequest extends BearerRequest {
  constructor (email: string, bearer: string) {
    super(HttpMethods.GET, '/user', bearer, new URLSearchParams({
      email
    }))
  }
}

// Friend request
class SendFriendRequest extends BearerRequest {
  constructor (requesterEmail: string, receiverEmail: string, bearer: string) {
    super(HttpMethods.POST, '/sendFriendReq', bearer, new URLSearchParams({
      requesterEmail,
      receiverEmail
    }))
  }
}

// Friend request response
class FriendRequestResponse extends BearerRequest {
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
