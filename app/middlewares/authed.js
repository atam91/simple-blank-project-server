const authService = require('../services/auth');
const ApplicationQuery = require('../staticModels/ApplicationQuery');
const { badRequestError } = require('../utils/errors');


const AUTHORIZATION_HEADER = 'authorization';

async function authedMiddleware(req, res, next) {
    try {
        const token = req.headers[AUTHORIZATION_HEADER];
        if (!token) {
            return next( badRequestError(`Expected ${AUTHORIZATION_HEADER} header`) );
        }

        const data = await authService.getSession(token);           // bad interface   data = { session, user }
        if (!data) {
            return res.sendStatus(401);
        }

        const { user, session } = data;
        Object.assign(req, {
            applicationQuery: ApplicationQuery.create(user, session),
        });

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authedMiddleware;
