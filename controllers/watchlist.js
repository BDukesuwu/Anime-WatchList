const Anime = require('../models/anime');
const weebWatching = require('../models/anime');

// go to watchlist index page
function index(req, res) {
  Anime.find({}, function(err, animes) {
    res.render('watchlist/index', { title: 'Your Watchlist', animes });
  });
}

//go to watchlist new form

function newWatch(req, res) {
  res.render('watchlist/form', { title: 'Add Watched Anime' });
}



module.exports = {
  index,
  new: newWatch,
 
};