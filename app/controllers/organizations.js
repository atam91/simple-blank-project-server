const organizationsService = require('../services/organizations');
const { wrapAsync } = require('../utils/base');
const { getBaseListParamsFromQuery } = require('../utils/list');


const getUserOrganization = wrapAsync(async (req, res) => {
    const { applicationQuery } = req;

    const data = await organizationsService.getItem(
        applicationQuery,
        applicationQuery.getUser().getOrgId()
    );

    res.send(data);
});

////////////////////////////////////////////////////////////////////////////////

const getItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id } } = req;

    const data = await organizationsService.getItem(applicationQuery, id);

    res.send(data);
});

const getList = wrapAsync(async (req, res) => {
    const { applicationQuery, query } = req;
    const params = getBaseListParamsFromQuery(query);

    const data = await organizationsService.getList(applicationQuery, params);

    res.send(data);
});

const getShortItems = wrapAsync(async (req, res) => {
    const { applicationQuery, query } = req;
    const params = getBaseListParamsFromQuery(query);

    const data = await organizationsService.getShortItems(applicationQuery, params);

    res.send(data);
});

////////////////////////////////////////////////////////////////////////////////

const createItem = wrapAsync(async (req, res) => {
    const { applicationQuery, body } = req;
    await organizationsService.createItem(applicationQuery, body);

    res.sendStatus(200);
});

const updateItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id }, body } = req;

    await organizationsService.updateItem(applicationQuery, id, body);

    res.sendStatus(200);
});


const dropItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id } } = req;

    await organizationsService.dropItem(applicationQuery, id);

    res.sendStatus(200);
});


module.exports = {
    getUserOrganization,

    getItem,
    getList,
    getShortItems,

    createItem,
    updateItem,
    dropItem,
};
