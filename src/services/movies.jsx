import React, { Component } from 'react';
import { getMovies } from './fakeMovieService';
import { getGenres } from './fakeGenreService';
import Like from './../common/like';
import Pagination from './../common/pagination';
import {Paginate} from './../utils/paginate';
import ListGroup from './../common/listGroup';


class Movies extends React.Component {
    state = {
         movies: getMovies(),
         genres: getGenres(),
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

     handleGenreSelect = genre => {
       this.setState({ selectedGenre:genre })
     }

    render() { 
        const {length:count } = this.state.movies;
        const { pageSize, currentPage, selectedGenre, movies:allMovies } = this.state;

        const filtered = selectedGenre ? allMovies.filter(m => m.genre._id === selectedGenre._id)  : allMovies;

     const movies = Paginate(filtered, currentPage, pageSize)


              if( count === 0) return 'No movies to display';        
                    return <div>
                      <div className="row">

                      
                      <div className="col-3">
                        <ListGroup 
                        items = { this.state.genres }
                        textProperty = "name"
                        valueProperty = "_id"
                        selectedItem = { this.state.selectedGenre }
                        onItemSelect = { this.handleGenreSelect }
                        
                        />
                      </div>

                      <div className="col">
                      <p>showing { filtered.length } movies in the database.</p>

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
            itemsCount={ filtered.length } 
            pageSize={ pageSize } 
            currentPage = { currentPage }
            onPageChange= { this.handlePageChange }

            />
           </div>
  
</div>
</div>
    }
}
 
export default Movies;