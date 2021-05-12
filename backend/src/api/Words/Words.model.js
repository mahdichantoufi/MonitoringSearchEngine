const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const { schema } = require('./Words.schema.json');

class Words extends Model {
  static get tableName() {
    return tableNames.Words.mydBName;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Words;
