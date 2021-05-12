/* eslint-disable indent */
const express = require('express');

const QueryBuilder = require('../../lib/SearchQueryBuilderFunctions');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    if (req.body === {} || req.body.length === 0) return next();
    const query = await QueryBuilder.requestFormatter(req.body.Data);
    const response = await QueryBuilder.searchdBInAllLanguages(query, req.body.Language);
    if (response && response.length > 0) return res.json(response);
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
