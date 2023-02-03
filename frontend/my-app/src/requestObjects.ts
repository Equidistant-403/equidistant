// For typing
export { EquidistantRequest }

// Base requests
export { LoginRequest, CreateRequest }
// Bearer auth requests
export { LocationRequest, FriendsRequest, UserRequest,
         SendFriendRequest, FriendRequestResponse }

const backendHostname = "localhost:3000";
const backendPort = 443;
enum HttpMethods  {
    GET = 'GET',
    POST = 'POST',
}

///////////////////
// BASE REQUESTS // 
///////////////////

const querystring = require('querystring');
class EquidistantRequest {
    hostname: string;
    port: number;
    path: string;
    method: HttpMethods;

    constructor(method: HttpMethods, path: string) {
        this.hostname = backendHostname;
        this.port = backendPort;
        this.path = path;
        this.method = method;
    }

    addParams(params: Object) {
        this.path += querystring.stringify(params)
    }
}

// Login
class LoginRequest extends EquidistantRequest {
    constructor(email: string, password: string) {
        super(HttpMethods.GET, '/login');
        super.addParams({
            email: email,
            password: password
        });
    }
}

// Create
class CreateRequest extends EquidistantRequest {
    constructor(email: string, password: string, address: string) {
        super(HttpMethods.POST, '/create');
        super.addParams({
            email: email,
            password: password,
            address: address
        })
    }
}

/////////////////////
// BEARER REQUESTS // 
/////////////////////

class BearerRequest extends EquidistantRequest {
    headers: Object

    constructor(method: HttpMethods, path: string, bearer: string) {
        super(method, path)
        this.headers = { Authorization: bearer }
    }
}

// Location
class LocationRequest extends BearerRequest {
    constructor(users: string[], bearer: string) {
        super(HttpMethods.GET, '/locations', bearer)
        super.addParams({
            users: users
        })
    }
}

// Friends
class FriendsRequest extends BearerRequest {
    constructor(email: string, bearer: string) {
        super(HttpMethods.GET, '/friends', bearer)
        super.addParams({
            email: email
        })
    }
}

// User
class UserRequest extends BearerRequest {
    constructor(email: string, bearer: string) {
        super(HttpMethods.GET, '/user', bearer)
        super.addParams({
            email: email
        })
    }
}

// Friend request
class SendFriendRequest extends BearerRequest {
    constructor(email: string, friendEmail: string, bearer: string) {
        super(HttpMethods.POST, '/sendFriendReq', bearer)
        super.addParams({
            email: email,
            friendEmail: friendEmail,
        })
    }
}

// Friend request response
class FriendRequestResponse extends BearerRequest {
    constructor(email: string, requestEmail: string, bearer: string) {
        super(HttpMethods.POST, '/respondFriendReq', bearer)
        super.addParams({
            email: email,
            requestEmail: requestEmail
        })
    }
}