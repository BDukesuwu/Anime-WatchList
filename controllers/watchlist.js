const Anime = require('../models/anime');

function index(req, res) {
  Anime.find({}, function(err, animes) {
    res.render('watchlist/index', { title: 'Your Watchlist', animes });
  });
}

module.exports = {
  index,
};