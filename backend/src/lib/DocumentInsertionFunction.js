const fs = require('fs').promises;
const ArrayList = require('arraylist');

const tableNames = require('../constants/tableNames');
const paths = require('../constants/documentsBaseURL');
const separators = require('../constants/separators');

async function readTextFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
    return null;
  }
}
async function getFileWords(TXTfileUrl) {
  const document = await readTextFile(TXTfileUrl);
  if (document !== null) {
    // text to words
    const words = document.split(new RegExp(separators.join('|'), 'g'));

    const insertedWords = new ArrayList();
    words.filter((word) => (word !== ''))
      .forEach(async (word) => {
        insertedWords.add({ word: word.toLowerCase(), id: 0 });
      });
    return insertedWords;
  }
  return null;
}
async function getWordId(knex, word) {
  const ids = await knex(tableNames.Words.mydBName)
    .where('word', word)
    .select('id').first();
  if (ids === undefined) {
    const res = await knex(tableNames.Words.mydBName)
      .insert({ word })
      .returning('id');
    return res[0];
  }
  return ids.id;
}
async function asyncForEach(array, callback) {
  if (array && array.length > 0) {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array);
    }
  }
}
// adds dB ids to each word (inserts it if not present)
async function getWordsWithId(knex, words) {
  await asyncForEach(words, async (w) => {
    w.id = await getWordId(knex, w.word);
  });
}
async function moveFilestoFinalLocation(fileName) {
  const PDFfileUrl = `${paths.UntreatedPDFURL + fileName}.pdf`;
  const PDFfilefinalUrl = `${paths.TreatedPDFURL + fileName}.pdf`;
  const TXTfileUrl = `${paths.UntreatedTEXTURL + fileName}.txt`;
  const TXTfilefinalUrl = `${paths.TreatedTEXTURL + fileName}.txt`;
  await fs.rename(PDFfileUrl, PDFfilefinalUrl);
  await fs.rename(TXTfileUrl, TXTfilefinalUrl);
}
async function insertDocumentIntoDB(knex, fileName) {
  const PDFfilefinalUrl = `${paths.TreatedPDFURL + fileName}.pdf`;
  const TXTfileUrl = `${paths.UntreatedTEXTURL + fileName}.txt`;
  const docWords = await getFileWords(TXTfileUrl);
  if (docWords !== null) {
    const [docId] = await knex(tableNames.Documents.mydBName).insert([
      { title: fileName.toLowerCase(), url: PDFfilefinalUrl },
    ]).returning('id');
    await getWordsWithId(knex, docWords);
    let word = '';
    let nextLineId = 0;
    for (let i = docWords.length - 1; i >= 0; i -= 1) {
      word = docWords.last();
      // eslint-disable-next-line no-await-in-loop
      [nextLineId] = await knex(tableNames.DocumentsWordsRelations.mydBName)
        .insert([{ document_id: docId, word_id: word.id, next_id: nextLineId }])
        .returning('id');
      docWords.removeElement(word);
    }
    await moveFilestoFinalLocation(fileName);
  } else {
    console.error(`Error while reading document ${fileName}`);
  }
}

module.exports = {
  asyncForEach,
  insertDocumentIntoDB,
};
