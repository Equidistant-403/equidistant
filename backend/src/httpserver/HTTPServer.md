# HTTP Server

Django is a open-source web framework written in Python. It provides a wide range of built-in features and tools that make it easy to build web applications. Django is used for URL routing and handling of HTTP requests for this application. 

For Django documentation, see [this reference sheet](https://django.readthedocs.io/en/stable/contents.html).

## Overview

The URL configuration file maps the URLs to views in this application. When a client makes a request to a URL in this application, the URL is matched against the URL patterns in the URL configuration file. If a match is found, the corresponding view is called with any parameters passed in the URL.

Views in Django are Python functions or classes that take HTTP requests and return HTTP responses. A view is called from the URL configiration file.

Endpoints refer to the URLs that are mapped to views in the application. When a client makes a request to a particular URL, Django uses the URL dispatcher to match the URL to a view, and then calls the view to generate a response.

## Endpoints

### 1. Login
#### GET /login
Get the login credentials through this HTTP request

#### Params:
```json
{
  "email": "[string]",
  "password": "[encrypted string]"
}
```

#### Success Response:
- Code: 200
- Content:
```json
{
  "bearer": "[token string]",
  "user": {
            "email": "[string]",
            "address": "[string]"
          },
  "friends": [<user_1>, <user_2>, <user_n>],
  "friend_requests": [<user_1>, <user_2>, <user_n>]
}
```
Note that "bearer" must be remembered by the frontend and must be provided
to access any protected endpoints. Both "friends" and "friend_requests" are lists
of JSON User objects.

#### Error Response:
- Code: 401
- Content:
```json
{
  "error": "Invalid login credentials"
}
```

### 2. Create Account
#### POST /create
Posts the user's account credentials through this HTTP request

#### Params:
```json
{
  "bearer": "[token string]",
  "email": "[string]",
  "password": "[encrypted string]",
  "address": "[string]"
}
```

#### Success Response:
- Code: 201
- Content:
```json
{
  "email": "[string]",
  "address": "[string]"
}
```

#### Error Response:
- Code: 400
- Content:

```json
{
  "error": "Cannot make account with provided parameters"
}
```

### 3. Locations
#### GET /locations
Gets the locations associated with the users making use of the application

#### Params:

```json
{
  "users": ["[email_1]", "[email_2]", "[email_n]"]
}
```
Note that "users" should include the user requesting the search.

#### Header:
- Authorization Bearer

#### Success Response:
- Code: 200
- Content:
```json
{
  "locations": [<loc_1>, <loc_2>, <loc_n>]
}
```

### 4. Friends
#### GET /friends
Gets a list of friends and friend requests associated with a user email

#### Params:

```json
{
  "email": "[string]"
}
```

#### Header:
- Authorization Bearer

#### Success Response:
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

### 5. User
#### GET /user
Gets the self profile of the user

#### Params:

```json
{
  "email": "[string]"
}
```

#### Header:
- Authorization Bearer

#### Success Response:
- Code: 200
- Content:
```json
{
  "email": "[string]",
  "address": "[string]"
}
```

#### Error Response:
- Code: 401
- Content:
```json
{
  "error": "access forbidden"
}
```

### 6. Send Friend Request
#### POST /sendFriendReq
Posts a friend request from a user to another user

#### Params:

```json
{
  "requesterEmail": "[string]",
  "receiverEmail": "[string]"
}
```

#### Header:
- Authorization Bearer

#### Success Response:
- Code: 201
- Content:
```json
{
  
}
```

#### Error Response:
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

### 7. Respond to Friend Resquest
#### POST /respondFriendReq
Posts a response to a friend request

#### Params:
```json
{
  "requesterEmail": "[string]",
  "receiverEmail": "[string]",
  "response": boolean
}
```
Note that a response of true means that the user accepted the friend request.
Otherwise, the user declined the friend request.

#### Header:
- Authorization Bearer

#### Success Response:
- Code: 200
- Content:
```json
{
  "response": boolean
}
```
Note that the response here is expected to have the same value as the response
in the request, and is present for validation purposes.

#### Error Response:
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