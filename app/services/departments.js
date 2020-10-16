const ACTIONS = require('../constants/actions');
const DB_ERROR_CODES = require('../constants/dbErrorCodes');
const departmentsModel = require('../models/departments');
const { trim } = require('../utils/normalize');
const { badRequestError, forbiddenError } = require('../utils/errors');
const orgRestrictionHelper = require('./helpers/orgRestriction');


const getItem = async (applicationQuery, id) => {
    const item = await departmentsModel.getItem(id);

    orgRestrictionHelper.checkOrgAccessToItem(applicationQuery, item);

    return item;
};

const getList = (applicationQuery, params) => {
    orgRestrictionHelper.patchParamsWithOrgAccess(applicationQuery, params);

    return departmentsModel.getList(params);
};

const getShortItems = (applicationQuery, params) => {
    orgRestrictionHelper.patchParamsWithOrgAccess(applicationQuery, params);

    return departmentsModel.getShortItems(params);
};

////////////////////////////////////////////////////////////////////////////////

const prepareData = (applicationQuery, _data = {}) => {
    const applicationUser = applicationQuery.getUser();

    const data = {
        orgId: _data.orgId,
        name: trim(_data.name)
    };

    if (!data.name) throw badRequestError('Missing name');

    if (!data.orgId) throw badRequestError('Missing organization');
    if ( !applicationUser.havePermission(ACTIONS.ANY_ORGANIZATION_ACCESS) ) {
        if (data.orgId !== applicationUser.getOrgId()) throw forbiddenError('Organization restriction');
    }

    return data;
};


const createItem = async (applicationQuery, _data) => {
    const data = prepareData(applicationQuery, _data);

    return await departmentsModel.createItem(data);
};

const updateItem = async (applicationQuery, id, _data) => {
    const data = prepareData(applicationQuery, _data);

    await orgRestrictionHelper.checkOrgAccessToItemByGetter(applicationQuery, () => departmentsModel.getItem(id));

    return await departmentsModel.updateItem(id, data);
};


const dropItem = async (applicationQuery, id) => {
    try {
        await orgRestrictionHelper.checkOrgAccessToItemByGetter(applicationQuery, () => departmentsModel.getItem(id));

        return await departmentsModel.dropItem(id);
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
