const express = require('express');
const router = express.Router();
const watchlistCTRL = require('../controllers/watchlist');

router.get('/watchlist/index', watchlistCTRL.index);

module.exports = router;