const express = require('express');
const router = express.Router();
const watchlistCTRL = require('../controllers/watchlist');
const isLoggedIn = require('../config/auth');

router.get('/watchlist/index', isLoggedIn, watchlistCTRL.index);
router.get('/watchlist/form', isLoggedIn, watchlistCTRL.new);
router.post('/watchlist/index', isLoggedIn, watchlistCTRL.add); // when adds anime to watchlist, redirect to their watchlist

module.exports = router;