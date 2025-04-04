# API Documentation

## Endpoints Overview

| URL                    | Method | Description                                                    |
| ---------------------- | ------ | -------------------------------------------------------------- |
| `"/users"`             | `GET`  | Returns an array with the `name`, `username` and `src` of all the users    |
| `"/user"` | `POST`  | Returns an object containing all the user's keys |
| `"/user/:username"` | `GET`  | Returns a single user object with all the user keys |
| `"/login"` | `POST`  | Returns a `username` object|
| `"/user/:username"` | `PATCH`  | Returns the modified user object with all the user keys|
---

## Responses Overview

Each of these endpoints will return an object. What it contains depends on if it succeeded or failed.

If there is an issue, the response object will contain a status and a message.

```js
{
  "status": >=400,
  "message": "...",
}
```

If the server was successful, there will always be a status in the object, but any other key values pairings will depend on the endpoint.

---

## Endpoint Details

## Users collection

### "/users" (GET)

On success
```js
{
  "status": 200,
  "allUsers": [...],
}
```

Elements of the `allUsers` array will be objects with keys: `name` `username` and `src`.

Unsuccessful status codes: 404, 502.

---

### "/user" (GET)

On success
```js
{
  "status": 200,
  "user": {
        _id,
        name,
        username,
        email,
        src,
        bio,
        followers: [],
        favorites: [],
        reviews: [],
        likes: [],
        comment: [],
        status: "active"
    },
}
```

Unsuccessful status codes: 404, 502.

---

### "/user/:username" (POST)

On success
```js
{
  "status": 201,
  "user": {
        _id,
        name,
        username,
        email,
        src,
        bio,
        followers: [],
        favorites: [],
        reviews: [],
        likes: [],
        comment: [],
        status: "active"
    },
}
```

Unsuccessful status codes: 400, 404, 502.

---

### "/login" (POST)

On success
```js
{
  "status": 200,
  "user": {
    name,
    username,
    src
    }
}
```

Unsuccessful status codes: 404, 502.

---

### "/user/:username" (PATCH)

On success
```js
{
  "status": 200,
  "user": {
        _id,
        name,
        username,
        email,
        src,
        bio,
        // followers: [],
        // favorites: [],
        // reviews: [],
        // likes: [],
        // comment: [],
        status: "active"
    },
}
```

Unsuccessful status codes: 400, 404, 502.

---