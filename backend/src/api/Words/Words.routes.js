const express = require('express');

const Words = require('./Words.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const words = await Words.query();
    if (words.length > 0) return res.json(words);
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
