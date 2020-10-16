const userGroupsService = require('../services/userGroups');
const { wrapAsync } = require('../utils/base');
const { getBaseListParamsFromQuery } = require('../utils/list');


const getItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id } } = req;

    const data = await userGroupsService.getItem(applicationQuery, id);

    res.send(data);
});

const getList = wrapAsync(async (req, res) => {
    const { applicationQuery, query } = req;
    const params = getBaseListParamsFromQuery(query, [ 'orgId', 'ownerId' ]);

    const data = await userGroupsService.getList(applicationQuery, params);

    res.send(data);
});

const getShortItems = wrapAsync(async (req, res) => {
    const { applicationQuery, query } = req;
    const params = getBaseListParamsFromQuery(query, [ 'orgId', 'ownerId' ]);

    const data = await userGroupsService.getShortItems(applicationQuery, params);

    res.send(data);
});

////////////////////////////////////////////////////////////////////////////////

const getGroupUsersList = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id } } = req;

    const data = await userGroupsService.getGroupUsersList(applicationQuery, id);

    res.send(data.items);
});

const addUserToGroup = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id, userId } } = req;

    await userGroupsService.addUserToGroup(applicationQuery, id, userId);

    res.sendStatus(200);
});

const dropUserFromGroup = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id, userId } } = req;

    await userGroupsService.dropUserFromGroup(applicationQuery, id, userId);

    res.sendStatus(200);
});

////////////////////////////////////////////////////////////////////////////////

const createItem = wrapAsync(async (req, res) => {
    const { applicationQuery, body } = req;
    await userGroupsService.createItem(applicationQuery, body);

    res.sendStatus(200);
});

const updateItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id }, body } = req;

    await userGroupsService.updateItem(applicationQuery, id, body);

    res.sendStatus(200);
});


const dropItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id } } = req;

    await userGroupsService.dropItem(applicationQuery, id);

    res.sendStatus(200);
});


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
