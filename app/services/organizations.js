const DB_ERROR_CODES = require('../constants/dbErrorCodes');
const organizationsModel = require('../models/organizations');
const { trim } = require('../utils/normalize');
const { badRequestError, forbiddenError } = require('../utils/errors');
const orgRestrictionHelper = require('./helpers/orgRestriction');


const getItem = async (applicationQuery, id) => {
    const item = await organizationsModel.getItem(id);

    item && orgRestrictionHelper.checkOrgAccessToItem(applicationQuery, { orgId: item.id });

    return item;
};

const getList = (applicationQuery, params) => {
    orgRestrictionHelper.patchParamsWithOrgAccess(applicationQuery, params);

    return organizationsModel.getList(params);
};

const getShortItems = (applicationQuery, params) => {
    orgRestrictionHelper.patchParamsWithOrgAccess(applicationQuery, params);

    return organizationsModel.getShortItems(params);
};

////////////////////////////////////////////////////////////////////////////////

const normalizeAndValidateData = (_data = {}) => {
    const name = trim(_data.name);

    if (!name) throw badRequestError('Missing name');

    return { name };
};


const createItem = async (applicationQuery, _data) => {
    const data = normalizeAndValidateData(_data);

    return await organizationsModel.createItem(data);
};

const updateItem = async (applicationQuery, id, _data) => {
    const data = normalizeAndValidateData(_data);

    await orgRestrictionHelper.checkOrgAccessToItemByGetter(
        applicationQuery,
        () => organizationsModel.getItem(id)
            .then(item => item && { orgId: id })
    );

    return await organizationsModel.updateItem(id, data);
};


const dropItem = async (applicationQuery, id) => {
    try {
        return await organizationsModel.dropItem(id);
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
