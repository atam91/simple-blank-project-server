const knex = require('../knex');
const BaseQueries = require('./BaseQueries');
const UserGroupUsersTable = require('./tables/userGroupUsers');


const getIdsByGroupId = (userGroupId) =>
    knex(UserGroupUsersTable.TABLE)
        .select([ UserGroupUsersTable.USER_ID ])
        .where(UserGroupUsersTable.USER_GROUP_ID, userGroupId)
            .then(rows => rows.map(r => r.userId));


const addUserToGroup = (userGroupId, userId) =>
    knex(UserGroupUsersTable.TABLE)
        .insert({ userGroupId, userId });

const dropUserFromGroup = (userGroupId, userId) =>
    knex(UserGroupUsersTable.TABLE)
        .where({ userGroupId, userId })
        .del();


const getGroupIdsByUserId = (userId) =>
    knex(UserGroupUsersTable.TABLE)
        .select([ UserGroupUsersTable.USER_GROUP_ID ])
        .where(UserGroupUsersTable.USER_ID, userId)
            .then(rows => rows.map(r => r.userGroupId));


module.exports = {
    getIdsByGroupId,

    addUserToGroup,
    dropUserFromGroup,

    getGroupIdsByUserId,
};
