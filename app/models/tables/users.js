const BaseTable = require('./BaseTable');


class UsersTable extends BaseTable {
    static get TABLE() { return 'users' }

    static get ID() { return this.column('id') }
    static get LOGIN() { return this.column('login') }
    static get DATAS() { return this.column('datas') }
    static get ROLE() { return this.column('role') }

    static get ORG_ID() { return this.column('org_id') }
    static get DEPARTMENT_ID() { return this.column('department_id') }

    static get NAME() { return this.column('name') }
    static get EMAIL() { return this.column('email') }
}


module.exports = UsersTable;