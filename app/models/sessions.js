const knex = require('../knex');

const TABLE = 'sessions';

const create = async (userId, sid) => {
    const result = await knex.raw(
        `INSERT INTO ${TABLE} (user_id, sid) VALUES (?,?) ON CONFLICT (user_id) DO UPDATE SET sid = ?, touched = ?`,
        [ userId, sid, sid, new Date ]
    );
    /// fixme?? ON CONFLICT (sid)       ?????

    return result.rowCount === 1;
};

const get = sid => knex(TABLE).select().where({ sid }).first();

const touch = sid => knex(TABLE).where({ sid }).update({ touched: new Date });

const drop = sid => knex(TABLE).where({ sid }).del();


module.exports = {
    create,
    get,
    touch,
    drop
};
