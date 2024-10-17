const Anime = require('../models/anime');
const Vactor = require('../models/vactor');
const animeApi = require('../services/animeApi'); // Import the anime API service

function index(req, res) {
  Anime.find({}, function(err, animes) {
    res.render('animes/index', { title: 'All Anime', animes });
  });
}

// Function to fetch and display the anime list from the API
async function index(req, res) {
  try {
      const animeList = await animeApi.fetchAnimeList(); // Fetch anime list from API
      res.render('animes/index', { title: 'Anime List', animeList }); // Render the anime list view
  } catch (error) {
      console.error('Error fetching anime list:', error); // Log errors
      res.redirect('/error'); // Redirect to an error page
  }
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

//create a new anime
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
  create,
};