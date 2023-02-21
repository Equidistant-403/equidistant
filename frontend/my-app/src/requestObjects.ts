enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
}

const ENDPOINT = process.env.NODE_ENV === 'development' ? '' : 'https://b378-205-175-97-210.ngrok.io'
class EquidistantRequest {
  path: string
  method: HttpMethods
  headers: Headers

  constructor (method: HttpMethods, path: string) {
    this.path = ENDPOINT + path
    this.method = method
    this.headers = new Headers({
      'Content-Type': 'text/plain',
      'ngrok-skip-browser-warning': 'true'
    })
  }

  addParams (params: URLSearchParams): string {
    const result = this.path + '?' + params.toString()
    return result
  }
}

export { EquidistantRequest }

// Login
class LoginRequest extends EquidistantRequest {
  constructor (email: string, password: string) {
    super(HttpMethods.GET, '/login')
    this.path = super.addParams(new URLSearchParams({
      email,
      password
    }))
  }
}

// Create
class CreateAccountRequest extends EquidistantRequest {
  constructor (email: string, password: string, address: string) {
    super(HttpMethods.POST, '/create')
    this.path = super.addParams(new URLSearchParams({
      email,
      password,
      address
    }))
  }
}

export { LoginRequest, CreateAccountRequest }

class BearerRequest extends EquidistantRequest {
  constructor (method: HttpMethods, path: string, bearer: string) {
    super(method, path)
    this.headers.append('Authorization', bearer)
  }
}

// Location
class LocationRequest extends BearerRequest {
  constructor (users: string[], bearer: string) {
    super(HttpMethods.GET, '/locations', bearer)

    const params = new URLSearchParams()
    users.forEach((user) => {
      params.append('users', user)
    })
    this.path = super.addParams(params)
  }
}

// Friends
class FriendsRequest extends BearerRequest {
  constructor (email: string, bearer: string) {
    super(HttpMethods.GET, '/friends', bearer)
    this.path = super.addParams(new URLSearchParams({
      email
    }))
  }
}

// User
class UserRequest extends BearerRequest {
  constructor (email: string, bearer: string) {
    super(HttpMethods.GET, '/user', bearer)
    this.path = super.addParams(new URLSearchParams({
      email
    }))
  }
}

// Friend request
class SendFriendRequest extends BearerRequest {
  constructor (requesterEmail: string, receiverEmail: string, bearer: string) {
    super(HttpMethods.POST, '/sendFriendReq', bearer)
    this.path = super.addParams(new URLSearchParams({
      requesterEmail,
      receiverEmail
    }))
  }
}

// Friend request response
class FriendRequestResponse extends BearerRequest {
  constructor (receiverEmail: string, requesterEmail: string, bearer: string) {
    super(HttpMethods.POST, '/respondFriendReq', bearer)
    this.path = super.addParams(new URLSearchParams({
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
