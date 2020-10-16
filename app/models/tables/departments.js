const BaseTable = require('./BaseTable');


class DepartmentsTable extends BaseTable {
    static get TABLE() { return 'departments' }

    static get ID() { return this.column('id') }
    static get NAME() { return this.column('name') }
    static get ORG_ID() { return this.column('org_id') }
}


module.exports = DepartmentsTable;
