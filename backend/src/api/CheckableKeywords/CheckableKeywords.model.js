const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const { schema } = require('./CheckableKeywords.schema.json');

class CheckableKeywords extends Model {
  static get tableName() {
    return tableNames.CheckableKeywords.mydBName;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = CheckableKeywords;
