enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
}

class EquidistantRequest {
  path: string
  method: HttpMethods

  constructor (method: HttpMethods, path: string) {
    this.path = path
    this.method = method
  }

  addParams (params: URLSearchParams): string {
    const result = this.path += '?' + params.toString()
    return result
  }
}

export { EquidistantRequest }

// Login
class LoginRequest extends EquidistantRequest {
  constructor (email: string, password: string) {
    super(HttpMethods.GET, '/login')
    this.path = super.addParams(new URLSearchParams({
      email: email,
      password: password
    }))
  }
}

// Create
class CreateRequest extends EquidistantRequest {
  constructor (email: string, password: string, address: string) {
    super(HttpMethods.POST, '/create')
    this.path = super.addParams(new URLSearchParams({
      email: email,
      password: password,
      address: address
    }))
  }
}

export { LoginRequest, CreateRequest }

class BearerRequest extends EquidistantRequest {
  headers: Record<string, unknown>

  constructor (method: HttpMethods, path: string, bearer: string) {
    super(method, path)
    this.headers = { Authorization: bearer }
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
      email: email
    }))
  }
}

// User
class UserRequest extends BearerRequest {
  constructor (email: string, bearer: string) {
    super(HttpMethods.GET, '/user', bearer)
    this.path = super.addParams(new URLSearchParams({
      email: email
    }))
  }
}

// Friend request
class SendFriendRequest extends BearerRequest {
  constructor (requesterEmail: string, receiverEmail: string, bearer: string) {
    super(HttpMethods.POST, '/sendFriendReq', bearer)
    this.path = super.addParams(new URLSearchParams({
      requesterEmail: requesterEmail,
      receiverEmail: receiverEmail
    }))
  }
}

// Friend request response
class FriendRequestResponse extends BearerRequest {
  constructor (receiverEmail: string, requesterEmail: string, bearer: string) {
    super(HttpMethods.POST, '/respondFriendReq', bearer)
    this.path = super.addParams(new URLSearchParams({
      receiverEmail: receiverEmail,
      requesterEmail: requesterEmail
    }))
  }
}

export {
  LocationRequest, FriendsRequest, UserRequest,
  SendFriendRequest, FriendRequestResponse
}
