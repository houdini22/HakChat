class UsersGetter {
    constructor() {

    }

    fetch(callback) {
        let users = require('../data/users');
        callback(users);
        return this;
    }
}

module.exports = UsersGetter;