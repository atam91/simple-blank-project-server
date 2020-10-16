const usersService = require('../services/users');
const checkPermission = require('../middlewares/checkPermission');
const { wrapAsync } = require('../utils/base');
const { getBaseListParamsFromQuery } = require('../utils/list');


const rolesToRoleMiddleware = (req, res, next) => {
    req.params.role = req.params.roles.replace(/s$/,'');

    next();
};

const genCheckUserPermissions = action => (req, res, next) => {
    const { params: { roles } } = req;

    const permission = `users_${roles}_${action}`;

    checkPermission(permission)(req, res, next);
};

////////////////////////////////////////////////////////////////////////////////

const getItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id, role } } = req;

    const data = await usersService.getItem(applicationQuery, id, role);

    res.send(data);
});


const getList = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { role }, query } = req;

    const params = getBaseListParamsFromQuery(query, [ 'orgId', 'depId' ]);
    const data = await usersService.getList(applicationQuery, params, role);

    res.send(data);
});

const getShortItems = wrapAsync(async (req, res) => {
    const { applicationQuery, query } = req;

    const params = getBaseListParamsFromQuery(query, [ 'orgId', 'depId', 'role' ]);
    const data = await usersService.getShortItems(applicationQuery, params);

    res.send(data);
});

////////////////////////////////////////////////////////////////////////////////

const createItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { role }, body } = req;

    await usersService.createItem(applicationQuery, body, role);

    res.sendStatus(200);
});

const updateItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id, role }, body } = req;

    await usersService.editItem(applicationQuery, id, body, role);

    res.sendStatus(200);
});


const dropItem = wrapAsync(async (req, res) => {
    const { applicationQuery, params: { id, role } } = req;

    await usersService.dropItem(applicationQuery, id, role);

    res.sendStatus(200);
});


module.exports = {
    rolesToRoleMiddleware,
    genCheckUserPermissions,

    getItem,
    getList,
    getShortItems,

    createItem,
    updateItem,
    dropItem
};
