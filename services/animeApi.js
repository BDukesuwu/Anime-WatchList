const axios = require('axios'); // I import the Axios library, which I will use to make HTTP requests.

const BASE_URL = 'https://myanimelist.p.rapidapi.com'; // This is the base URL for the MyAnimeList API.
const API_KEY = process.env.RAPIDAPI_KEY; // I store my RapidAPI key from the environment variables for security.

// Function to fetch the anime list
async function fetchAnimeList() {
    try {
        // I make a GET request to the anime endpoint using Axios and wait for the response.
        const response = await axios.get(`${BASE_URL}/anime`, {
            headers: { // I set the headers required for the API request.
                'X-RapidAPI-Key': API_KEY, // This is my API key for authentication.
                'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com' // This specifies the host for the API.
            }
        });
        return response.data; // I return the list of anime received from the API.
    } catch (error) {
        // If there is an error during the API request, I log the error message to the console.
        console.error('Error fetching anime list:', error);
        throw error; // I rethrow the error so it can be handled by the calling function.
    }
}

// Function to search for anime
async function searchAnime(query) {
    try {
        // I make a GET request to the search endpoint with the user's query.
        const response = await axios.get(`${BASE_URL}/search/anime`, {
            params: { q: query }, // I pass the search query as a parameter.
            headers: { // I set the headers required for the API request.
                'X-RapidAPI-Key': API_KEY, // This is my API key for authentication.
                'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com' // This specifies the host for the API.
            }
        });
        return response.data; // I return the search results received from the API.
    } catch (error) {
        // If there is an error during the API request, I log the error message to the console.
        console.error('Error searching anime:', error);
        throw error; // I rethrow the error so it can be handled by the calling function.
    }
}

// I export both functions so I can use them in other parts of my application.
module.exports = {
    fetchAnimeList,
    searchAnime,
};