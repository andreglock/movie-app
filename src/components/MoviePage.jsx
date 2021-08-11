import { useState, useEffect } from 'react';
import moment from "moment";

export default function MoviePage(props) {

    const [movieData, setData] = useState(false);
    const [credits, setCredits] = useState(false);
    const [guestID, setGuestID] = useState(false);

    // Get movie information
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.location.hash.slice(1)}?api_key=8c20094b9d32bd14049b323d7d8294d0&language=en-US`)
            .then(response => response.json())
            .catch(e => console.warn('error getting movie:', e))
            .then(result => setData(result));
    }, [props.location.hash]);

    // Get cast information
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.location.hash.slice(1)}/credits?api_key=8c20094b9d32bd14049b323d7d8294d0&language=en-US`)
            .then(response => response.json())
            .catch(e => console.warn('error getting credits:', e))
            .then(result => setCredits(result));
    }, [props.location.hash]);

    // Get guestID information
    useEffect(() => {
        fetch(` https://api.themoviedb.org/3/authentication/guest_session/new?api_key=8c20094b9d32bd14049b323d7d8294d0`)
            .then(response => response.json())
            .catch(e => console.warn('error getting guestID:', e))
            .then(result => setGuestID(result));
    }, [props.location.hash]);
        
    console.log('guestID', guestID.guest_session_id);

    // Sort by cast by photo availability
    if (credits) {
        credits.cast.sort((a, b) => {
            if (a.profile_path === null && b.profile_path !== 'null') {
                return 1;
            } if (a.profile_path !== 'null' && b.profile_path === null) {
                return -1;
            } else {
                return 0;
            }
        })
    }

    function addToWatchList(movieData) {
        let placeholder = [];
        // Check if localStorage is empty
        if (localStorage.getItem('watchList') != null) {
            placeholder = JSON.parse(localStorage.getItem('watchList'));
            // Check if movie is already in the watchList:
            for (const movie of placeholder) {
                if (movie.title === movieData.title) {
                    return;
                }
            }
        }
        placeholder.push(movieData);
        localStorage.setItem('watchList', JSON.stringify(placeholder));
    }

    function addRating(movieID, guestID, rating) {
        if (rating < 0.5 || rating > 10) {
            alert('Rating must be between 0.5 and 10')
        } else {
            fetch(`https://api.themoviedb.org/3/movie/${movieID}/rating?${rating}api_key=8c20094b9d32bd14049b323d7d8294d0&guest_session_id=${guestID.guest_session_id}`,
                { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=utf-8', },
                    body: JSON.stringify({ "value": rating })
                })
                .then(response => {
                    if (response.status === 401) {
                        console.warn(response.statusText)
                    }
                    return response.json();
                })
                .catch(e => console.warn('error getting guestID:', e))
                .then(result => console.log('Success:', result))
        };
    }

    return <>
        <div className="movieContainer">
            <h1>{movieData.title}</h1>
            <h2>{movieData.tagline}</h2>
            <img className="large" src={"http://image.tmdb.org/t/p/w780/" + movieData.backdrop_path} alt=""></img>
            <div className="d-flex justify-content-around">
                {movieData ?
                movieData.genres.map((x, j) => <span key={j} className="badge bg-warning text-dark m-1">{x.name}</span>):
                <p>Loading genres...</p>}
            </div>
            <div className="d-flex justify-content-around">
                <span>Release date: {moment(movieData.release_date).format("Do MMMM YYYY")}</span>
                <span>Rating: {movieData.vote_average}</span>
            </div>
            <p>{movieData.overview}</p>
            <button className="btn btn-success" onClick={() => addToWatchList(movieData)}>+ Add to watch list</button>
            <div className="ratingContainer">
                <input type="number" placeholder='Rating' min="0.5" max="10"/>
                <button className="btn btn-light" onClick={() => addRating(movieData.id, guestID, document.querySelector("input").value)}>Rate Movie</button>
            </div>
        </div>
        <div className="peopleContainer d-flex flex-wrap justify-content-center">
            {credits ?
            credits.cast.map((person, i) =>
                <div key={i} className="person-card m-2 m-lg-4 d-flex flex-column">
                    <img className="card-img-top" src={"http://image.tmdb.org/t/p/w300/" + person.profile_path} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{person.name}</h5>
                    </div>
                </div>
            ):
            <p>Loading cast...</p>}
        </div>
    </>
}