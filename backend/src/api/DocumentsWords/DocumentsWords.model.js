const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const { schema } = require('./DocumentsWords.schema.json');

class Words extends Model {
  static get tableName() {
    return tableNames.DocumentsWordsRelations.mydBName;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Words;
