
const TABLE = 'user_group_users';

exports.up = async function(knex) {
    await knex.schema.createTable(TABLE, table => {
        table.integer('user_group_id')
            .notNullable()
            .references('id').inTable('user_groups');

        table.integer('user_id')
            .notNullable()
            .references('id').inTable('users');
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable(TABLE);
};
