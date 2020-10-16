
exports.up = async function(knex) {
    await knex.schema.createTable('sessions', table => {
        table.text('sid').primary();

        table.integer('user_id').unique()
            .notNullable()
            .references('id').inTable('users');

        table.timestamp('touched', { useTz: true, precision: 6 })
            .notNullable()
            .defaultTo( knex.fn.now() );
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('sessions');
};
