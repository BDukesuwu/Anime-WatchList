const express = require('express');
const router = express.Router();
const vactorsCtrl = require('../controllers/vactors');

router.get('/vactors/new', vactorsCtrl.new);
router.post('/vactors', vactorsCtrl.create);

// http://localhost:3000/animes/6305155d63b7f5eefbf7b696/vactors
router.post('/animes/:id/vactors', vactorsCtrl.addToCast);

module.exports = router;