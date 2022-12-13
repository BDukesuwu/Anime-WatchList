const express = require('express');
const router = express.Router();
const watchlistCTRL = require('../controllers/watchlist');
const isLoggedIn = require('../config/auth');

router.get('/watchlist/index', isLoggedIn, watchlistCTRL.index);
router.get('/watchlist/form', isLoggedIn, watchlistCTRL.new);

module.exports = router;