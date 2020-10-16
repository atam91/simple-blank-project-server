const rolesPermissions = require('../constants/rolesPermissions');

class User {
    constructor(user) {
        this.user = user;           /// todo expand nested

        this.role = user.role;
        this.orgId = user.orgId;
    }

    static create(user) {
        return new this(user);
    }

    getRawUser() {
        return this.user;
    }

    getId() {
        return this.user.id;
    }

    getPermissions() {
        return rolesPermissions[this.role] || [];
    }

    havePermission(permission) {
        return this.getPermissions().includes(permission);
    }

    getOrgId() {
        return this.orgId;
    }
}


module.exports = User;
