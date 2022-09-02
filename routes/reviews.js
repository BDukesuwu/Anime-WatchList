const express = require('express');
const router = express.Router();

const reviewsCtrl = require('../controllers/reviews');


// http://localhost:3000/animes/123/reviews
router.post("/animes/:id/reviews", reviewsCtrl.create);

// https://localhost:3000/animes/reviews/123
router.delete('/reviews/:id', reviewsCtrl.delete);

router.get('/:id/review/update', reviewsCtrl.update)
router.put('/:id/review/edit', reviewsCtrl.edit)

module.exports = router;