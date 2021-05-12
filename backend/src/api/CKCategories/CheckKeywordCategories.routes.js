const express = require('express');

const CheckKeywordCategories = require('./CheckKeywordCategories.model');

const router = express.Router();
const fields = ['id', 'name'];

router.get('/', async (req, res) => {
  const categories = await CheckKeywordCategories
    .query()
    .where('deleted_at', null)
    .orderBy('name');
  res.json(categories);
});
router.get('/id/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!parseInt(id, 10) || id > 999999999) {
      const error = new Error('Not a valid category identifier: '.concat(id));
      res.status(422);
      throw error;
    } else {
      const category = await CheckKeywordCategories
        .query()
        .select(fields)
        .where('id', id)
        .where('deleted_at', null)
        .first();
      if (category) return res.json(category);
      const error = new Error('Inexistant category identifier: '.concat(id));
      res.status(404);
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});
router.get('/name/:name', async (req, res, next) => {
  try {
    let { name } = req.params;
    name = name.toLowerCase();
    const category = await CheckKeywordCategories
      .query()
      .select(fields)
      .where({ name })
      .where('deleted_at', null)
      .first();
    if (category) return res.json(category);
    return next();
  } catch (error) {
    return next(error);
  }
});
router.post('/add/:name', async (req, res, next) => {
  try {
    let { name } = req.params;
    name = name.toLowerCase();
    let category = await CheckKeywordCategories
      .query()
      .where({ name })
      .update({ deleted_at: null })
      .returning(fields)
      .first();
    if (category) return res.json(category);
    category = await CheckKeywordCategories
      .query()
      .insert({ name })
      .returning(fields)
      .first();
    if (category) return res.json(category);
    return next();
  } catch (error) {
    return next(error);
  }
});
router.post('/add/', async (req, res, next) => {
  try {
    const toInsert = req.body;
    toInsert.name = toInsert.name.toLowerCase();
    if (toInsert.id > 999999999) {
      const error = new Error('Inexistant category identifier: '.concat(toInsert.id));
      res.status(404);
      throw error;
    } else if (toInsert.id) {
      const category = await CheckKeywordCategories
        .query()
        .where({
          id: toInsert.id,
        })
        .update({
          deleted_at: null,
          name: toInsert.name,
        })
        .returning(fields)
        .first();
      if (category) return res.json(category);
    } else {
      let category = await CheckKeywordCategories
        .query()
        .where(toInsert)
        .update({
          deleted_at: null,
        })
        .returning(fields)
        .first();
      if (category) return res.json(category);
      category = await CheckKeywordCategories
        .query()
        .insert(toInsert)
        .returning(fields)
        .first();
      if (category) return res.json(category);
    }

    return next();
  } catch (error) {
    return next(error);
  }
});
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!parseInt(id, 10)) {
      const error = new Error('Not a valid category identifier: '.concat(id));
      res.status(422);
      throw error;
    } else {
      const deletedRow = await CheckKeywordCategories
        .query()
        .where('id', id)
        .where('deleted_at', null)
        .update({ deleted_at: new Date().toISOString() });
      if (deletedRow) {
        res.status(200);
        return res.json({ deletedRowsNb: deletedRow });
      }
      const error = new Error('Inexistant category or deleted. ID: '.concat(id));
      res.status(404);
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
