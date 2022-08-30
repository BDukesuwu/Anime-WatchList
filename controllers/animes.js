const anime = require('../models/anime');
const vactor = require('../models/vactor');

function index(req, res) {
  anime.find({}, function(err, animes) {
    res.render('animes/index', { title: 'All animes', animes });
  });
}

function show(req, res) {
  // Find the cast that belongs to the anime
  anime.findById(req.params.id)
    .populate('cast').exec(function(err, anime) {
      vactor.find(
        {_id: {$nin: anime.cast}},
        function(err, vactors) {
            res.render('animes/show',{
              title : 'Anime Detail', // this is H1 tag
              anime, // this will have all the actors
              vactors // this will the actors that not in the anime
            });
        }
      );
    });
}

function newanime(req, res) {
  res.render('animes/new', { title: 'Add Anime' });
}

function create(req, res) {
  // convert any onGoing anime checkbox of nothing or "on" to boolean
  req.body.onGoing = !!req.body.onGoing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const anime = new anime(req.body);
  anime.save(function(err) {
    if (err) return res.redirect('/animes/new');
    res.redirect(`/animes/${anime._id}`);
  });
}

module.exports = {
  index,
  show,
  new: newanime,
  create
};