const Anime = require('../models/anime');

function create(req, res) {
  // Find the anime to embed the review within
  Anime.findById(req.params.id, function(err, anime) {
    if (err) {
      console.error(err);
      return res.redirect('/animes');
    }

    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    // Push the subdoc for the review
    anime.reviews.push(req.body);
    
    // Always save the top-level document (not subdocs)
    anime.save(function(err) {
      if (err) {
        console.error(err);
        return res.redirect(`/animes/${anime._id}`);
      }
      res.redirect(`/animes/${anime._id}`);
    });
  });
}

// Function for editing a review
function editReview(req, res) {
  Anime.findById(req.params.animeId, function(err, anime) {
    if (err || !anime) return res.redirect('/animes');
    
    const review = anime.reviews.id(req.params.id);
    res.render('editReview', { title: "Edit Review", anime, review });
  });
}

function updateReview(req, res, next) {
  Anime.findOneAndUpdate(
    { 'reviews._id': req.params.id }, // Match the review ID
    { $set: req.body },                // Update the review fields
    { new: true },                     // Return the updated document
    function(err, anime) {
      if (err || !anime) {
        console.log('Error or anime not found:', err); // Log error for debugging
        return res.redirect('/animes'); // Redirect on error
      }
      res.redirect(`/animes/${anime._id}`); // Redirect to updated anime page
    }
  );
}

function deleteReview(req, res, next) {
  Anime.findOne({ 'reviews._id': req.params.id }).then(function(anime) { // Find review by its ID
    const review = anime.reviews.id(req.params.id); 
    if (!review.user.equals(req.user._id)) return res.redirect(`/animes/${anime._id}`); // Ensure the review was created by the logged-in user
    review.remove();                          // Remove the review
    anime.save().then(function() {            // Save the updated anime
      res.redirect(`/animes/${anime._id}`);   // Redirect back to the anime's show view
    }).catch(function(err) {                  // Handle errors
      return next(err);
    });
  });
}

// Export all functions from this controller
module.exports = {
  create,
  delete: deleteReview,
  edit: editReview,
  update: updateReview,
};