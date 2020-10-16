const BaseTable = require('./BaseTable');


class UserGroupsTable extends BaseTable {
    static get TABLE() { return 'user_groups' }

    static get ID() { return this.column('id') }
    static get NAME() { return this.column('name') }

    static get ORG_ID() { return this.column('org_id') }
    static get OWNER_ID() { return this.column('owner_id') }
}


module.exports = UserGroupsTable;
