# API Documentation

## Users Endpoints

| URL                    | Method | Description                                                    |
| ---------------------- | ------ | -------------------------------------------------------------- |
| `"/users"`             | `GET`  | Returns an array with the `name`, `username` and `src` of all the users |
| `"/user/:username"`    | `GET`  | Returns a single user object with all the user keys |
| `"/user"`              | `POST` | Returns an object containing all the user's keys |
| `"/login"`             | `POST` | Returns a `username` object |
| `"/user/:username"`    | `PATCH`| Returns the modified user object with the selected user keys |
| `"/user/add-friend"`   | `PATCH`| Allows the user to follow another user. Returns a feedback message | 
| `"/user/remove-friend"`| `PATCH`| Allows the user to unfollow another user. Returns a feedback message |
| `"/profile"`           | `GET`  | Checks if the token is valid |

## Users Interactions Endpoints

| URL                       | Method | Description                                                    |
| ------------------------- | ------ | -------------------------------------------------------------- |
| `"/movie/:movieId/list"`  | `POST` | Returns a feedback message |
| `"/movie/:movieId/review"`| `POST` | Returns the review object |
| `"/reviews"`              | `GET`  | Returns an array containing all the reviews |
| `"/add-review"`           | `PATCH`| Allows the user to write a review for a movie|
| `"/like-review"`          | `PATCH`| Allows the user to like another user review from our database|
| `"/unlike-review"`        | `PATCH`| Allows the user to remove his/her like on a review from our database|
| `"/comment-review"`       | `PATCH`| Allows the user to comment on a review from our database|

## TMDB API Endpoints

| URL                    | Method | Description                                                    |
| ---------------------- | ------ | -------------------------------------------------------------- |
| `"/api/movie/:movieId"`| `GET`  | Returns a `movieDetails` object, a `credits` array, a `directors` array, a `recommendations` array and a `reviews` array|
| `"/api/genre/:genreId"`| `GET`  | Returns a `moviesByGenre` array containing 40 items and a `maxPages` number|
| `"/api/search/:query"` | `GET`  | Returns a `moviesSearched` array containing 40 items and a `maxPages` number|
| `"/api/home"`          | `GET`  | Returns a `popularMovies` array, a `topRatedMovies` array and a `upcomingMovies` array|
| `"/api/genres"`        | `GET`  | Returns a `genres` array|

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

## Users Endpoint Details

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
        lists,
        bio,
        follows,
        status
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
        lists,
        bio,
        follows,
        status
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
        _id,
        name,
        username,
        email,
        src,
        lists,
        bio,
        follows,
        status
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
        lists,
        bio,
        follows,
        status
    },
}
```

Unsuccessful status codes: 400, 404, 502.

---

### "/movie/:movieId/list" (POST)

On success
```js
{
  "status": 201,
  "message": `${listName} was created` or `${movieTitle} was added to ${listName}`,
}
```

Unsuccessful status codes: 404, 409, 502.

---

### "/movie/:movieId/review" (POST)

On success
```js
{
  "status": 201,
  "review": {
    _id
    movieId,
    username,
    rating,
    content,
    createdAt
  },
}
```

Unsuccessful status codes: 400, 409, 502.

---