const Anime = require('../models/anime'); // Import the Anime model to interact with the anime data

// Function to create a new review
function create(req, res) {
  // Find the anime by its ID to embed the review within it
  Anime.findById(req.params.id, function(err, anime) {
    if (err) {
      console.error(err); // Log any errors that occur
      return res.redirect('/animes'); // Redirect to the anime list if there's an error
    }

    // Add user info to the new review
    req.body.user = req.user._id; // Store the user's ID
    req.body.userName = req.user.name; // Store the user's name
    req.body.userAvatar = req.user.avatar; // Store the user's avatar

    // Push the new review into the anime's reviews array
    anime.reviews.push(req.body);
    
    // Save the updated anime document
    anime.save(function(err) {
      if (err) {
        console.error(err); // Log any errors during save
        return res.redirect(`/animes/${anime._id}`); // Redirect to the anime's page if there's an error
      }
      res.redirect(`/animes/${anime._id}`); // Redirect to the updated anime's page
    });
  });
}

// Function for rendering the edit review form
function editReview(req, res) {
  // Find the anime by its ID
  Anime.findById(req.params.animeId, function(err, anime) {
    if (err || !anime) return res.redirect('/animes'); // Redirect if there's an error or anime not found
    const review = anime.reviews.id(req.params.id); // Get the specific review to edit
    res.render('editReview', { title: "Edit Review", anime, review }); // Render the edit form with anime and review data
  });
}

// Function to update a review in the database
function updateReview(req, res, next) {
  // Find the anime and update the review by its ID
  console.log('Updating review:', req.params.id); // Log the review ID being updated
  
  Anime.findOneAndUpdate(
    { 'reviews._id': req.params.id }, // Match the review ID
    { $set: { 'reviews.$.content': req.body.content, 'reviews.$.rating': req.body.rating } }, // Update content and rating
    { new: true },                     // Return the updated document
    function(err, anime) {
      if (err || !anime) {
        console.log('Error or anime not found:', err); // Log error if something goes wrong
        return res.redirect('/animes'); // Redirect to anime list if there's an error
      }
      console.log('Review updated for anime:', anime._id); // Log successful update

      res.redirect(`/animes/${anime._id}`); // Redirect to the updated anime's page
    }
  );
}

// Function to delete a review
function deleteReview(req, res, next) {
  // Find the anime and its review by review ID
  Anime.findOne({ 'reviews._id': req.params.id }).then(function(anime) {
    const review = anime.reviews.id(req.params.id); // Get the specific review
    if (!review.user.equals(req.user._id)) return res.redirect(`/animes/${anime._id}`); // Ensure the review was created by the logged-in user
    review.remove(); // Remove the review from the anime
    anime.save().then(function() { // Save the updated anime document
      res.redirect(`/animes/${anime._id}`); // Redirect back to the anime's page
    }).catch(function(err) {
      return next(err); // Handle any errors during save
    });
  });
}

// Export all functions from this controller
module.exports = {
  create, // Export the create function
  delete: deleteReview, // Export the delete function
  edit: editReview, // Export the edit function
  update: updateReview, // Export the update function
};