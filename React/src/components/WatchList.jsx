import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import moment from "moment";

export default function WatchList() {
    
    const [data, setData] = useState(false);
    const [emptyList, setListStatus] = useState(true);
    const [dataLength, setLength] = useState(false);

    const currentStorage = JSON.parse(localStorage.getItem('watchList'));
    

    // Get movies from local storage
    useEffect(() => {
        // check if localStorage was used:
        if (localStorage.getItem('watchList')) {
            setData(JSON.parse(localStorage.getItem('watchList')));
            setListStatus(false);
        }
    }, []);

    useEffect(() => {
        setData(currentStorage);
    }, [dataLength]);

    function removeFromWatchList(item) {
        const classes = item.className.split(" ")
        currentStorage.splice(classes[0], 1);
        // check if localStorage was cleared:
        if (currentStorage.length === 0) {
            setListStatus(true);
        }
        localStorage.setItem('watchList', JSON.stringify(currentStorage));
        setLength(currentStorage.length);
    }

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {emptyList ?
            <p>Your watch list is empty.</p> :
            data ?
            data.map((item, i) => <div className="m-2 m-lg-4">
            <div key={i} className="card"><NavLink to={{
                pathname:'/MoviePage',
                hash: `${data[i].id}`,
                state: {id: data[i].id}  
              }}>
                <img className="card-img-top" src={"http://image.tmdb.org/t/p/w300/" + item.poster_path} alt="" />
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    { item.genres.map((x, j) => {
                        return <span key={j} className="badge bg-warning text-dark m-1">{x.name}</span>
                    })}
                    <div className="d-flex justify-content-around">
                        <span>{moment(item.release_date).format("Do MMM YYYY")}</span>
                        <span>Rating: {item.vote_average}</span>
                    </div>
                </div>
            </NavLink></div>
            <button className={i + " btn btn-danger"} onClick={(e) => removeFromWatchList(e.target)}>Remove from watch list</button>
            </div>):
            <div>Loading...</div>}
        </div>
    )
}