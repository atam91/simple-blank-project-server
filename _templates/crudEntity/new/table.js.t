---
to: app/models/tables/<%= h.changeCase.camelCase(name) %>.js
---
const BaseTable = require('./BaseTable');


class <%= h.changeCase.pascalCase(name) %>Table extends BaseTable {
    static get TABLE() { return '<%= h.changeCase.snakeCase(name) %>' }

    static get ID() { return this.column('id') }
    static get NAME() { return this.column('name') }
}


module.exports = <%= h.changeCase.pascalCase(name) %>Table;
<%
    console.log();
    console.log('!!! Do not forget create&apply migration: `knex migrate:make init_' + h.changeCase.snakeCase(name) + '` !!!');
    console.log(`   Simpliest migration example:

exports.up = async function(knex) {
    await knex.schema.createTable('${h.changeCase.snakeCase(name)}', table => {
        table.increments('id');
        table.text('name').notNullable().unique();  /// fixme? unique?
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('${h.changeCase.snakeCase(name)}');
};

    `);
    console.log();
    console.log();
%>