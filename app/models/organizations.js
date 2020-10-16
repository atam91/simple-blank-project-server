const BaseQueries = require('./BaseQueries');
const OrganizationsTable = require('./tables/organizations');


class OrganizationsQueries extends BaseQueries {
    static get TABLE() { return OrganizationsTable.TABLE; }
    static get ID() { return OrganizationsTable.ID; }

    static patchQueryWithFilters(query, params) {
        const { orgId } = params;

        if (orgId) {
            query.where(OrganizationsTable.ID, orgId);
        }

        return query;
    }

    static patchQueryWithSearch(query, params) {
        const { search } = params;
        if (!search) return query;

        query.where(queryBuilder => {
            super.patchQueryWithSearch(queryBuilder, params);

            queryBuilder.orWhere(OrganizationsTable.NAME, 'ilike', `%${search}%`);
        });

        return query;
    }
}

////////////////////////////////////////////////////////////////////////////////

const createItem = data => OrganizationsQueries.createItem(data);

const getItem = id => OrganizationsQueries.getItem(id);

const updateItem = (id, data) => OrganizationsQueries.updateItem(id, data);

const dropItem = id => OrganizationsQueries.dropItem(id);

////////////////////////////////////////////////////////////////////////////////

const getList = (params) => OrganizationsQueries.getList(params);

const getShortItems = (params) => OrganizationsQueries.getShortItems(params);


module.exports = {
    createItem,
    getItem,
    updateItem,
    dropItem,

    getList,
    getShortItems
};
