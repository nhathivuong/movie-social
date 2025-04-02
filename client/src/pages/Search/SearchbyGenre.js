import { useEffect, useState } from "react"
import MoviePoster from "../MoviePoster";

// this gets the movies sorted by popularity based on genre
const SearchbyGenre = ({genreId}) => {
    const [moviesbyGenre , setMoviesbyGenre] = useState()

    useEffect(()=>{
        const fetchMovies = async() => {
            try {
                const url1 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
                const url2 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=${genreId}`;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc1OTMwMjU1YWVjYzI2ZWU5MDIxYjliNjkwNzczZiIsIm5iZiI6MTc0MzA0NTg1OS40LCJzdWIiOiI2N2U0YzRlM2Y4NDY3OTRlOTkxMDk5NGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rm5e7ovYbkMaOkH0I5hy-CjAPUSSUYyR1ov3TEgRWjY'
                    }
                };
                
                const [res1, res2] = await Promise.all([
                    fetch(url1, options).then(res => res.json()),
                    fetch(url2, options).then(res => res.json())
                    ])

                const [json1, json2] = await Promise.all([res1.json(), res2.json()])

                setMoviesbyGenre(() =>[...json1.results, ...json2.results])
            }
            catch(error){
                console.error(error.message)
            }
        }
        fetchMovies()
    },[genreId])

    return <>
        {moviesbyGenre && moviesbyGenre.map((movie)=>{
            return <MoviePoster key={movie.id} movie={movie}/>
        }) }</>
}


export default SearchbyGenre