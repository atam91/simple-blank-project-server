---
to: app/controllers/<%= h.changeCase.camelCase(name) %>.js
---
const <%= h.changeCase.camelCase(name) %>Service = require('../services/<%= h.changeCase.camelCase(name) %>');
const { wrapAsync } = require('../utils/base');
const { getBaseListParamsFromQuery } = require('../utils/list');


const getItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id } } = req;

    const data = await <%= h.changeCase.camelCase(name) %>Service.getItem(applicationQuery, id);

    res.send(data);
});

const getList = wrapAsync(async (req, res) => {
    const { applicationQuery, query } = req;
    const params = getBaseListParamsFromQuery(query);

    const data = await <%= h.changeCase.camelCase(name) %>Service.getList(applicationQuery, params);

    res.send(data);
});

const getShortItems = wrapAsync(async (req, res) => {
    const { applicationQuery, query } = req;
    const params = getBaseListParamsFromQuery(query);

    const data = await <%= h.changeCase.camelCase(name) %>Service.getShortItems(applicationQuery, params);

    res.send(data);
});

////////////////////////////////////////////////////////////////////////////////

const createItem = wrapAsync(async (req, res) => {
    const { applicationQuery, body } = req;
    await <%= h.changeCase.camelCase(name) %>Service.createItem(applicationQuery, body);

    res.sendStatus(200);
});

const updateItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id }, body } = req;

    await <%= h.changeCase.camelCase(name) %>Service.updateItem(applicationQuery, id, body);

    res.sendStatus(200);
});


const dropItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id } } = req;

    await <%= h.changeCase.camelCase(name) %>Service.dropItem(applicationQuery, id);

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
