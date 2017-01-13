let UsersGetter = require('./UsersGetter');

class UsersWrapper {
    constructor() {
        this.usersGetter = new UsersGetter();
        this.users = [];
    }

    fetch(callback) {
        this.usersGetter.fetch((users) => {
            this.users = users;
            callback();
        });
    }

    areUserDataCorrect(nick, password) {
        let res = false;
        this.users.forEach((userObj) => {
            if (userObj.nick === nick && userObj.password === password) {
                res = true;
                return false;
            }
        });
        return res;
    }

    getUserByNick(nick) {
        let res = null;
        this.users.forEach((userObj) => {
            if (userObj.nick === nick) {
                res = userObj;
                return false;
            }
        });
        return res;
    }
}

module.exports = UsersWrapper;