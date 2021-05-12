/**
 * creates 3 timestamps columns for created_at, modified_at and deleted_at :
 * created_at, modified_at : defaultTo(now) && notNullable
 * deleted_at : nullable && defaultTo(null)
 * @param {Knex} knex - parameter passed by Knex module to exports.[up, down, seed] functions.
 *  Available in body to pass
 * @param {Knex.table} table - DB TABLE generated with knex.schema.createTable
 */
async function addDefaultColumns(knex, table) {
  table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  table.timestamp('modified_at').defaultTo(knex.fn.now()).notNullable();
  table.timestamp('deleted_at').defaultTo(null);
  return table;
}

/**
 * creates 1 reference column with the given parameters. more on parameters.
 * Cannot skip optional parameters preceeding the entered optional parameter. Must keep order.
 *
 * @param {Knex.table} table - DB TABLE generated with knex.schema.createTable
 * @param {string} referencedTableName - DB table name to be referenced at this column
 * @param {boolean} unique - if True, the column will be unique: Optional, Defaults to false.
 * @param {string} colname - name of the first column : Optional,
 *  Defaults to '{referencedTableName}_id'.
 */
async function createReference(table, referencedTableName, unique = false, colname = null) {
  let tableName = '';
  if (colname === null) tableName = referencedTableName.concat('_id');
  else tableName = colname;
  if (unique) {
    table.integer(tableName)
      .notNullable().unsigned()
      .references('id')
      .inTable(referencedTableName)
      .onDelete('cascade')
      .unique();
  } else {
    table.integer(tableName)
      .notNullable().unsigned()
      .references('id')
      .inTable(referencedTableName)
      .onDelete('cascade');
  }
  return table;
}

module.exports = {
  addDefaultColumns,
  createReference,
};
