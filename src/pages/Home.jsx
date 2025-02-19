import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);  // ✅ Always initialized as an array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        console.log("Popular Movies API Response:", popularMovies); // Debugging
  
        if (!Array.isArray(popularMovies)) {
          console.error("Invalid API Response: ", popularMovies); // More Debugging
          throw new Error("API did not return an array");
        }
  
        setMovies(popularMovies);
      } catch (err) {
        console.error("API Error:", err);
        setMovies([]);  // ✅ Ensuring movies is always an array
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
  
    loadPopularMovies();
  }, []);
  

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      console.log("Search Results:", searchResults);  // Debugging

      if (!Array.isArray(searchResults)) {
        throw new Error("Search API did not return an array");
      }

      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.error("Search Error:", err);
      setMovies([]);  // ✅ Ensuring movies is always an array
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <div>No movies found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
