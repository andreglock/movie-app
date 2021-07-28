import './App.scss';
import logo from './img/TMDBlogo.svg';
import { Switch, Route, Redirect } from 'react-router-dom';
import MovieList from './components/MovieList';
import Navigation from './components/Navigation';
import Search from './components/Search';
import MoviePage from './components/MoviePage';
import WatchList from './components/WatchList';


function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path='/Latest' component={MovieList} />
        <Route path='/Search' component={Search} />
        <Route path='/MoviePage' component={MoviePage} />
        <Route path='/watchList' component={WatchList} />
        <Route path='*'>
          <Redirect to="/Latest" />
        </Route>
      </Switch>
      <footer>
        <div>
        <p>Powered by:</p><img src={logo} alt="logo"/>
        </div>
      <div><p>Favicon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p></div>
      </footer>
    </div>
  );
}

export default App;
