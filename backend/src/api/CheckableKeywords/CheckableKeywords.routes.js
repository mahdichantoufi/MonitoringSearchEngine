const express = require('express');

const CheckableKeywords = require('./CheckableKeywords.model');

const router = express.Router();
const fields = ['id', 'keyword', 'Category_id'];

router.get('/', async (req, res) => {
  const categories = await CheckableKeywords
    .query()
    .select(fields)
    .where('deleted_at', null)
    .orderBy('keyword');
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
      const CKeyword = await CheckableKeywords
        .query()
        .select(fields)
        .where('id', id)
        .where('deleted_at', null)
        .first();
      if (CKeyword) return res.json(CKeyword);
      const error = new Error('Inexistant category identifier: '.concat(id));
      res.status(404);
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});
router.get('/keyword/:keyword', async (req, res, next) => {
  try {
    let { keyword } = req.params;
    keyword = keyword.toLowerCase();
    const Ckeyword = await CheckableKeywords
      .query()
      .select(fields)
      .where({ keyword })
      .where('deleted_at', null)
      .first();
    if (Ckeyword) return res.json(Ckeyword);
    return next();
  } catch (error) {
    return next(error);
  }
});
router.get('/categoryId/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!parseInt(id, 10) || id > 999999999) {
      const error = new Error('Not a valid category identifier: '.concat(id));
      res.status(422);
      throw error;
    } else {
      const category = await CheckableKeywords
        .query()
        .select(fields)
        .where('Category_id', id)
        .where('deleted_at', null)
        .orderBy('keyword');
      if (category.length > 0) return res.json(category);
      const error = new Error('No Keywords are attached to the category identifier: '.concat(id));
      res.status(404);
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

router.post('/add/', async (req, res, next) => {
  try {
    const toInsert = req.body;
    toInsert.keyword = toInsert.keyword.toLowerCase();
    if (toInsert.id > 999999999) {
      const error = new Error('Inexistant keyword identifier: '.concat(toInsert.id));
      res.status(404);
      throw error;
    } else if (toInsert.id) {
      const keyword = await CheckableKeywords
        .query()
        .where({
          id: toInsert.id,
        })
        .update({
          deleted_at: null,
          Category_id: toInsert.Category_id,
          keyword: toInsert.keyword,
        })
        .returning(fields)
        .first();
      if (keyword) return res.json(keyword);
    } else {
      let keyword = await CheckableKeywords
        .query()
        .where(toInsert)
        .update({
          deleted_at: null,
        })
        .returning(fields)
        .first();
      if (keyword) return res.json(keyword);
      keyword = await CheckableKeywords
        .query()
        .where({
          keyword: toInsert.keyword,
        })
        .update({
          deleted_at: null,
          Category_id: toInsert.Category_id,
        })
        .returning(fields)
        .first();
      if (keyword) return res.json(keyword);
      keyword = await CheckableKeywords
        .query()
        .insert(toInsert)
        .returning(fields)
        .first();
      if (keyword) return res.json(keyword);
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
      const deletedRow = await CheckableKeywords
        .query()
        .where('id', id)
        .where('deleted_at', null)
        .update({ deleted_at: new Date().toISOString() });
      if (deletedRow) {
        res.status(200);
        return res.json({ deletedRowsNb: deletedRow });
      }
      const error = new Error('Inexistant keyword or deleted. ID: '.concat(id));
      res.status(404);
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
