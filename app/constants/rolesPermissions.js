const { ROLES } = require('./roles');
const ACTIONS = require('./actions');

const { ROLE_ADMIN, ROLE_ORG_ADMIN, ROLE_MANAGER, ROLE_USER } = ROLES;


const genMutableCrudPermissions = (readOnly = [], mutate = []) => (mutable = false) =>
    readOnly.concat(mutable && mutate).filter(v => v);


const usersAdmins = genMutableCrudPermissions(
    [ ACTIONS.USERS_ADMINS_READ ],
    [
        ACTIONS.USERS_ADMINS_CREATE,
        ACTIONS.USERS_ADMINS_UPDATE,
        ACTIONS.USERS_ADMINS_DELETE,
    ]
);

const usersOrgAdmins = genMutableCrudPermissions(
    [ ACTIONS.USERS_ORG_ADMINS_READ ],
    [
        ACTIONS.USERS_ORG_ADMINS_CREATE,
        ACTIONS.USERS_ORG_ADMINS_UPDATE,
        ACTIONS.USERS_ORG_ADMINS_DELETE,
    ]
);

const usersManagers = genMutableCrudPermissions(
    [ ACTIONS.USERS_MANAGERS_READ ],
    [
        ACTIONS.USERS_MANAGERS_CREATE,
        ACTIONS.USERS_MANAGERS_UPDATE,
        ACTIONS.USERS_MANAGERS_DELETE,
    ]
);

const usersUsers = genMutableCrudPermissions(
    [ ACTIONS.USERS_USERS_READ ],
    [
        ACTIONS.USERS_USERS_CREATE,
        ACTIONS.USERS_USERS_UPDATE,
        ACTIONS.USERS_USERS_DELETE,
    ]
);


const organizations = genMutableCrudPermissions(
    [ ACTIONS.ORGANIZATIONS_READ ],
    [
        ACTIONS.ORGANIZATIONS_CREATE,
        ACTIONS.ORGANIZATIONS_UPDATE,
        ACTIONS.ORGANIZATIONS_DELETE,
    ]
);

const departments = genMutableCrudPermissions(
    [ ACTIONS.DEPARTMENTS_READ ],
    [
        ACTIONS.DEPARTMENTS_CREATE,
        ACTIONS.DEPARTMENTS_UPDATE,
        ACTIONS.DEPARTMENTS_DELETE,
    ]
);

const userGroups = genMutableCrudPermissions(
    [ ACTIONS.USER_GROUPS_READ ],
    [
        ACTIONS.USER_GROUPS_CREATE,
        ACTIONS.USER_GROUPS_UPDATE,
        ACTIONS.USER_GROUPS_DELETE,
    ]
);

/// HERE Inject MutableCrudPermissions functions ///


const ROLE_PERMISSIONS = {
    [ROLE_ADMIN]: [
        ACTIONS.VIEW_ADMIN,
        ACTIONS.VIEW_DASHBOARD,

        ACTIONS.ANY_ORGANIZATION_ACCESS,
        ACTIONS.ANY_OWNER_ACCESS,

        ...usersAdmins(true),
        ...usersOrgAdmins(true),
        ...usersManagers(true),
        ...usersUsers(true),
        ACTIONS.USERS_READ,

        ...organizations(true),
        ...departments(true),
        ...userGroups(true),

        /// HERE Inject MutableCrudPermissions for ADMIN ROLE ///
    ],

    [ROLE_ORG_ADMIN]: [
        ACTIONS.VIEW_ADMIN,
        ACTIONS.VIEW_DASHBOARD,

        ...usersOrgAdmins(),
        ...usersManagers(true),
        ...usersUsers(true),
        ACTIONS.USERS_READ,

        ...organizations(),
        ACTIONS.ORGANIZATIONS_UPDATE,
        ...departments(true),
        ...userGroups(true),
    ],

    [ROLE_MANAGER]: [
        ACTIONS.VIEW_ADMIN,
        ACTIONS.VIEW_DASHBOARD,

        ...usersOrgAdmins(),
        ...usersManagers(),
        ...usersUsers(true),
        ACTIONS.USERS_READ,

        ...organizations(),
        ...departments(),
        ...userGroups(true),
    ],

    [ROLE_USER]: []
};


module.exports = ROLE_PERMISSIONS;
