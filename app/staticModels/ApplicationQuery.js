const User = require('./User');
const Session = require('./Session');

class ApplicationQuery {
    constructor(user, session) {
        // todo checks
        this.user = User.create(user);
        this.session = Session.create(session);
    }

    static create(user, session) {
        return new this(user, session);
    }

    /**
     * @returns {User}
     */
    getUser() {
        return this.user;
    }

    /**
     * @returns {Session}
     */
    getSession() {
        return this.session;
    }
}


module.exports = ApplicationQuery;
