import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres, genres } from '../services/fakeGenreService';
import Pagination from '../common/pagination';
import {Paginate} from '../utils/paginate';
import ListGroup from '../common/listGroup';
import MovieTable from './movieTable';


class Movies extends React.Component {
    state = {
         movies: [],
         genres: [],
         currentPage: 1,
         pageSize: 4
     }

     componentDidMount() {
      const genres = [{ name: "All Genres" }, ...getGenres()];

       this.setState({ movies: getMovies(), genres});
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

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id)  : allMovies;

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

              <MovieTable movies = { movies } onDelete = { this.handleDelete } onLike = { this.handleLike } />
           
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