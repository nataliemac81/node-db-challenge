
exports.up = function(knex, Promise) {
    // don't forget the return statement
    return knex.schema.createTable('project', tbl => {
      // creates a primary key called id
      tbl.increments();
      // creates a text field called name which is both required and unique
      tbl.text('name', 128).notNullable();
      tbl.text('description');
      tbl.boolean('completed').notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    // drops the entire table
    return knex.schema.dropTableIfExists('project');
  };