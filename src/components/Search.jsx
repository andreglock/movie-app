import { useState, useEffect } from 'react';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";


export default function Search() {

    const [data, setSearchedData] = useState(false);
    const [ready, setDelay] = useState(false);
    const [searched, handleSearch] = useState(false);
    const [genre, setGenre] = useState(false);

    // Get the Genre array to translate genre_ids 
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=8c20094b9d32bd14049b323d7d8294d0&language=en-US', 
        { method: 'GET' })
            .then(response => response.json())
            .catch(e => console.warn('error getting genre:', e))
            .then(result => setGenre(result));
    }, []);

    // Get searched movies:
    useEffect(() => {
            fetch('https://api.themoviedb.org/3/search/movie?api_key=8c20094b9d32bd14049b323d7d8294d0&language=en-US&page=1&include_adult=false&query=' + searched)
                .then(response => response.json())
                .catch(e => console.warn('error getting movies:', e))
                .then(result => setSearchedData(result))
    }, [searched])

    useEffect(() => {
        setTimeout(() => {
            if (searched) {
                setDelay(true)
            }
         }, 200);
    }, [searched])

    return (<>
        <div className="searchWrap">
            <input type="text" placeholder='Search' />
            <button onClick={() => handleSearch(document.querySelector("input").value)}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div className="d-flex flex-wrap justify-content-center" style={{minHeight: "65vh"}}>
            {ready ?
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
            <div></div>}
        </div>
    </>)
}