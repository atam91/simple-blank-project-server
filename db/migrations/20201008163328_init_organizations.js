
exports.up = async function(knex) {
    await knex.schema.createTable('organizations', table => {
        table.increments('id');
        table.text('name').notNullable();
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('organizations');
};