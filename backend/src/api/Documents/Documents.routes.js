const express = require('express');
const upload = require('express-fileupload');

const DocInsertFunctions = require('../../lib/DocumentInsertionFunction');
const Documents = require('./Documents.model');

const router = express.Router();
const fields = ['id', 'title', 'url'];

router.get('/', async (req, res, next) => {
  try {
    const documents = await Documents
      .query()
      .where('deleted_at', null);
    if (documents.length > 0) res.json(documents);
    return next();
  } catch (error) {
    return next(error);
  }
});
router.get('/id/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!parseInt(id, 10) || id > 999999999) {
      const error = new Error('Not a valid document identifier: '.concat(id));
      res.status(422);
      throw error;
    } else {
      const Document = await Documents
        .query()
        .select(fields)
        .where('id', id)
        .where('deleted_at', null)
        .first();
      if (Document) return res.json(Document);
      const error = new Error('Inexistant document identifier: '.concat(id));
      res.status(404);
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});
router.get('/title/:keywords', async (req, res, next) => {
  try {
    const { keywords } = req.params;
    const words = keywords.split(new RegExp(' ', 'g'));
    words.filter((word) => (word !== ''));
    const documents = [];
    await DocInsertFunctions.asyncForEach(words, async (keyword) => {
      let docs = [];
      docs = await Documents
        .query()
        .select(fields)
        .where('title', 'like', '%'.concat(keyword.toLowerCase()).concat('%'))
        .where('deleted_at', null);
      docs.forEach((doc) => {
        if (documents.length === 0 || documents.findIndex((d) => d.id === doc.id)) {
          documents.push(doc);
        }
      });
    });
    if (documents) return res.json(documents);
    const error = new Error('No document title has this keywords: '.concat(keywords));
    res.status(404);
    throw error;
  } catch (error) {
    return next(error);
  }
});
// TODO: Add router.add('/',() => {})

router.put('/', upload(), async (req, res, next) => {
  try {
    if (!req.files) next();
    const pdf = req.files.pdffile;
    const txt = req.files.textfile;
    let path = `${__dirname}/../../../Files/PDFs_to_insert/${pdf.name}`;
    await pdf.mv(path, (err) => {
      if (err) {
        next(err);
      } else console.log('pdf uploaded');
    });
    path = `${__dirname}/../../../Files/PDFs_to_insert/${txt.name}`;
    txt.mv(path, (err) => {
      if (err) {
        next(err);
      } else console.log('txt uploaded');
    });
    // eslint-disable-next-line global-require
    require('child_process').fork(`${__dirname}/../../lib/insertpdfs.js`);
    res.status(200).send('File uploaded successfully!');
    return true;
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
