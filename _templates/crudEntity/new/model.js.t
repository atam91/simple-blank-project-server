---
to: app/models/<%= h.changeCase.camelCase(name) %>.js
---
<%
    Table = h.changeCase.pascalCase(name) + 'Table';
    Queries = h.changeCase.pascalCase(name) + 'Queries';
%>const BaseQueries = require('./BaseQueries');
const <%= Table %> = require('./tables/<%= h.changeCase.camelCase(name) %>');


class <%= Queries %> extends BaseQueries {
    static get TABLE() { return <%= Table %>.TABLE; }
    static get ID() { return <%= Table %>.ID; }

    static patchQueryWithSearch(query, params) {
        const { search } = params;
        if (!search) return query;

        query.where(queryBuilder => {
            super.patchQueryWithSearch(queryBuilder, params);

            queryBuilder.orWhere(<%= Table %>.NAME, 'ilike', `%${search}%`);
        });

        return query;
    }
}

////////////////////////////////////////////////////////////////////////////////

const createItem = data => <%= Queries %>.createItem(data);

const getItem = id => <%= Queries %>.getItem(id);

const updateItem = (id, data) => <%= Queries %>.updateItem(id, data);

const dropItem = id => <%= Queries %>.dropItem(id);

////////////////////////////////////////////////////////////////////////////////

const getList = (params) => <%= Queries %>.getList(params);

const getShortItems = (params) => <%= Queries %>.getShortItems(params);


module.exports = {
    createItem,
    getItem,
    updateItem,
    dropItem,

    getList,
    getShortItems
};
