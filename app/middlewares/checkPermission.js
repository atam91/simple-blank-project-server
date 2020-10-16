const rolesPermissions = require('../constants/rolesPermissions');

function genCheckPermissionMiddleware(permission) {
    if (!permission) throw new Error('Undefined permission actionName');

    return function (req, res, next) {
        const { applicationQuery } = req;
        const user = applicationQuery.getUser();
        if (!user) return res.sendStatus(401);

        if (!user.havePermission(permission)) return res.sendStatus(403);

        next();
    }
}


module.exports = genCheckPermissionMiddleware;
