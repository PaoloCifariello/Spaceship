import http = require('http');
import express = require('express');
import morgan = require('morgan');

import { ServerSocket } from './ServerSocket';
import { WebServerConfiguration } from './config/WebServerConfiguration';

export class WebServer {
    private app: express.Express;
    private serverSocket : ServerSocket;
    private port: number;
    private routesInitializer = require('./routes/RoutesInitializer');

    public HTTPServer;

    constructor() {
        this.app = express();
        this.serverSocket = new ServerSocket(this);
        this.port = process.env.PORT || WebServerConfiguration.PORT;

        this.HTTPServer = http.createServer(this.app);
    }

    public Initialize() {
        // set up express application
        this.app.use(morgan('dev'));     // log every request to the console

        // web server routes
        this.routesInitializer.Initialize(this.app);

        // server socket initialization
        this.serverSocket.Initialize();
    } 

    public Listen() {
        this.HTTPServer.listen(this.port, () => {
            console.log('Process %s listening on port %d', process.pid, this.port);
        });
    }
}
