const BaseQueries = require('./BaseQueries');
const DepartmentsTable = require('./tables/departments');
const OrganizationsTable = require('./tables/organizations');
const { getObjectAllowedFields } = require('../utils/base');


class DepartmentsQueries extends BaseQueries {
    static get TABLE() { return DepartmentsTable.TABLE; }
    static get ID() { return DepartmentsTable.ID; }

    static createQueryWithJoins() {
        return this.createQuery()
            .leftJoin(OrganizationsTable.TABLE, OrganizationsTable.ID, DepartmentsTable.ORG_ID);
    }

    static selectFromQueryWithJoins(query) {
        return query.select({
            id: DepartmentsTable.ID,

            orgId: DepartmentsTable.ORG_ID,
            orgName: OrganizationsTable.NAME,

            name: DepartmentsTable.NAME,
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
            });
        });
    }


    static patchQueryWithFilters(query, params) {
        const { orgId } = params;

        if (orgId) {
            query.where(DepartmentsTable.ORG_ID, orgId);
        }

        return query;
    }

    static patchQueryWithSearch(query, params) {
        const { search } = params;
        if (!search) return query;

        query.where(queryBuilder => {
            super.patchQueryWithSearch(queryBuilder, params);

            queryBuilder.orWhere(DepartmentsTable.NAME, 'ilike', `%${search}%`);
        });

        return query;
    }
}

////////////////////////////////////////////////////////////////////////////////

const createItem = data => DepartmentsQueries.createItem(data);

const getItem = id => DepartmentsQueries.getItem(id);

const updateItem = (id, data) => DepartmentsQueries.updateItem(id, data);

const dropItem = id => DepartmentsQueries.dropItem(id);

////////////////////////////////////////////////////////////////////////////////

const getList = (params) => {
    if (params.sortBy === 'organization') {
        params.sortBy = DepartmentsTable.ORG_ID;
    }

    return DepartmentsQueries.getList(params);
};

const getShortItems = (params) => DepartmentsQueries.getShortItems(params);


module.exports = {
    createItem,
    getItem,
    updateItem,
    dropItem,

    getList,
    getShortItems
};
