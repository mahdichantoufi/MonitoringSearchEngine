const express = require('express');

// eslint-disable-next-line no-unused-vars
const db = require('../db');
// Used by Objection.js

const CKCategories = require('./CKCategories/CheckKeywordCategories.routes');
const CheckableKeywords = require('./CheckableKeywords/CheckableKeywords.routes');
const Documents = require('./Documents/Documents.routes');
const DocumentsWords = require('./DocumentsWords/DocumentsWords.routes');
const Words = require('./Words/Words.routes');
const Search = require('./Search/Search.routes');

const router = express.Router();

router.use('/CKCategories/', CKCategories);
router.use('/CheckableKeywords/', CheckableKeywords);
router.use('/Documents/', Documents);
router.use('/DocumentsWords/', DocumentsWords);
router.use('/Words/', Words);
router.use('/Search/', Search);

module.exports = router;
