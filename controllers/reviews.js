const anime = require('../models/anime');

function create(req, res) {
  // Find the anime to embed the review within
  anime.findById(req.params.id, function(err, anime) {

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


// Include the next parameter - used for error handling in the catch
function deleteReview(req, res, next) {
  anime.findOne({'reviews._id': req.params.id}).then(function(anime) { //find review and its id
    const review = anime.reviews.id(req.params.id); 
    if (!review.user.equals(req.user._id)) return res.redirect(`/animes/${anime._id}`); // Ensure that the review was created by the logged in user
    review.remove();                          // Remove the review using the remove method of the subdoc
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
};