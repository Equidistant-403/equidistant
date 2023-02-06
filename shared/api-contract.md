# API Contract

## GET Requests

### Conduct search

GET /locations

Params:

```json
{
  "users": ["[email_1]", "[email_2]", "[email_n]"]
}
```
Note that "users" should include the user requesting the search.

Header:
- Authorization Bearer

Success Response:
- Code: 200
- Content:
```json
{
  "locations": [<loc_1>, <loc_2>, <loc_n>]
}
```

Note that "locations" should be a list of Location JSON objects.

### Login request

GET /login

Params:

```json
{
  "email": "[string]",
  "password": "[encrypted string]"
}
```

Success Response:
- Code: 200
- Content:
```json
{
  "bearer": "[token string]",
  "friends": [<user_1>, <user_2>, <user_n>],
  "friend_requests": [<user_1>, <user_2>, <user_n>]
}
```
Note that "bearer" must be remembered by the frontend and must be provided
to access any protected endpoints. Both "friends" and "friend_requests" are lists
of JSON User objects.

Error Response:
- Code: 401
- Content:
```json
{
  "error": "Invalid login credentials"
}
```

### Get Friend List

GET /friends

Params:

```json
{
  "email": "[string]"
}
```

Header:
- Authorization Bearer

Success Response:
- Code: 200
- Content:
```json
{
  "friends": [<user_1>, <user_2>, <user_n>],
  "friend_requests": [<user_1>, <user_2>, <user_n>]
}
```
Note that both "friends" and "friend_requests" are lists
of JSON User objects.

Error Response:
- Code: 401
- Content:
```json
{
  "error": "access forbidden"
}
```

## POST Requests

### Create Account

POST /create

Params:

```json
{
  "email": "[string]",
  "password": "[encrypted string]",
  "address": "[string]"
}
```

Success Response:
- Code: 201
- Content:
```json
{
  
}
```

Error Response:
- Code: 400
- Content:

```json
{
  "error": "cannot make account with provided parameters"
}
```

### Send Friend Request

POST /friend/send

Params:

```json
{
  "requester_email": "[string]",
  "receiver_email": "[string]"
}
```

Header:
- Authorization Bearer

Success Response:
- Code: 201
- Content:
```json
{
  
}
```

Error Response:
- Code: 401
- Content:
```json
{
  "error": "access forbidden"
}
```

- Code: 404
- Content:
```json
{
  "error": "user not found"
}
```

### Respond to Friend Request

POST /friend/respond

Params:
```json
{
  "requester_email": "[string]",
  "receiever_email": "[string]",
  "response": boolean
}
```
Note that a response of true means that the user accepted the friend request.
Otherwise, the user declined the friend request.

Header:
- Authorization Bearer

Success Response:
- Code: 200
- Content:
```json
{
  "response": boolean
}
```
Note that the response here is expected to have the same value as the response
in the request, and is present for validation purposes.

Error Response:
- Code: 401
- Content:
```json
{
  "error": "access forbidden"
}
```
- Code: 404
- Content:
```json
{
  "error": "friend request not found"
}
```

## Custom JSON Objects

### User

```json
{
  "email": "[string]",
  "address": "[string]"
}
```

### Location

```json
{
  "place": [float, float],
  "name": "[string]",
  "rating": int,
  "travel_times": [int1, int2, intn]
}
```

Note that place is intended to be a latitude, longitude tuple. Travel times
are the estimated travel times for each user in an Equidistant query.