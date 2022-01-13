import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import moment from "moment";


export default function MovieList() {

    const [data, setData] = useState(false);
    const [genre, setGenre] = useState(false);

    // Get trending movies of latest week
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=8c20094b9d32bd14049b323d7d8294d0', 
        { method: 'GET' })
            .then(response => response.json())
            .catch(e => console.warn('error getting movies:', e))
            .then(result => setData(result));
    }, []);

    // Get the Genre array to translate genre_ids 
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=8c20094b9d32bd14049b323d7d8294d0&language=en-US', 
        { method: 'GET' })
            .then(response => response.json())
            .catch(e => console.warn('error getting genre:', e))
            .then(result => setGenre(result));
    }, []);
    
    // Sort by descending release date
    if (data) {
        data.results.sort((a, b) => {
            if (a.release_date > b.release_date) {
                return -1;
            } else {
                return 1;
            }
        })
    }

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {data ?
            data.results.map((item, i) => 
            <div key={i} className="card m-2 m-lg-4"><NavLink to={{
                pathname:'/MoviePage',
                hash: `${data.results[i].id}`,
                state: {id: data.results[i].id}  
              }}>
                <img className="card-img-top" src={"http://image.tmdb.org/t/p/w300/" + item.poster_path} alt="" />
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    { genre ?
                    // Translate genre ID to genre Name
                    item.genre_ids.map((x, j) => {
                        let genreName = '';
                        for (let k = 0; k < genre.genres.length; k++) {
                            if (x === genre.genres[k].id) {
                                genreName = genre.genres[k].name;
                            }
                        }
                        return <span key={j} className="badge bg-warning text-dark m-1">{genreName}</span>
                    }) :
                    <p>Loading...</p>}
                    <div className="d-flex justify-content-around">
                        <span>{moment(item.release_date).format("Do MMM YYYY")}</span>
                        <span>Rating: {item.vote_average}</span>
                    </div>
                </div>
            </NavLink></div>):
            <div>Loading...</div>}
        </div>
    )
}