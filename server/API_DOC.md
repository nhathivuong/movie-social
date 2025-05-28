# API Documentation

## Users Endpoints

| URL                    | Method | Description                                                    |
| ---------------------- | ------ | -------------------------------------------------------------- |
| `"/users"`             | `GET`  | Returns an array with the `name`, `username` and `src` of all the users |
| `"/user/:username"`    | `GET`  | Returns a single user object with the selected keys |
| `"/user"`              | `POST` | Returns a `username` object and the `token` |
| `"/login"`             | `POST` | Returns a `username` object and the `token` |
| `"/user/:username"`    | `PATCH`| Returns the modified user object with the selected user keys |
| `"/user/add-friend"`   | `PATCH`| Allows the user to follow another user. Returns a feedback message | 
| `"/user/remove-friend"`| `PATCH`| Allows the user to unfollow another user. Returns a feedback message |
| `"/profile"`           | `GET`  | Checks if the token is valid to get selected keys |

## Interactions Endpoints

| URL                       | Method | Description                                                    |
| ------------------------- | ------ | -------------------------------------------------------------- |
| `"/movie/:movieId/list"`  | `POST` | Returns a feedback message either for adding a movie to a list or creating a new list |
| `"/reviews"`              | `GET`  | Returns a `reviews` array containing all the reviews |
| `"/movie/:movieId/review"`| `POST` | Allows the user to write a review for a movie and returns the `review` object |
| `"/like-review"`          | `PATCH`| Allows the user to like another user review from our database|
| `"/unlike-review"`        | `PATCH`| Allows the user to remove their like on a review from our database|
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

Each of these endpoints will return either an object or an array. What it contains depends on if it succeeded or failed.

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
        name,
        username,
        src,
        lists,
        bio,
        follows,
        status,
        pronouns
    },
}
```

Unsuccessful status codes: 404, 502.

---

### "/user" (POST)

On success
```js
{
  "status": 201,
  "token": token,
  "username" : username,
}
```
The signup token expires after 1 day

Unsuccessful status codes: 400, 404, 502.

---

### "/login" (POST)

On success
```js
{
  "status": 200,
  "token": token,
}
```
The login token expires after 7 days

Unsuccessful status codes: 400, 404, 502.

---

### "/user/:username" (PATCH)

On success
```js
{
  "status": 200,
  "user": {
        name,
        username,
        email,
        src,
        lists,
        bio,
        follows,
        status,
        pronouns
    },
}
```

Unsuccessful status codes: 400, 404, 502.

---

### "/add-friend" (PATCH)

On success
```js
{
  "status": 200,
  "username": username,
  "message":`${username} now follows ${newFollow}`
}
```

Unsuccessful status codes: 400, 404, 409, 502.

---

### "/remove-friend" (PATCH)

On success
```js
{
  "status": 200,
  "username": username,
  "message":`${username} does not follow ${unfollow} anymore`
}
```

Unsuccessful status codes: 400, 404, 409, 502.

---

### "/profile" (GET)

On success
```js
{
  "status": 200,
  "user": user,
}
```
This is verifies the token and gives access to the user informations for the user profile informations

Unsuccessful status codes: 401, 403, 502.

---

## Interactions Endpoint Details

### "/movie/:movieId/list" (POST)

On success
```js
{
  "status":201,
  "message": `${movieTitle} was added to ${listName}` or `${listName} was created`
}
```

Unsuccessful status codes: 404, 409, 502.

---

### "/reviews" (GET)

On success
```js
{
  "status": 201,
  "reviews": [...],
}
```
Elements of the `reviews` array will be objects with all the keys.

Unsuccessful status codes: 400, 409, 502.

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
    likes: [],
    comments: [],
    createdAt,
  },
}
```
The `likes` and `comments` arrays are placeholders 

Unsuccessful status codes: 400, 409, 502.

---

### "/like-review" (PATCH)

On success
```js
{
  "status": 200,
  "message": "The review was successfully liked"
}
```

Unsuccessful status codes: 400, 404, 409, 502.

---

### "/unlike-review" (PATCH)

On success
```js
{
  "status": 200,
  "message": "The review was successfully unliked"
}
```

Unsuccessful status codes: 400, 404, 409, 502.

---

### "/comment-review" (PATCH)

On success
```js
{
  "status": 200,
  "message": "The comment was succesful on the review"
}
```

Unsuccessful status codes: 400, 404, 409, 502.

---

## TMDB API Endpoint Details

### "/api/movie/:movieId" (GET)

On success
```js
{
  "status": 200,
  movieDetails,
  credits,
  directors,
  recommendations,
  reviews,
}
```
Here are some links for more details on the information provided by the TMDB API:
- `movideDetails`: https://developer.themoviedb.org/reference/movie-details
- `credits` and `directors`: https://developer.themoviedb.org/reference/movie-credits
- `recommendations`: https://developer.themoviedb.org/reference/movie-recommendations
- `reviews`: https://developer.themoviedb.org/reference/movie-reviews

Unsuccessful status codes: 404, 502.

---

### "/api/genre/:genreId" (GET)

On success
```js
{
  "status": 200,
  moviesByGenre,
  maxPages
}
```
Here is the link for more details for `moviesByGenre` informations provided by the TMDB API https://developer.themoviedb.org/reference/discover-movie 

Unsuccessful status codes: 404, 502.

---

### "/api/search/:query" (GET)

On success
```js
{
  "status": 200,
  moviesSearched,
  maxPages
}
```
Here is the link for more details for `moviesSearched` informations provided by the TMDB API https://developer.themoviedb.org/reference/search-movie

Unsuccessful status codes: 404, 502.

---

### "/api/home" (GET)

On success
```js
{
  "status": 200,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
}
```
Here are some links for more details on the information provided by the TMDB API:
- `popularMovies`: https://developer.themoviedb.org/reference/movie-popular-list 
- `topRatedMovies`: https://developer.themoviedb.org/reference/movie-top-rated-list
- `upcomingMovies`: https://developer.themoviedb.org/reference/movie-upcoming-list

Unsuccessful status codes: 404, 502.

---

### "/api/genres" (GET)

On success
```js
{
  "status": 200,
  "genres": [...],
}
```
Elements of the `genres` array will be objects with keys `id` and `name`.

Unsuccessful status codes: 404, 502.

---