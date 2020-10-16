const BaseTable = require('./BaseTable');


class OrganizationsTable extends BaseTable {
    static get TABLE() { return 'organizations' }

    static get ID() { return this.column('id') }
    static get NAME() { return this.column('name') }
}


module.exports = OrganizationsTable;
