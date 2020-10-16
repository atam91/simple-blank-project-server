
exports.up = async function(knex) {
    await knex.schema.table('users', function (table) {
        table.integer('org_id')
            .references('id').inTable('organizations');

        table.integer('department_id')
            .references('id').inTable('departments');

        table.text('name');
        table.text('email');
    });
};

exports.down = async function(knex) {
    await knex.schema.table('users', function (table) {
        table.dropColumn('org_id');
        table.dropColumn('name');
        table.dropColumn('email');
    });
};
