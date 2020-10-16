const BaseTable = require('./BaseTable');


class TestGroupUsersTable extends BaseTable {
    static get TABLE() { return 'user_group_users' }

    static get USER_GROUP_ID() { return this.column('user_group_id') }
    static get USER_ID() { return this.column('user_id') }
}


module.exports = TestGroupUsersTable;
