
exports.up = async function(knex) {
    await knex.schema.createTable('departments', table => {
        table.increments('id');

        table.text('name').notNullable();

        table.integer('org_id')
            .notNullable()
            .references('id').inTable('organizations');
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('departments');
};