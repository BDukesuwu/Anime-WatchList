const req = require('express/lib/request');
const res = require('express/lib/response');
const Anime = require('../models/anime');

function create(req, res) {
  // Find the anime to embed the review within
  Anime.findById(req.params.id, function(err, anime) {

    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    // Push the subdoc for the review
    anime.reviews.push(req.body);
    // Always save the top-level document (not subdocs)
    anime.save(function(err) {
      res.redirect(`/animes/${anime._id}`);
    });
  });
}

//need a function for editing a review, but the user must be
//logged in and can't edit a review not posted by them
function editReview(req,res) {
  Anime.findOne({id:req.params.id}, function(err, reviews) {
    if (err || !anime) return res.redirect('/animes');
    res.render(`/animes/${anime._id}`, {title: "Edit Review", reviews});
  });
}



function updateReview(req, res, next) {
  Anime.findOneAndUpdate(
    {id: req.params.id},  // change the review to have the updated proterties
    req.body,
    {new: true}, //old is returned by default, return the new document instead (with the update)
  function(err, reviews) {
    if (err || !anime) return res.redirect('/animes')
    res.redirect(`/animes/${anime._id}`, reviews);
    });
}


// Include the next parameter - used for error handling in the catch
function deleteReview(req, res, next) {
  Anime.findOne({'reviews._id': req.params.id}).then(function(anime) { //find review and its id
    const reviews = anime.reviews.id(req.params.id); 
    if (!reviews.user.equals(req.user._id)) return res.redirect(`/animes/${anime._id}`); // Ensure that the review was created by the logged in user
    reviews.remove();                          // Remove the review using the remove method of the subdoc
    anime.save().then(function() {            // Save the updated anime
      res.redirect(`/animes/${anime._id}`);   // Redirect back to the anime's show view
    }).catch(function(err) {                  // Let Express display an error
      return next(err);                       // res.redirect(`/animes/${anime._id}`);
    });
  });
}


module.exports = {
  create,
  delete: deleteReview,
  edit: editReview,
  update: updateReview,
};