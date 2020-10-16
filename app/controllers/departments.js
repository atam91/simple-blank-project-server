const departmentsService = require('../services/departments');
const { wrapAsync } = require('../utils/base');
const { getBaseListParamsFromQuery } = require('../utils/list');


const getItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id } } = req;

    const data = await departmentsService.getItem(applicationQuery, id);

    res.send(data);
});

const getList = wrapAsync(async (req, res) => {
    const { applicationQuery, query } = req;
    const params = getBaseListParamsFromQuery(query, [ 'orgId' ]);

    const data = await departmentsService.getList(applicationQuery, params);

    res.send(data);
});

const getShortItems = wrapAsync(async (req, res) => {
    const { applicationQuery, query } = req;
    const params = getBaseListParamsFromQuery(query, [ 'orgId' ]);

    const data = await departmentsService.getShortItems(applicationQuery, params);

    res.send(data);
});

////////////////////////////////////////////////////////////////////////////////

const createItem = wrapAsync(async (req, res) => {
    const { applicationQuery, body } = req;
    await departmentsService.createItem(applicationQuery, body);

    res.sendStatus(200);
});

const updateItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id }, body } = req;

    await departmentsService.updateItem(applicationQuery, id, body);

    res.sendStatus(200);
});


const dropItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id } } = req;

    await departmentsService.dropItem(applicationQuery, id);

    res.sendStatus(200);
});


module.exports = {
    getItem,
    getList,
    getShortItems,

    createItem,
    updateItem,
    dropItem,
};
