const ACTIONS = require('../constants/actions');
const DB_ERROR_CODES = require('../constants/dbErrorCodes');
const usersModel = require('../models/users');
const authUtils = require('../utils/auth');
const { badRequestError, forbiddenError } = require('../utils/errors');
const orgRestrictionHelper = require('./helpers/orgRestriction');


const getItem = async (applicationQuery, id, role) => {
    const item = await usersModel.getItem(id, role);

    orgRestrictionHelper.checkOrgAccessToItem(applicationQuery, item);

    return item;
};


const getList = (applicationQuery, params, role) => {
    orgRestrictionHelper.patchParamsWithOrgAccess(applicationQuery, params);

    return usersModel.getList(
        Object.assign(params, { role })
    );
};

const getShortItems = (applicationQuery, params) => {
    orgRestrictionHelper.patchParamsWithOrgAccess(applicationQuery, params);

    return usersModel.getShortItems(params);
};

////////////////////////////////////////////////////////////////////////////////

const prepareData = async (applicationQuery, _data, role, isCreation = false) => {
    const applicationUser = applicationQuery.getUser();
    const { login, password, name, email, orgId, departmentId } = _data;

    if (!login) throw badRequestError('Missing login');
    const data = {
        login: login.trim().toLowerCase(),
        departmentId,
    };

    if (isCreation && !password) throw badRequestError('Missing password');
    if (password) {
        const { hash, salt } = await authUtils.hashPromisified({ password });
        Object.assign(data, { hash, salt });
    }

    if (role !== 'admin') {
        if (!name) throw badRequestError('Missing Name');
        ///if (!email) throw badRequestError('Missing email');
        Object.assign(data, { name, email });

        if (!orgId) throw badRequestError('Missing organization');
        if ( !applicationUser.havePermission(ACTIONS.ANY_ORGANIZATION_ACCESS) ) {
            if (orgId !== applicationUser.getOrgId()) throw forbiddenError('Organization restriction');
        }
        Object.assign(data, { orgId });
    }

    return data;
};

const createItem = async (applicationQuery, _data, role) => {
    const data = await prepareData(applicationQuery, _data, role, true);

    return await usersModel.createItem(data, role);
};

const editItem = async (applicationQuery, id, _data, role) => {
    const data = await prepareData(applicationQuery, _data, role);

    await orgRestrictionHelper.checkOrgAccessToItemByGetter(applicationQuery, () => usersModel.getItem(id, role));

    return await usersModel.updateItem(id, data, role);
};


const dropItem = async (applicationQuery, id, role) => {
    try {
        await orgRestrictionHelper(applicationQuery, () => usersModel.getItem(id, role));

        return await usersModel.dropItem(id, role);
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
    editItem,
    dropItem,
};