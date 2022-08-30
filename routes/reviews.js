const express = require('express');
const router = express.Router();

const reviewCtrl = require('../controllers/reviews');

// http://localhost:3000/animes/123/reviews
router.post("/animes/:id/reviews", reviewCtrl.create);

// https://localhost:3000/animes/reviews/123
router.delete('/reviews/:id', reviewCtrl.delete);

module.exports = router;