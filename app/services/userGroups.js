const ACTIONS = require('../constants/actions');
const DB_ERROR_CODES = require('../constants/dbErrorCodes');
const userGroupsModel = require('../models/userGroups');
const userGroupUsersModel = require('../models/userGroupUsers');
const usersModel = require('../models/users');
const { trim } = require('../utils/normalize');
const { badRequestError, forbiddenError } = require('../utils/errors');
const orgRestrictionHelper = require('./helpers/orgRestriction');
const ownerRestrictionHelper = require('./helpers/ownerRestriction');


const getItem = async (applicationQuery, id) => {
    const item = await userGroupsModel.getItem(id);

    ownerRestrictionHelper.checkOwnerAccessToItem(applicationQuery, item);
    orgRestrictionHelper.checkOrgAccessToItem(applicationQuery, item);

    return item;
};

const getList = (applicationQuery, params) => {
    ownerRestrictionHelper.patchParamsWithOwnerAccess(applicationQuery, params);
    orgRestrictionHelper.patchParamsWithOrgAccess(applicationQuery, params);

    return userGroupsModel.getList(params);
};

const getShortItems = (applicationQuery, params) => {
    ownerRestrictionHelper.patchParamsWithOwnerAccess(applicationQuery, params);
    orgRestrictionHelper.patchParamsWithOrgAccess(applicationQuery, params);

    return userGroupsModel.getShortItems(params);
};

////////////////////////////////////////////////////////////////////////////////

const getGroupUsersList = async (applicationQuery, id) => {
    const userGroup = await userGroupsModel.getItem(id);
    ownerRestrictionHelper.checkOwnerAccessToItem(applicationQuery, userGroup);
    orgRestrictionHelper.checkOrgAccessToItem(applicationQuery, userGroup);

    const groupUserIds = await userGroupUsersModel.getIdsByGroupId(id);

    return await usersModel.getList({
        ids: groupUserIds,
        sortBy: 'id',
        limit: -1
    });
};

const addUserToGroup = async (applicationQuery, userGroupId, userId) => {
    const userGroup = await userGroupsModel.getItem(userGroupId);
    ownerRestrictionHelper.checkOwnerAccessToItem(applicationQuery, userGroup);
    orgRestrictionHelper.checkOrgAccessToItem(applicationQuery, userGroup);

    return await userGroupUsersModel.addUserToGroup(userGroupId, userId);
};

const dropUserFromGroup = async (applicationQuery, userGroupId, userId) => {
    const userGroup = await userGroupsModel.getItem(userGroupId);
    ownerRestrictionHelper.checkOwnerAccessToItem(applicationQuery, userGroup);
    orgRestrictionHelper.checkOrgAccessToItem(applicationQuery, userGroup);

    return await userGroupUsersModel.dropUserFromGroup(userGroupId, userId);
};

////////////////////////////////////////////////////////////////////////////////

const normalizeAndValidateData = (_data = {}) => {
    const { orgId } = _data;
    const name = trim(_data.name);

    if (!name) throw badRequestError('Missing name');
    if (!orgId) throw badRequestError('Missing organization');

    return { name, orgId };
};


const createItem = async (applicationQuery, _data) => {
    const applicationUser = applicationQuery.getUser();

    const data = normalizeAndValidateData(_data);

    if (!data.ownerId || !applicationUser.havePermission(ACTIONS.ANY_OWNER_ACCESS)) {
        data.ownerId = applicationUser.getId();
    }
    if (!data.orgId || !applicationUser.havePermission(ACTIONS.ANY_ORGANIZATION_ACCESS)) {
        data.orgId = applicationUser.getOrgId();
    }

    return await userGroupsModel.createItem(data);
};

const updateItem = async (applicationQuery, id, _data) => {
    const data = normalizeAndValidateData(_data);

    const item = await userGroupsModel.getItem(id);
    ownerRestrictionHelper.checkOwnerAccessToItem(applicationQuery, item);
    orgRestrictionHelper.checkOrgAccessToItem(applicationQuery, item);

    return await userGroupsModel.updateItem(id, data);
};


const dropItem = async (applicationQuery, id) => {
    try {
        const item = await userGroupsModel.getItem(id);
        ownerRestrictionHelper.checkOwnerAccessToItem(applicationQuery, item);
        orgRestrictionHelper.checkOrgAccessToItem(applicationQuery, item);

        return await userGroupsModel.dropItem(id);
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

    getGroupUsersList,
    addUserToGroup,
    dropUserFromGroup,

    createItem,
    updateItem,
    dropItem,
};
