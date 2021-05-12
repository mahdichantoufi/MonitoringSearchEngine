const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const { schema } = require('./CheckKeywordCategories.schema.json');

class CheckKeywordCategories extends Model {
  static get tableName() {
    return tableNames.CheckableKeywordsCategories.mydBName;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = CheckKeywordCategories;
