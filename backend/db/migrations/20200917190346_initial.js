// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
const dBFunctions = require('../../src/lib/knexFunctions.js');

/**
 * @param {Knex} : knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.Words.mydBName, (table) => {
    table.increments().notNullable();
    table.string(tableNames.Words.word, 128).unique().notNullable();
    dBFunctions.addDefaultColumns(knex, table);
    table.index(tableNames.Words.word);
  });
  await knex.schema.createTable(tableNames.Documents.mydBName, (table) => {
    table.increments().notNullable();
    table.string(tableNames.Documents.title, 512).notNullable().unique();
    table.string(tableNames.Documents.url, 1200).notNullable().unique();
    dBFunctions.addDefaultColumns(knex, table);
  });
  await knex.schema.createTable(tableNames.DocumentsWordsRelations.mydBName, (table) => {
    table.increments().notNullable();

    dBFunctions.createReference(table, tableNames.Documents.mydBName,
      false, tableNames.DocumentsWordsRelations.document_id);
    table.index(tableNames.DocumentsWordsRelations.document_id);

    dBFunctions.createReference(table, tableNames.Words.mydBName,
      false, tableNames.DocumentsWordsRelations.word_id);
    table.index(tableNames.DocumentsWordsRelations.word_id);

    table.integer(tableNames.DocumentsWordsRelations.next_id);

    dBFunctions.addDefaultColumns(knex, table);
  });
  // await knex.schema.createTable(tableNames.DocumentsTitleWordsRelations.mydBName, (table) => {
  //   table.increments().notNullable();

  //   dBFunctions.createReference(table, tableNames.Documents.mydBName,
  //     false, tableNames.DocumentsTitleWordsRelations.document_id);
  //   table.index(tableNames.DocumentsTitleWordsRelations.document_id);

  //   dBFunctions.createReference(table, tableNames.Words.mydBName,
  //     false, tableNames.DocumentsTitleWordsRelations.word_id);
  //   table.index(tableNames.DocumentsTitleWordsRelations.word_id);

  //   dBFunctions.createReference(table, tableNames.DocumentsTitleWordsRelations.mydBName,
  //     false, tableNames.DocumentsTitleWordsRelations.next_id);
  //   dBFunctions.addDefaultColumns(knex, table);
  // });
  await knex.schema.createTable(tableNames.CheckableKeywordsCategories.mydBName, (table) => {
    table.increments().notNullable();
    table.string(tableNames.CheckableKeywordsCategories.name, 128).unique().notNullable();
    dBFunctions.addDefaultColumns(knex, table);
    table.index(tableNames.CheckableKeywordsCategories.name);
  });
  await knex.schema.createTable(tableNames.CheckableKeywords.mydBName, (table) => {
    table.increments().notNullable();
    table.string(tableNames.CheckableKeywords.keyword, 128).unique().notNullable();
    dBFunctions.createReference(table, tableNames.CheckableKeywordsCategories.mydBName,
      false, tableNames.CheckableKeywords.Category_id);
    dBFunctions.addDefaultColumns(knex, table);
    table.index(tableNames.CheckableKeywords.keyword);
  });
};

/**
 * @param {Knex} : knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(tableNames.CheckableKeywords.mydBName);
  await knex.schema.dropTable(tableNames.CheckableKeywordsCategories.mydBName);
  // await knex.schema.dropTable(tableNames.DocumentsTitleWordsRelations.mydBName);
  await knex.schema.dropTable(tableNames.DocumentsWordsRelations.mydBName);
  await knex.schema.dropTable(tableNames.Documents.mydBName);
  await knex.schema.dropTable(tableNames.Words.mydBName);
};
