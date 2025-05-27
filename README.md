# Film Media - The all in one platform for movie enjoyers 🎥

A website inspired by the social media experience of Goodreads. Film media is a React app that lets user browse, search, save and review movies using a live API. Users are also able to follow other users

[🔗 Film Media](https://film-media.vercel.app/)

## Features
Note: Some features are only available when logged in
- **Browse and Search Movies** — Discover movies by genre, popularity, or search query.
- **Detailed Movie Pages** — View trailers, recommendations, and user reviews.
- **Save to Custom Lists** — Keep track of movies you want to watch or have watched.
- **Write and Read Reviews** — Share your thoughts and see what others are saying.
- **User Profiles** — See your lists, reviews, and edit your info and avatar.
- **Follow Other Users** — Build your movie-loving community.
- **Community Feed** — Stay up-to-date with reviews from people you follow.
- **Authentication** — Sign up, log in, and personalize your experience.

## Technologies

- **React** — Front-end library for building user interfaces
- **React Router** — Handles client-side navigation
- **TMDB API** — Provides movie data like details, ratings, and recommendations
- **Node.js** — JavaScript runtime for the back-end
- **Express** — Web framework for building the server and API routes
- **Bcrypt** — Hashes passwords securely before storing them
- **JWT** — Manages user authentication and keeps users logged in
- **MongoDB** — Stores user data, reviews, and lists on the server
- **Vercel** — Hosts the frontend
- **Render** — Hosts the backend

## Installation

To run the app locally, follow these steps:

1. Install dependencies in both the client and server directories:
    <pre>yarn install</pre>
2. Update client fetch requests

    Remove any hardcoded backend URLs (e.g. those pointing to Render) from the client-side fetch requests, so it uses relative paths like /user.
   
4. Update the .env files in the backend and in the frontend

    In ``server/.env``, add your environment variables:
   - MONGO_URI
   - TMDB_API_KEY
   - JWT_SECRET
   
    In ``client/.env``, remove the REACT_APP_BACKEND_URL value.

    In the ``client/package.json``, add ``"proxy": "http://localhost:4000",``

    This ensures that your frontend can communicate with the backend correctly during development.

6. Start the servers

    In two separate terminals:

    Start the backend
    <pre>cd server
    yarn start</pre>

    Start the frontend
    <pre>cd client 
    yarn start</pre>

    Visit http://localhost:4000 (or whatever port you want to use) in your browser.

## Pages

1. **Home**
    - Displays upcoming, popular, and top-rated movies 
2. **Browse Movies**
    - Filter movies by genre
    - Paginated results for easier browsing
    - Search movies by name
3. **Movie Details**
    - View detailed movie information
    - Get recommendations based on the movie
    - See all user reviews
    - Save to a list or review a movie (requires login)
    - User interaction on reviews (requires login)
4. **Login/Sign up**
    - Easily toggle between login and sign-up forms
    - On sign-up, you can upload a profile picture
5. **Profile Page**
    - See all your movie lists and reviews
    - Edit your profile (if it's your own)
    - When viewing another user’s profile:
        - Follow them
        - Save and review the movies they’ve reviewed
6. **Community Page**
    - Showcases your "To Watch" list
    - Displays the latest reviews from people you follow
  
7. **About Page**
    - Learn more about the project
    - Meet the developer
8. **Blog Page**
    - Monthly updates on website features
