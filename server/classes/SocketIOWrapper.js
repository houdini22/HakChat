let helpers = require('../helpers');

var UsersWrapper = require('./UsersWrapper');

class SocketIOWrapper {
    constructor(httpsServer) {
        this.io = require('socket.io')(httpsServer);
        this.usersWrapper = new UsersWrapper();
        this.joinedUsers = [];
        this.channels = [{
            name: 'general',
            joinedUsers: []
        }];
    }

    userJoinedChannel(nick, channelName, additionalFields) {
        let user = this.usersWrapper.getUserByNick(nick);
        let keys = Object.keys(additionalFields);
        let pushed = false;
        for (let key of keys) {
            user[key] = additionalFields[key];
        }
        this.channels.forEach((channel) => {
            if (channel.name === channelName) {
                channel.joinedUsers.push(user);
                pushed = true;
                return false;
            }
        });
        if (!pushed) {
            this.channels.push({
                name: channelName,
                joinedUsers: [user]
            });
        }
        return this;
    }

    userDisconnected(socketId) {
        this.channels.forEach((channel, i) => {
            channel.joinedUsers.forEach((user, j) => {
                if (user.id === socketId) {
                    this.channels[i].joinedUsers.splice(j, 1);
                    return false;
                }
            });
        });
        return this.channels;
    }

    userStartsTyping(nick, channelName) {
        this.channels.forEach((channel, i) => {
            if (channel.name === channelName) {
                channel.joinedUsers.forEach((user, j) => {
                    if (user.nick === nick) {
                        user.isTyping = true;
                        return false;
                    }
                });
            }
        });
    }

    userStopsTyping(nick, channelName) {
        this.channels.forEach((channel) => {
            if (channel.name === channelName) {
                channel.joinedUsers.forEach((user) => {
                    if (user.nick === nick) {
                        user.isTyping = false;
                        return false;
                    }
                });
            }
        });
    }

    userLeavesChannel(nick, channelName) {
        this.channels.forEach((channel, i) => {
            if (channel.name === channelName) {
                channel.joinedUsers.forEach((user, j) => {
                    if (user.nick === nick) {
                        this.channels[i].joinedUsers.splice(j, 1);
                        return false;
                    }
                });
                if (channel.joinedUsers.length === 0 && channel.name !== 'general') {
                    this.channels.splice(i, 1);
                }
            }
        });
    }

    getChannels(nick) {
        let result = this.channels.concat();
        result.forEach((channel, i) => {
            let clone = JSON.parse(JSON.stringify(channel)); // TODO: fix it
            clone.joinedUsers.forEach((user) => {
                delete user.id;
                delete user.password;
            });
            clone.joinedUsers.sort((a, b) => {
                if (a.nick < b.nick) return -1;
                if (a.nick > b.nick) return 1;
                return 0;
            });
            result[i] = clone;
        });
        return result;
    }

    userCreatesChannel(name) {
        this.channels.push({
            name,
            joinedUsers: []
        });
        return this;
    }

    bindEvents() {
        this.io.on('connection', (socket) => {
            helpers.log('INFO: User Connected', socket.request.connection.remoteAddress);
            socket.once('join', (user) => {
                if (this.usersWrapper.areUserDataCorrect(user.nick, user.password)) {
                    this.io.emit('joined', {
                        nick: user.nick
                    });
                    this.io.emit('channels', this.getChannels(user.nick));
                    helpers.log('INFO:', user.nick, 'joined', socket.request.connection.remoteAddress);
                } else {
                    socket.disconnect();
                }
                socket.on('join channel', (data) => {
                    this.userJoinedChannel(data.nick, data.channel, {
                        id: socket.id,
                        ip: socket.request.connection.remoteAddress
                    });
                    socket.emit('joined channel', {
                        name: data.channel
                    });
                    this.io.emit('channels', this.getChannels(data.nick));
                    this.io.emit('system message', {
                        type: 'SYSTEM_MESSAGE',
                        subType: 'USER_JOINED',
                        nick: data.nick,
                        date: helpers.getCurrentHour(),
                        channel: data.channel
                    });
                    helpers.log('INFO:', user.nick, 'joined channel', data.channel, socket.request.connection.remoteAddress);
                });
                socket.on('disconnect', () => {
                    helpers.log('INFO:', user.nick, 'disconnected', socket.request.connection.remoteAddress);
                    let channels = this.userDisconnected(socket.id);
                    this.io.emit('channels', this.getChannels(user.nick));
                    channels.forEach((name) => {
                        this.io.emit('system message', {
                            type: 'SYSTEM_MESSAGE',
                            subType: 'USER_DISCONNECTED',
                            nick: user.nick,
                            date: helpers.getCurrentHour(),
                            channel: name
                        });
                    });
                    socket.removeAllListeners('join');
                    socket.removeAllListeners('join channel');
                    socket.removeAllListeners('message sent');
                    socket.removeAllListeners('user starts typing');
                    socket.removeAllListeners('user stops typing');
                    socket.removeAllListeners('get channels');
                    socket.removeAllListeners('leave channel');
                    socket.removeAllListeners('create channel');
                    socket.removeAllListeners('disconnect');
                });

                socket.on('message sent', (data) => {
                    data.date = helpers.getCurrentHour();
                    this.io.emit('chat message', data);
                    this.userStopsTyping(data.nick, data.channel);
                    this.io.emit('channels', this.getChannels(data.nick));
                });
                socket.on('user starts typing', (data) => {
                    this.userStartsTyping(data.nick, data.channel);
                    this.io.emit('channels', this.getChannels(data.nick));
                });
                socket.on('user stops typing', (data) => {
                    this.userStopsTyping(data.nick, data.channel);
                    this.io.emit('channels', this.getChannels(data.nick));
                });
                socket.on('get channels', (data) => {
                    this.io.emit('channels', this.getChannels(data.nick));
                });
                socket.on('leave channel', (data) => {
                    this.userLeavesChannel(data.nick, data.channel);
                    this.io.emit('system message', {
                        type: 'SYSTEM_MESSAGE',
                        subType: 'USER_LEFT_CHANNEL',
                        nick: data.nick,
                        date: helpers.getCurrentHour(),
                        channel: data.channel
                    });
                    this.io.emit('channels', this.getChannels(data.nick));
                    helpers.log('INFO:', user.nick, 'leaves channel', data.channel, socket.request.connection.remoteAddress);
                });
                socket.on('create channel', (data) => {
                    this.userCreatesChannel(data.name);
                    this.io.emit('channels', this.getChannels(data.nick));
                    this.io.emit('channel created', {
                        name: data.name,
                        nick: data.nick
                    });
                    helpers.log('INFO:', user.nick, 'creates channel', data.channel, socket.request.connection.remoteAddress);
                });
            });
        });
    }

    startListening() {
        this.usersWrapper.fetch(this.bindEvents.bind(this));
    }
}

module.exports = SocketIOWrapper;