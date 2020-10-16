
class Session {
    constructor(session) {
        this.session = session;     /// todo expand
    }

    static create(session) {
        return new this(session);
    }

    getSid() {
        return this.session.sid;
    }
}

module.exports = Session;
