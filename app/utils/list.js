

const getBaseListParamsFromQuery = (query, filters = []) => {
    const params = {
        limit: query.limit ? parseInt(query.limit) : 10,
        page: query.page ? parseInt(query.page) : 1,
        sortBy: query.sortBy,
        desc: !!query.desc,
        search: query.search
    };

    filters.forEach(key => {
        const value = query[key];
        if (!value) return;

        if (/^\d+$/.test(value)) {
            params[key] = parseInt(value);
        } else {
            params[key] = value;
        }
    });

    return params;
};


module.exports = {
    getBaseListParamsFromQuery
};