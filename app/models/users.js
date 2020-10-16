const knex = require('../knex');
const BaseQueries = require('./BaseQueries');
const UsersTable = require('./tables/users');
const OrganizationsTable = require('./tables/organizations');
const DepartmentsTable = require('./tables/departments');
const { getFields } = require('./base');
const { getObjectAllowedFields } = require('../utils/base');


const getFullByLogin = login => knex(UsersTable.TABLE)
    .select().where({ login }).first();



const SANITIZE_FIELDS = [
    UsersTable.ID,
    UsersTable.LOGIN,
    UsersTable.DATAS,
    UsersTable.ROLE,
    UsersTable.NAME,
    UsersTable.EMAIL,
    UsersTable.ORG_ID,
    UsersTable.DEPARTMENT_ID,
];

const sanitizeEntity = user => getObjectAllowedFields(user, getFields(SANITIZE_FIELDS));

const getSanitizedById = id => knex(UsersTable.TABLE)
    .select(SANITIZE_FIELDS).where({ id }).first();

////////////////////////////////////////////////////////////////////////////////

class UsersQueries extends BaseQueries {
    static get TABLE() { return UsersTable.TABLE; }
    static get ID() { return UsersTable.ID; }

    static createQueryWithJoins() {
        return this.createQuery()
            .leftJoin(OrganizationsTable.TABLE, OrganizationsTable.ID, UsersTable.ORG_ID)
            .leftJoin(DepartmentsTable.TABLE, DepartmentsTable.ID, UsersTable.DEPARTMENT_ID);
    }

    static selectFromQuery(query) {
        return query.select(SANITIZE_FIELDS);
    }

    static selectFromQueryWithJoins(query) {
        return query.select({
            id: UsersTable.ID,
            login: UsersTable.LOGIN,
            name: UsersTable.NAME,
            email: UsersTable.EMAIL,

            orgId: UsersTable.ORG_ID,
            orgName: OrganizationsTable.NAME,

            departmentId: UsersTable.DEPARTMENT_ID,
            departmentName: DepartmentsTable.NAME,
        });
    }

    static mapItems(items) {
        return items.map(_item => {
            const item = getObjectAllowedFields(_item, [ 'id', 'login', 'name', 'email' ]);

            return Object.assign(item, {
                _org: {
                    id: _item.orgId,
                    name: _item.orgName,
                },

                _department: {
                    id: _item.departmentId,
                    name: _item.departmentName,
                },
            });
        });
    }


    static patchQueryWithFilters(query, params) {
        const { role, orgId, depId, ids } = params;

        if (role) {
            query.where(UsersTable.ROLE, role);
        }
        if (orgId) {
            query.where(UsersTable.ORG_ID, orgId);
        }
        if (depId) {
            query.where(UsersTable.DEPARTMENT_ID, depId);
        }
        if (ids) {
            query.whereIn(UsersTable.ID, ids);
        }

        return query;
    }

    static patchQueryWithSearch(query, params) {
        const { search } = params;
        if (!search) return query;

        query.where(queryBuilder => {
            super.patchQueryWithSearch(queryBuilder, params);

            queryBuilder.orWhere(UsersTable.LOGIN, 'ilike', `%${search}%`);
            queryBuilder.orWhere(UsersTable.NAME, 'ilike', `%${search}%`);
            queryBuilder.orWhere(UsersTable.EMAIL, 'ilike', `%${search}%`);
        });

        return query;
    }
}

////////////////////////////////////////////////////////////////////////////////

const createItem = (data, role) => knex(UsersTable.TABLE).insert({ ...data, role });

const getItem = (id, role) => knex(UsersTable.TABLE).select(SANITIZE_FIELDS).where({ id, role }).first();

const updateItem = (id, data, role) => knex(UsersTable.TABLE).where({ id, role }).update(data);

const dropItem = (id, role) => knex(UsersTable.TABLE).where({ id, role }).del();

////////////////////////////////////////////////////////////////////////////////

const getList = (params) => {
    if (params.sortBy === 'organization') {
        params.sortBy = UsersTable.ORG_ID;
    }
    if (params.sortBy === 'department') {
        params.sortBy = UsersTable.DEPARTMENT_ID;
    }

    return UsersQueries.getList(params);
};

const getShortItems = (params) => UsersQueries.getShortItems(params);


module.exports = {
    getFullByLogin,
    sanitizeEntity,
    getSanitizedById,

    createItem,
    getItem,
    updateItem,
    dropItem,

    getList,
    getShortItems,
};
