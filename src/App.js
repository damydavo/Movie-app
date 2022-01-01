import { Route, Redirect, Switch } from 'react-router-dom';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import './App.css';
import NavBar from './components/navBar';


function App() {
  return (
    <>
    <NavBar/>
    <main className="container">
      <Switch>
      <Route path="/movies" component= {Movies} />
      <Route path="/customers" component= {Customers} />
      <Route path="/rentals" component= {Rentals} />
      <Route path="/notFound" component= {NotFound} />
      <Redirect from="/" exact to="/movies" />
      <Redirect to="/not-found" />
      </Switch>
    </main>
    </>
  );
}

export default App;
