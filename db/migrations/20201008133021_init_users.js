const { hashPromisified } = require('../../app/utils/auth');


exports.up = async function(knex) {
    /// ROLES ///
    await knex.schema.createTable('roles', table => {
        table.text('name').primary();
    });

    await knex('roles').insert([
        { name: 'admin' },
        { name: 'org_admin' },
        { name: 'manager' },
        { name: 'user' },
    ]);


    /// USERS ///
    await knex.schema.createTable('users', table => {
        table.specificType('id', 'serial').primary();
        table.text('login').notNullable().unique();
        table.text('hash').notNullable();
        table.text('salt').notNullable();
        table.json('datas');
        table.text('role').unsigned().notNullable()
            .references('name').inTable('roles');
    });

    /// Create root user
    const login = 'root';
    const { hash, salt } = await hashPromisified({ password: 'qweqwe' });

    await knex('users').insert({ login, hash, salt, role: 'admin' });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('users');
    await knex.schema.dropTable('roles');
};
