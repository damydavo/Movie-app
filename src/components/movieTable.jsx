import Like from '../common/like';


const MovieTable = ({ movies, onDelete, onLike }) => {

    return ( 
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
            <td><Like liked= { movie.like } onClick = { () => onLike(movie) } /></td>

            <th>
                <button onClick= {() => onDelete(movie) } className="btn btn-danger btn-sm">Delete</button>
            </th>

        </tr>
            
        )}
        </tbody>
        </table>
     );
}
 
export default MovieTable;