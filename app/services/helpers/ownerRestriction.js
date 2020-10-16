const ACTIONS = require('../../constants/actions');
const { forbiddenError } = require('../../utils/errors');

/**
 *
 * @param {ApplicationQuery} applicationQuery
 * @param {Object} item
 * @returns {boolean}
 */
const haveOwnerAccessToItem = (applicationQuery, item = {}) => {
    const applicationUser = applicationQuery.getUser();

    return applicationUser.havePermission(ACTIONS.ANY_OWNER_ACCESS)
        || item.ownerId === applicationUser.getId();
};

/**
 *
 * @param {ApplicationQuery} applicationQuery
 * @param {Object} item
 * @param {string=} forbiddenText
 */
const checkOwnerAccessToItem = (applicationQuery, item, forbiddenText) => {
    if (!haveOwnerAccessToItem(applicationQuery, item)) throw forbiddenError(forbiddenText);
};


/**
 *
 * @param {ApplicationQuery} applicationQuery
 * @param {callback} getterCb - async
 * @param {string=} forbiddenText
 * @returns {Promise}
 */
const checkOwnerAccessToItemByGetter = async (applicationQuery, getterCb, forbiddenText) => {
    const applicationUser = applicationQuery.getUser();

    if (!applicationUser.havePermission(ACTIONS.ANY_OWNER_ACCESS)) {
        const item = await getterCb();
        if (!item) throw notFoundError();

        if (item.ownerId && item.ownerId !== applicationUser.getId()) throw forbiddenError(forbiddenText);
    }
};


/**
 *
 * @param {ApplicationQuery} applicationQuery
 * @param {Object} params
 * @param {boolean} ignoreInitial
 * @returns {*}
 */
const patchParamsWithOwnerAccess = (applicationQuery, params, ignoreInitial = false) => {
    const applicationUser = applicationQuery.getUser();

    if (!applicationUser.havePermission(ACTIONS.ANY_OWNER_ACCESS)) {
        if (params.ownerId && !ignoreInitial) {
            if (params.ownerId !== applicationUser.getId()) throw forbiddenError();
        } else {
            params.ownerId = applicationUser.getId();
        }
    }

    return params;
};


module.exports = {
    haveOwnerAccessToItem,
    checkOwnerAccessToItem,
    checkOwnerAccessToItemByGetter,
    patchParamsWithOwnerAccess,
};
