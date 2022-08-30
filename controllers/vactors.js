const vactor = require('../models/vactor');
const anime = require('../models/anime');


function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  vactor.create(req.body, function (err, vactor) {
    res.redirect('/vactors/new');
  });
}

function newvactor(req, res) {
  vactor.find({}, function (err, vactors) {
    res.render('vactors/new', {
      title: 'Add vactor', // this is the H1 tag, or the page title 
      vactors
    });
  })
}

function addToCast(req, res){
  anime.findById(req.params.id, function(error, anime){
    anime.cast.push(req.body.vactorId);
    anime.save(function(error){
      res.redirect(`/animes/${anime._id}`);
    });
  });
}


module.exports = {
  new: newvactor,
  create,
  addToCast
};