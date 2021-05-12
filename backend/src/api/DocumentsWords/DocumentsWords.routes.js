const express = require('express');

const DocumentsWords = require('./DocumentsWords.model');

const router = express.Router();
const fields = ['id', 'document_id', 'word_id', 'next_id'];

router.get('/', async (req, res, next) => {
  try {
    const documentsWords = await DocumentsWords
      .query()
      .where('deleted_at', null);
    if (documentsWords.length > 0) return res.json(documentsWords);
    return next();
  } catch (error) {
    return next(error);
  }
});
router.get('/id/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!parseInt(id, 10) || id > 999999999) {
      const error = new Error('Not a valid DocumentsWords identifier: '.concat(id));
      res.status(422);
      throw error;
    } else {
      const Document = await DocumentsWords
        .query()
        .select(fields)
        .where('id', id)
        .where('deleted_at', null)
        .first();
      if (Document && Document) return res.json(Document);
      const error = new Error('Inexistant DocumentsWords identifier: '.concat(id));
      res.status(404);
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
