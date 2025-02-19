const API_KEY = "18ae494a7ba07b0fa635cfa4c1a8f9f1";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
        console.log("Popular Movies API Response:", data); // Debugging

        if (!Array.isArray(data.results)) {
            throw new Error("API did not return an array");
        }

        return data.results;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return []; // ✅ Return an empty array to prevent crashes
    }
};

export const searchMovies = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        console.log("Search API Response:", data); // Debugging

        if (!Array.isArray(data.results)) {
            throw new Error("Search API did not return an array");
        }

        return data.results;
    } catch (error) {
        console.error("Error searching movies:", error);
        return []; // ✅ Return an empty array to prevent crashes
    }
};
