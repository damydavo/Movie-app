import React, { Component } from 'react';
import { getMovies } from './fakeMovieService';
import Like from './../common/like';
import Pagination from './../common/pagination';
import {Paginate} from './../utils/paginate';


class Movies extends React.Component {
    state = {
         movies: getMovies(),
         currentPage: 1,
         pageSize: 4
     }

     handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);

        this.setState({movies});

      }
 
     handleLike = (movie) => {
       const movies = [...this.state.movies];
       const index = movies.indexOf(movie);
       movies[index] = {...movies[index]};
       movies[index].like = !movies[index].like;
       this.setState({ movies });

     }

     handlePageChange = page => {
       this.setState({currentPage: page});
     }

    render() { 
        const {length:count } = this.state.movies;
        const { pageSize, currentPage, movies:allMovies } = this.state;

     const movies = Paginate(allMovies, currentPage, pageSize)


   if( count === 0) return 'No movies to display';        
         return <div>
    <p>showing { count } movies in the database.</p>

     <table className="table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Genre</th>
      <th>Stock</th>
      <th>Rate</th>
      <th></th>

    </tr>
  </thead>
  <tbody>
   { movies.map(movie => 
   
      <tr key = {movie._id}>
          <td>{ movie.title }</td>
          <td>{ movie.genre.name }</td>
          <td>{ movie.numberInStock }</td>
          <td>{ movie.dailyRentalRate }</td>
          <td><Like liked= { movie.like } onClick = { () => this.handleLike(movie) } /></td>

          <th>
              <button onClick= {() => this.handleDelete(movie) } className="btn btn-danger btn-sm">Delete</button>
          </th>

      </tr>
         
    )}
  </tbody>
</table>
<Pagination 
itemsCount={ count } 
pageSize={ pageSize } 
currentPage = { currentPage }
onPageChange= { this.handlePageChange }

/>
</div>
    }
}
 
export default Movies;