const knex = require('../knex');


class BaseQueries {
    static get TABLE() { throw new Error('You must implement abstract BaseQueries.TABLE'); }
    static get ID() { throw new Error('You must implement abstract BaseQueries.ID'); }


    static createQuery() {
        return knex(this.TABLE);
    }

    static createQueryWithJoins() {
        return this.createQuery();
    }

    static selectFromQuery(query) {
        return query.select();
    }

    static selectFromQueryWithJoins(query) {
        return query.select();
    }

    static mapItems(items) {
        return items;
    }


    static patchQueryWithFilters(query, params) {}

    static patchQueryWithSearch(query, params) {
        const { search } = params;
        if (!search) return query;

        const idSearch = parseInt(search);
        if (!Number.isNaN(idSearch)) query.where(this.ID, idSearch);

        return query;
    }

    static patchQueryWithSorting(query, params) {
        const { sortBy, desc } = params;
        if (!sortBy) return query;

        return query.orderBy(sortBy, desc ? 'desc' : 'asc');
    }


    static patchQueryWithPagination(query, params) {
        const { limit = 10, page = 1 } = params;
        if (limit === -1) return;
        const offset = (page - 1) * limit;

        return query.limit(limit).offset(offset);
    }

    static patchQuery(query, params, sortAndLimit = false) {
        this.patchQueryWithFilters(query, params);
        this.patchQueryWithSearch(query, params);
        sortAndLimit && this.patchQueryWithSorting(query, params);
        sortAndLimit && this.patchQueryWithPagination(query, params);

        return query;
    }

    ////////////////////////////////////////////////////////////////////////////////

    static prepareParamsForShortItems(params) {
        return Object.assign(params, {
            sortBy: this.ID,
            ///desc: true
        });
    }

    static getShortItems(params) {
        return this.patchQuery(
            this.selectFromQuery(this.createQuery()),
            this.prepareParamsForShortItems(params),
            true
        );
    }

    static getItems(params) {
        return this.patchQuery(
            this.selectFromQueryWithJoins(this.createQueryWithJoins()),
            params,
            true
        )
            .then(items => this.mapItems(items));
    }

    static getCount(params) {
        return this.patchQuery(
            this.createQueryWithJoins(),
            params
        )
            .count()
            .then(([ { count } ]) => parseInt(count));
    }

    static async getList(params) {
        const [ items, count ] = await Promise.all([
            this.getItems(params),
            this.getCount(params)
        ]);

        return { items, count };
    }

    ////////////////////////////////////////////////////////////////////////////////

    static createItem(data) {
        return this.createQuery()
            .insert(data);
    }

    static getItem(id) {
        return this.createQuery()
            .where(this.ID, id)
            .first();
    }

    static updateItem(id, data) {
        return this.createQuery()
            .where(this.ID, id)
            .update(data);
    }

    static dropItem(id) {
        return this.createQuery()
            .where(this.ID, id)
            .del();
    }
}


module.exports = BaseQueries;