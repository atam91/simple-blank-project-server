const usersModel = require('../models/users');
const sessionsModel = require('../models/sessions');
const authUtils = require('../utils/auth');
const { badRequestError } = require('../utils/errors');

const login = async (login, password) => {
    const user = await usersModel.getFullByLogin(login);
    if (!user) throw badRequestError('Wrong login password pair');

    const { hash } = await authUtils.hashPromisified({ password, salt: user.salt });

    if (hash === user.hash) {
        const sid = authUtils.generateSessionToken();

        await sessionsModel.create(user.id, sid);

        return {
            sid,
            user: usersModel.sanitizeEntity(user),
        };
    }

    throw badRequestError('Wrong login password pair');
};

const getSession = async (sid) => {
    const session = await sessionsModel.get(sid);
    if (!session) return false;                                                     /// TODO check for touched expiration??

    const user = await usersModel.getSanitizedById(session.userId);
    if (!user) return false;

    await sessionsModel.touch(session.sid);

    return { session, user };
};

const logout = async sid => {
    const res = await sessionsModel.drop(sid);

    return res === 1;
};


module.exports = {
    login,
    getSession,
    logout
};
