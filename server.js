var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var conf = require('./src/config');
var users = require('./server/users');
var helpers = require('./server/helpers');

var connectedUsers = [];

io.on('connection', function (socket) {
    console.log('INFO: User Connected');
    socket.on('join', function (user) {
        var joined = false;
        users.forEach(function (savedUser) {
            if (savedUser.nick === user.nick && savedUser.password === user.password) {
                io.emit('joined', {
                    nick: user.nick
                });
                connectedUsers.push({
                    nick: user.nick,
                    id: socket.id,
                    ip: socket.request.connection.remoteAddress
                });
                joined = true;
                console.log('INFO:', user.nick, 'joined');
            }
        });
        if (!joined) {
            console.log('INFO: join failed');
            socket.emit('join failed');
        }
        socket.on('disconnect', () => {
            for (let i = 0; i < connectedUsers.length; i += 1) {
                if (connectedUsers[i].id === socket.id) {
                    connectedUsers.splice(i, 1);
                }
            }
            io.emit('users', connectedUsers);
        });
    });
    socket.on('message sent', function (data) {
        data.date = helpers.getCurrentDate();
        io.emit('chat message', data);
    });
    socket.on('get users', () => {
        socket.emit('users', connectedUsers);
    });
});

http.listen(conf.socketPort, function () {
    console.log('listening on', conf.socketPort);
});