const Anime = require('../models/anime');
const Vactor = require('../models/vactor');

function index(req, res) {
  Anime.find({}, function(err, animes) {
    res.render('animes/index', { title: 'All Anime', animes });
  });
}

function show(req, res) {
  // Find the cast that belongs to the anime
  Anime.findById(req.params.id) // the show function will find the anime's id in the database
    .populate('cast').exec(function(err, anime) { //find the cast attached to that anime
      Vactor.find(
        {_id: {$nin: anime.cast}},
        function(err, vactors) {
            res.render('animes/show',{
              title : 'Anime Details', // this is H1 tag
              anime, // this will have all the voice actors in the anime
              vactors // this will have all the voice actors even if they arent in the anime
            });
        }
      );
    });
}

function newAnime(req, res) {
  res.render('animes/new', { title: 'Add Anime' });
}

function create(req, res) {
  // convert any onGoing anime checkbox of nothing or "on" to boolean
  req.body.onGoing = !!req.body.onGoing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const anime = new Anime(req.body);
  anime.save(function(err) {
    if (err) return res.redirect('/animes/new');
    res.redirect(`/animes/${anime._id}`);
  });
}

module.exports = {
  index,
  show,
  new: newAnime,
  create
};