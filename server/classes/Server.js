var helpers = require('../helpers');

var SocketIOWrapper = require('./SocketIOWrapper');

class Server {
    constructor(config) {
        this.config = config;
    }

    startHttpsServer() {
        let fs = require('fs');
        let https = require('https');
        let express = require('express');
        let app = express();

        let options = {
            key: fs.readFileSync('./server/cert.pem'),
            cert: fs.readFileSync('./server/cert.crt')
        };

        this.httpsServer = https.createServer(options, app);
    }

    start() {
        this.startHttpsServer();
        this.socketIOWrapper = new SocketIOWrapper(this.httpsServer);
        this.httpsServer.listen(this.config.socketPort, () => {
            helpers.log('Server up and running at port:', this.config.socketPort);
            this.socketIOWrapper.startListening();
        });
    }
}

module.exports = Server;