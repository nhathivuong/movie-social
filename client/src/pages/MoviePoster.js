//this will used for all movies quick display

const MoviePoster = ({movie}) =>{
    return <div>
        <img srcSet={movie.poster_path 
        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
        : "/assets/no_poster.jpg"} 
        src={movie.poster_path 
        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` 
        : "/assets/no_poster.jpg"} 
        alt={movie.title} 
        width={150} height={225}/>
        <h3>{movie.title}</h3>
    </div>
}

export default MoviePoster