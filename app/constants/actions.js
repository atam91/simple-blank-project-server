const VIEW_ADMIN = 'view_admin';
const VIEW_DASHBOARD = 'view_dashboard';


/// Let admin mutate any org\user's entities
const ANY_ORGANIZATION_ACCESS = 'any_organization_access';
const ANY_OWNER_ACCESS = 'any_owner_access';


/// SOME SEPARATED by roles USERS_PERMISSIONS
const USERS_ADMINS_READ = 'users_admins_read';
const USERS_ADMINS_CREATE = 'users_admins_create';
const USERS_ADMINS_UPDATE = 'users_admins_update';
const USERS_ADMINS_DELETE = 'users_admins_delete';

const USERS_ORG_ADMINS_READ = 'users_org_admins_read';
const USERS_ORG_ADMINS_CREATE = 'users_org_admins_create';
const USERS_ORG_ADMINS_UPDATE = 'users_org_admins_update';
const USERS_ORG_ADMINS_DELETE = 'users_org_admins_delete';

const USERS_MANAGERS_READ = 'users_managers_read';
const USERS_MANAGERS_CREATE = 'users_managers_create';
const USERS_MANAGERS_UPDATE = 'users_managers_update';
const USERS_MANAGERS_DELETE = 'users_managers_delete';

const USERS_USERS_READ = 'users_users_read';
const USERS_USERS_CREATE = 'users_users_create';
const USERS_USERS_UPDATE = 'users_users_update';
const USERS_USERS_DELETE = 'users_users_delete';

const USERS_READ = 'users_read';


const ORGANIZATIONS_READ = 'organizations_read';
const ORGANIZATIONS_CREATE = 'organizations_create';
const ORGANIZATIONS_UPDATE = 'organizations_update';
const ORGANIZATIONS_DELETE = 'organizations_delete';

const DEPARTMENTS_READ = 'departments_read';
const DEPARTMENTS_CREATE = 'departments_create';
const DEPARTMENTS_UPDATE = 'departments_update';
const DEPARTMENTS_DELETE = 'departments_delete';

const USER_GROUPS_READ = 'user_groups_read';
const USER_GROUPS_CREATE = 'user_groups_create';
const USER_GROUPS_UPDATE = 'user_groups_update';
const USER_GROUPS_DELETE = 'user_groups_delete';

/// HERE Inject Actions Definition ///


module.exports = {
    VIEW_ADMIN,
    VIEW_DASHBOARD,

    ANY_ORGANIZATION_ACCESS,
    ANY_OWNER_ACCESS,

    USERS_ADMINS_READ,
    USERS_ADMINS_CREATE,
    USERS_ADMINS_UPDATE,
    USERS_ADMINS_DELETE,
    USERS_ORG_ADMINS_READ,
    USERS_ORG_ADMINS_CREATE,
    USERS_ORG_ADMINS_UPDATE,
    USERS_ORG_ADMINS_DELETE,
    USERS_MANAGERS_READ,
    USERS_MANAGERS_CREATE,
    USERS_MANAGERS_UPDATE,
    USERS_MANAGERS_DELETE,
    USERS_USERS_READ,
    USERS_USERS_CREATE,
    USERS_USERS_UPDATE,
    USERS_USERS_DELETE,
    USERS_READ,

    ORGANIZATIONS_READ,
    ORGANIZATIONS_CREATE,
    ORGANIZATIONS_UPDATE,
    ORGANIZATIONS_DELETE,

    DEPARTMENTS_READ,
    DEPARTMENTS_CREATE,
    DEPARTMENTS_UPDATE,
    DEPARTMENTS_DELETE,

    USER_GROUPS_READ,
    USER_GROUPS_CREATE,
    USER_GROUPS_UPDATE,
    USER_GROUPS_DELETE,

    /// HERE Inject Actions Export ///
};
