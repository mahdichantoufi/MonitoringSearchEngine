const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const { schema } = require('./Documents.schema.json');

class Documents extends Model {
  static get tableName() {
    return tableNames.Documents.mydBName;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Documents;
