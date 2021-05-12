const tableNames = require('../../src/constants/tableNames');
const DocInsertFunctions = require('../../src/lib/DocumentInsertionFunction');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.Documents.mydBName).del();
  await knex(tableNames.Words.mydBName).del();
  await knex(tableNames.DocumentsWordsRelations.mydBName).del();

  let fileName = 'Daddy-changes-for-kraft-paper';
  await DocInsertFunctions.insertDocumentIntoDB(knex, fileName);
};
