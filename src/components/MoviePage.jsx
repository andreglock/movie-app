import { useState, useEffect } from 'react';
import moment from "moment";

export default function MoviePage(props) {

    const [movieData, setData] = useState(false);
    const [credits, setCredits] = useState(false);

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