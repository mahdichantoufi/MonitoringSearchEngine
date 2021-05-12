/* eslint-disable prefer-const */
const translate = require('translate');
const { languages } = require('../constants/languages');
const { asyncForEach } = require('./DocumentInsertionFunction');

translate.engine = 'google';
translate.key = process.env.API_KEY;

async function translateQuery(query, originalLanguage) {
  const translatedQueries = [];
  translatedQueries.push(query);

  await asyncForEach(languages, async (lang) => {
    let translatedQuery = [];
    if (lang !== originalLanguage) {
      await asyncForEach(query, async (Qrow) => {
        let translated = await translate(Qrow.Keywords, { from: originalLanguage, to: lang });
        translatedQuery.push({
          row: Number(Qrow.row),
          rowPosition: Number(Qrow.rowPosition),
          SearchSelector: Qrow.SearchSelector,
          SearchType: Qrow.SearchType,
          Keywords: translated,
        });
      });
      translatedQueries.push(translatedQuery);
    }
  });
  return translatedQueries;
}
module.exports = {
  translateQuery,
};
