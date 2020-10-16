const ACTIONS = require('../../constants/actions');
const { forbiddenError } = require('../../utils/errors');

/**
 *
 * @param {ApplicationQuery} applicationQuery
 * @param {Object} item
 * @returns {boolean}
 */
const haveOrgAccessToItem = (applicationQuery, item = {}) => {
    const applicationUser = applicationQuery.getUser();

    return !item.orgId || applicationUser.havePermission(ACTIONS.ANY_ORGANIZATION_ACCESS)
        || item.orgId === applicationUser.getOrgId();
};

/**
 *
 * @param {ApplicationQuery} applicationQuery
 * @param {Object} item
 * @param {string=} forbiddenText
 */
const checkOrgAccessToItem = (applicationQuery, item, forbiddenText) => {
    if (!haveOrgAccessToItem(applicationQuery, item)) throw forbiddenError(forbiddenText);
};


/**
 *
 * @param {ApplicationQuery} applicationQuery
 * @param {callback} getterCb - async
 * @param {string=} forbiddenText
 * @returns {Promise}
 */
const checkOrgAccessToItemByGetter = async (applicationQuery, getterCb, forbiddenText) => {
    const applicationUser = applicationQuery.getUser();

    if (!applicationUser.havePermission(ACTIONS.ANY_ORGANIZATION_ACCESS)) {
        const item = await getterCb();
        if (!item) throw notFoundError();

        if (item.orgId && item.orgId !== applicationUser.getOrgId()) throw forbiddenError(forbiddenText);
    }
};


/**
 *
 * @param {ApplicationQuery} applicationQuery
 * @param {Object} params
 * @param {boolean} ignoreInitial
 * @returns {*}
 */
const patchParamsWithOrgAccess = (applicationQuery, params, ignoreInitial = false) => {
    const applicationUser = applicationQuery.getUser();

    if (!applicationUser.havePermission(ACTIONS.ANY_ORGANIZATION_ACCESS)) {
        if (params.orgId && !ignoreInitial) {
            if (params.orgId !== applicationUser.getOrgId()) throw forbiddenError();
        } else {
            params.orgId = applicationUser.getOrgId();
        }
    }

    return params;
};


module.exports = {
    haveOrgAccessToItem,
    checkOrgAccessToItem,
    checkOrgAccessToItemByGetter,
    patchParamsWithOrgAccess,
};
