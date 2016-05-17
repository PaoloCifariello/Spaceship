import http = require('http');
import express = require('express');
import morgan = require('morgan');

import ServerSocket = require('./ServerSocket');
import WebServerConfiguration = require('./config/WebServerConfiguration');

module Core {
    export class WebServer {
        private app : express.Express;
        private database;
        private serverSocket;
        private port: number;
        private RoutesInitializer = require('./routes/RoutesInitializer');

        public HTTPServer;

        constructor() {
            this.app = express();
            this.serverSocket = new ServerSocket(this, this.database);
            this.port = process.env.PORT || WebServerConfiguration.PORT;

            this.HTTPServer = http.createServer(this.app);
        }

        public Initialize() {
            // set up express application
            this.app.use(morgan('dev'));     // log every request to the console
            
            // web server routes
            this.RoutesInitializer.Initialize(this.app, this.database);

            // server socket initialization
            this.serverSocket.Initialize();
        }

        public Listen() {
            this.HTTPServer.listen(this.port, () => {
                console.log('Process %s listening on port %d', process.pid, this.port);
            });
        }
    };
}

export = Core.WebServer;
