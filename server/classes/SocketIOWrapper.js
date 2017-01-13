let helpers = require('../helpers');

var UsersWrapper = require('./UsersWrapper');

class SocketIOWrapper {
    constructor(httpsServer) {
        this.io = require('socket.io')(httpsServer);
        this.usersWrapper = new UsersWrapper();
        this.joinedUsers = [];
    }

    userJoined(nick, additionalFields) {
        let user = this.usersWrapper.getUserByNick(nick);
        let keys = Object.keys(additionalFields);
        for (let key of keys) {
            user[key] = additionalFields[key];
        }
        this.joinedUsers.push(user);
        return this;
    }

    userDisconnected(socketId) {
        for (let i = 0; i < this.joinedUsers.length; i += 1) {
            let user = this.joinedUsers[i];
            if (user.id === socketId) {
                this.joinedUsers.splice(i, 1);
                break;
            }
        }
        return this;
    }

    getConnectedUsers() {
        let users = [];
        for (let user of this.joinedUsers) {
            users.push({
                nick: user.nick,
                ip: user.ip,
                isTyping: user.isTyping
            });
        }
        return users;
    }

    isUserJoined(nick) {
        let res = false;
        for (let userObj of this.joinedUsers) {
            if (userObj.nick === nick) {
                res = true;
                break;
            }
        }
        return res;
    }

    userStartsTyping(nick) {
        for (let userObj of this.joinedUsers) {
            if (userObj.nick === nick) {
                userObj.isTyping = true;
                break;
            }
        }
    }

    userStopsTyping(nick) {
        for (let userObj of this.joinedUsers) {
            if (userObj.nick === nick) {
                userObj.isTyping = false;
                break;
            }
        }
    }

    bindEvents() {
        this.io.on('connection', (socket) => {
            helpers.log('INFO: User Connected', socket.request.connection.remoteAddress);
            socket.on('join', (user) => {
                if (this.usersWrapper.areUserDataCorrect(user.nick, user.password)) {
                    this.io.emit('joined', {
                        nick: user.nick
                    });
                    this.userJoined(user.nick, {
                        id: socket.id,
                        ip: socket.request.connection.remoteAddress
                    });
                    helpers.log('INFO:', user.nick, 'joined', socket.request.connection.remoteAddress);
                }
                socket.on('disconnect', () => {
                    helpers.log('INFO:', user.nick, 'disconnected', socket.request.connection.remoteAddress);
                    this.userDisconnected(socket.id);
                    this.io.emit('users', this.getConnectedUsers());
                });
                if (!this.isUserJoined(user.nick)) {
                    socket.disconnect();
                } else {
                    this.io.emit('users', this.getConnectedUsers());
                }
                socket.on('message sent', (data) => {
                    data.date = helpers.getCurrentHour();
                    this.userStopsTyping(data.nick);
                    this.io.emit('chat message', data);
                    this.io.emit('users', this.getConnectedUsers());
                });
                socket.on('get users', () => {
                    socket.emit('users', this.getConnectedUsers());
                });
                socket.on('user start typing', (data) => {
                    this.userStartsTyping(data.nick);
                    this.io.emit('users', this.getConnectedUsers());
                });
                socket.on('user stops typing', (data) => {
                    this.userStopsTyping(data.nick);
                    this.io.emit('users', this.getConnectedUsers());
                })
            });
        });
    }

    startListening() {
        this.usersWrapper.fetch(this.bindEvents.bind(this));
    }
}

module.exports = SocketIOWrapper;