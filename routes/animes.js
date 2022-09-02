const express = require('express');
const router = express.Router();
const animesCtrl = require('../controllers/animes');
const isLoggedIn = require('../config/auth');

router.get('/', animesCtrl.index);
router.get('/new', isLoggedIn, animesCtrl.new);
router.get('/:id', animesCtrl.show);
router.post('/', isLoggedIn, animesCtrl.create);

router.get('/watchlist/new', isLoggedIn, animesCtrl.new); //will look just liike the anime screen but with
//only checked anime from the user


module.exports = router;
