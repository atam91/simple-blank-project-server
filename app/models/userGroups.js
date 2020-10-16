const BaseQueries = require('./BaseQueries');
const UserGroupsTable = require('./tables/userGroups');
const OrganizationsTable = require('./tables/organizations');
const UsersTable = require('./tables/users');
const { getObjectAllowedFields } = require('../utils/base');


class UserGroupsQueries extends BaseQueries {
    static get TABLE() { return UserGroupsTable.TABLE; }
    static get ID() { return UserGroupsTable.ID; }

    static createQueryWithJoins() {
        return this.createQuery()
            .leftJoin(OrganizationsTable.TABLE, OrganizationsTable.ID, UserGroupsTable.ORG_ID)
            .leftJoin(UsersTable.TABLE, UsersTable.ID, UserGroupsTable.OWNER_ID);
    }

    static selectFromQueryWithJoins(query) {
        return query.select({
            id: UserGroupsTable.ID,
            name: UserGroupsTable.NAME,

            orgId: UserGroupsTable.ORG_ID,
            orgName: OrganizationsTable.NAME,

            ownerId: UserGroupsTable.OWNER_ID,
            ownerLogin: UsersTable.LOGIN,
            ownerName: UsersTable.NAME,
        });
    }

    static mapItems(items) {
        return items.map(_item => {
            const item = getObjectAllowedFields(_item, [ 'id', 'name' ]);

            return Object.assign(item, {
                _org: {
                    id: _item.orgId,
                    name: _item.orgName,
                },

                _owner: {
                    id: _item.ownerId,
                    login: _item.ownerLogin,
                    name: _item.ownerName,
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////

    static patchQueryWithFilters(query, params) {
        const { orgId, ownerId } = params;

        if (orgId) {
            query.where(UserGroupsTable.ORG_ID, orgId);
        }
        if (ownerId) {
            query.where(UserGroupsTable.OWNER_ID, ownerId);
        }

        return query;
    }


    static patchQueryWithSearch(query, params) {
        const { search } = params;
        if (!search) return query;

        query.where(queryBuilder => {
            super.patchQueryWithSearch(queryBuilder, params);

            queryBuilder.orWhere(UserGroupsTable.NAME, 'ilike', `%${search}%`);
        });

        return query;
    }
}

////////////////////////////////////////////////////////////////////////////////

const createItem = data => UserGroupsQueries.createItem(data);

const getItem = id => UserGroupsQueries.getItem(id);

const updateItem = (id, data) => UserGroupsQueries.updateItem(id, data);

const dropItem = id => UserGroupsQueries.dropItem(id);

////////////////////////////////////////////////////////////////////////////////

const getList = (params) => {
    if (params.sortBy === 'organization') {
        params.sortBy = UserGroupsTable.ORG_ID;
    }
    if (params.sortBy === 'owner') {
        params.sortBy = UserGroupsTable.OWNER_ID;
    }

    return UserGroupsQueries.getList(params);
};

const getShortItems = (params) => UserGroupsQueries.getShortItems(params);


module.exports = {
    createItem,
    getItem,
    updateItem,
    dropItem,

    getList,
    getShortItems
};
