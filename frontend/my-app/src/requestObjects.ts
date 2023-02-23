enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
}

const ENDPOINT = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_BACKEND as string
class EquidistantRequest {
  path: string
  method: HttpMethods
  body: string
  headers: Headers

  constructor (method: HttpMethods, path: string, body: Record<string, string>) {
    this.path = ENDPOINT + path
    this.method = method
    this.body = ''

    if (method === HttpMethods.GET) {
      this.path = this.addParams(new URLSearchParams(body))
    } else if (method === HttpMethods.POST) {
      this.body = JSON.stringify(body)
    }

    this.headers = new Headers({
      'Content-type': 'application/json; charset=UTF-8',
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
    super(HttpMethods.GET, '/login', {
      email,
      password
    })
  }
}

// Create
class CreateAccountRequest extends EquidistantRequest {
  constructor (email: string, password: string, address: string) {
    super(HttpMethods.POST, '/create', {
      email,
      password,
      address
    })
  }
}

export { LoginRequest, CreateAccountRequest }

class BearerRequest extends EquidistantRequest {
  constructor (method: HttpMethods, path: string, bearer: string, body: Record<string, string>) {
    super(method, path, body)
    this.headers.append('Authorization', bearer)
  }
}

// Location
class LocationRequest extends BearerRequest {
  constructor (users: string[], bearer: string) {
    super(HttpMethods.GET, '/locations', bearer, {})
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
    super(HttpMethods.GET, '/friends', bearer, {
      email
    })
  }
}

// User
class UserRequest extends BearerRequest {
  constructor (email: string, bearer: string) {
    super(HttpMethods.GET, '/user', bearer, {
      email
    })
  }
}

// Friend request
class SendFriendRequest extends BearerRequest {
  constructor (requesterEmail: string, receiverEmail: string, bearer: string) {
    super(HttpMethods.POST, '/sendFriendReq', bearer, {
      requesterEmail,
      receiverEmail
    })
  }
}

// Friend request response
class FriendRequestResponse extends BearerRequest {
  constructor (receiverEmail: string, requesterEmail: string, bearer: string) {
    super(HttpMethods.POST, '/respondFriendReq', bearer, {
      receiverEmail,
      requesterEmail
    })
  }
}

export {
  LocationRequest, FriendsRequest, UserRequest,
  SendFriendRequest, FriendRequestResponse
}
export { ENDPOINT }
