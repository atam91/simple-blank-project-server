
const TABLE = 'user_groups';

exports.up = async function(knex) {
    await knex.schema.createTable(TABLE, table => {
        table.increments('id');
        table.text('name').notNullable();

        table.integer('org_id')
            .notNullable()
            .references('id').inTable('organizations');

        table.integer('owner_id')
            .notNullable()
            .references('id').inTable('users');
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable(TABLE);
};
