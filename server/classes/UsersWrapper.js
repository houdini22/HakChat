let UsersFetcher = require('./UsersFetcher');

class UsersWrapper {
    constructor() {
        this.usersFetcher = new UsersFetcher();
        this.users = [];
    }

    fetch(callback) {
        this.usersFetcher.fetch((users) => {
            this.users = users;
            callback();
        });
    }

    areUserDataCorrect(nick, password) {
        return !!this.users.find((user) => {
            return user.nick === nick && user.password === password;
        });
    }

    getUserByNick(nick) {
        return this.users.find((user) => {
            return user.nick === nick;
        });
    }
}

module.exports = UsersWrapper;