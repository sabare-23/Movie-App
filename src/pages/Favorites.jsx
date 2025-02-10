import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
   const { favorites } = useMovieContext();

   if (favorites) {
      return (
         <div className="favorites
            ">
            <h3>Your Favorites</h3>
            <div className="movies-grid">
               {favorites.map(
                  (movie) =>
                  (
                     <MovieCard movie={movie} key={movie.id} />
                  ))}
            </div>
         </div>
      )
   }




   return <div className="favorite-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorite and they will apper her </p>
   </div>

}

export default Favorites