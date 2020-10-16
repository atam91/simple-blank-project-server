---
to: app/services/<%= h.changeCase.camelCase(name) %>.js
---
<%
    Model = h.changeCase.camelCase(name) + 'Model';
%>const DB_ERROR_CODES = require('../constants/dbErrorCodes');
const <%= Model %> = require('../models/<%= h.changeCase.camelCase(name) %>');
const { trim } = require('../utils/normalize');
const { badRequestError, forbiddenError } = require('../utils/errors');

const getItem = (applicationQuery, id) => {
    return <%= Model %>.getItem(id);
};

const getList = (applicationQuery, params) => {
    return <%= Model %>.getList(params);
};

const getShortItems = (applicationQuery, params) => {
    return <%= Model %>.getShortItems(params);
};

////////////////////////////////////////////////////////////////////////////////

const normalizeAndValidateData = (_data = {}) => {
    const name = trim(_data.name);

    if (!name) throw badRequestError('Missing name');

    return { name };
};


const createItem = async (applicationQuery, _data) => {
    const data = normalizeAndValidateData(_data);

    return await <%= Model %>.createItem(data);
};

const updateItem = async (applicationQuery, id, _data) => {
    const data = normalizeAndValidateData(_data);

    return await <%= Model %>.updateItem(id, data);
};


const dropItem = async (applicationQuery, id) => {
    try {
        return await <%= Model %>.dropItem(id);
    } catch (err) {
        if (err.code === DB_ERROR_CODES.FOREIGN_KEY_VIOLATION) {
            throw forbiddenError(err.detail);
        }

        throw err;
    }
};


module.exports = {
    getItem,
    getList,
    getShortItems,

    createItem,
    updateItem,
    dropItem,
};
