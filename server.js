var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();

var options = {
    key: fs.readFileSync('./server/cert.pem'),
    cert: fs.readFileSync('./server/cert.crt')
};

var server = https.createServer(options, app);
var io = require('socket.io')(server);

var conf = require('./app/config');
var users = require('./server/users');
var helpers = require('./server/helpers');

var connectedUsers = [];

io.on('connection', function (socket) {
    console.log('INFO: User Connected', socket.request.connection.remoteAddress);
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
                console.log('INFO:', user.nick, 'joined', socket.request.connection.remoteAddress);
                return false;
            }
        });
        socket.on('disconnect', () => {
            for (let i = 0; i < connectedUsers.length; i += 1) {
                if (connectedUsers[i].id === socket.id) {
                    connectedUsers.splice(i, 1);
                    break;
                }
            }
            io.emit('users', connectedUsers);
        });
        if (!joined) {
            console.log('INFO: join failed', user);
            socket.disconnect();
        } else {
            io.emit('users', connectedUsers);
        }
    });
    socket.on('message sent', function (data) {
        data.date = helpers.getCurrentHour();
        io.emit('chat message', data);
    });
    socket.on('get users', () => {
        socket.emit('users', connectedUsers);
    });
});

server.listen(conf.socketPort, function () {
    console.log('server up and running at %s port', conf.socketPort);
});