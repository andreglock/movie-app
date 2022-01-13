import { NavLink } from "react-router-dom";

export default function Navigation() {
    return <header>
        <ul>
            <li><NavLink to="Latest">Latest</NavLink></li>
            <li><NavLink to="Search">Search</NavLink></li>
            <li><NavLink to="watchList">Watch List</NavLink></li>
        </ul>
    </header>
}