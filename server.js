let Server = require('./server/classes/Server');

let config = require('./app/config');
let server = new Server(config);

server.start();