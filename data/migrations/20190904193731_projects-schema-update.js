
exports.up = function(knex) {
	return knex.schema
	.createTable('projects', tbl => {
		tbl.increments();
		// creates a text field called name which is both required and unique
		tbl.text('name', 128).notNullable();
		tbl.text('description');
		tbl.boolean('completed').notNullable();
	})
	// we can chain together createTable
	.createTable('tasks', tbl => {
		tbl.increments();
		tbl.text('description').notNullable();
		tbl.text('notes')
		tbl.boolean('completed').notNullable();
		tbl.integer('project_id')
			// forces integer to be positive
			.unsigned()
			.notNullable()
			.references('id')
			// this table must exist already
			.inTable('projects')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
	})
	.createTable('resources', tbl => {
		tbl.increments();
		tbl.text('name', 128).unique().notNullable();
		tbl.text('description')
	})
	.createTable('project_resources', tbl => {
		tbl.integer('project_id')
			.unsigned()
			.notNullable()
			.references('id')
			// this table must exist already
			.inTable('projects')
		tbl.integer('resource_id')
			.unsigned()
			.notNullable()
			.references('id')
			// this table must exist already
			.inTable('resources')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
	
		// the combination of the two keys becomes our primary key
		// will enforce unique combinations of ids
		tbl.primary(['project_id', 'resource_id']);
	});
};

exports.down = function(knex, Promise) {
  // drop in the opposite order
	return knex.schema
		.dropTableIfExists('project_resources')
		.dropTableIfExists('resources')
		.dropTableIfExists('tasks')
    .dropTableIfExists('projects')
};
