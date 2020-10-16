const authService = require('../services/auth');
const rolesPermissions = require('../constants/rolesPermissions');
const { wrapAsync } = require('../utils/base');
const { badRequestError } = require('../utils/errors');


const login = wrapAsync(async (req, res) => {
    const { body } = req;

    const login = body.login && body.login.trim().toLowerCase();
    const password = body.password && body.password.trim();

    if (!login) throw badRequestError('Expected login in body');
    if (!password) throw badRequestError('Expected password in body');

    const { user, sid } = await authService.login(login, password);

    res.json({
        sid,
        user,
        permissions: rolesPermissions[user.role] || []
    });
});

const session = (req, res) => {
    const { applicationQuery } = req;

    res.send({
        sid: applicationQuery.getSession().getSid(),
        user: applicationQuery.getUser().getRawUser(),
        permissions: applicationQuery.getUser().getPermissions()
    });
};

const logout = wrapAsync(async (req, res) => {
    const { applicationQuery } = req;

    await authService.logout(applicationQuery.getSession().getSid());

    res.sendStatus(200);
});


module.exports = {
    login,
    session,
    logout
};
