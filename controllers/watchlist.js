const Anime = require('../models/anime');

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

// add the selected anime to a watchlist array by the user
function add(req, res) {
  Anime.findById(req.params.id, function(error, anime){ // find the anime the user is trying to add to watchlist
    anime.cast.push(req.body.watchStatus); //
    anime.save(function(error){
      res.redirect(`/animes/${anime._id}`);
    });
  });
}

//to show the anime on the watchlist index page
// function show(req, res) {
//   // Find the cast that belongs to the anime
//   Anime.findById(req.params.id) // the show function will find the anime's id in the database
//     .populate('cast').exec(function(err, anime) { //find the cast attached to that anime
//       Vactor.find(
//         {_id: {$nin: anime.cast}},
//         function(err, vactors) {
//             res.render('animes/show',{
//               title : 'Anime Details', // this is H1 tag
//               anime, // this will have all the voice actors in the anime
//               vactors // this will have all the voice actors even if they arent in the anime
//             });
//         }
//       );
//     });
// }


module.exports = {
  index,
  new: newWatch,
  add,
};