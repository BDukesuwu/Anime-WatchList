const Anime = require('../models/anime');

// go to watchlist index page
function index(req, res) {
  Anime.find({}, function(err, animes) {
    res.render('watchlist/index', { title: 'Your Watchlist(work in progress)', animes });
  });
}

//go to watchlist new form
function newWatch(req, res) {
  res.render('watchlist/form', { title: 'Add Watched Anime' });
}

// add the selected anime to a watchlist array by the user
function add(req, res) {
  Anime.find({}, function(err, animes) {
    res.render('watchlist/index', { title: 'Your Watchlist(work in progress)', animes });
  });
}



module.exports = {
  index,
  new: newWatch,
  add,
};