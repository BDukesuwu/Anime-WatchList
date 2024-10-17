const express = require('express'); // Import express
const router = express.Router(); // Create a new router instance
const animesCtrl = require('../controllers/animes'); // Import the anime controller
const isLoggedIn = require('../config/auth'); // Import authentication middleware
const animeApi = require('../services/animeApi'); // Import the anime API service

// Route to get a list of anime from the API
router.get('/api/anime', async (req, res) => {
    try {
        const animeList = await animeApi.fetchAnimeList(); // Fetch anime list from API
        res.json(animeList); // Send the anime list as a JSON response
    } catch (error) {
        res.status(500).json({ error: 'Error fetching anime list' }); // Handle errors
    }
});

router.get('/', animesCtrl.index); // Route for listing all anime
router.get('/new', isLoggedIn, animesCtrl.new); // Route for new anime form (logged in)
router.get('/:id', animesCtrl.show); // Route to show specific anime details
router.post('/', isLoggedIn, animesCtrl.create); // Route to create new anime (logged in)

module.exports = router; // Export the router