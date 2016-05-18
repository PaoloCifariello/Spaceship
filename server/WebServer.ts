import http = require('http');
import express = require('express');
import morgan = require('morgan');

import { WebServerConfiguration } from './config/WebServerConfiguration';
import {GameServer} from './GameServer';

export class WebServer {
    private app: express.Express;
    private port: number;
    private routesInitializer = require('./routes/RoutesInitializer');

    public HTTPServer;

    constructor(game: GameServer) {
        this.app = express();
        this.port = process.env.PORT || WebServerConfiguration.PORT;

        this.HTTPServer = http.createServer(this.app);
    }

    public initialize() {
        // set up express application
        this.app.use(morgan('dev'));     // log every request to the console

        // web server routes
        this.routesInitializer.Initialize(this.app);
    } 

    public listen() {
        this.HTTPServer.listen(this.port, () => {
            console.log('Process %s listening on port %d', process.pid, this.port);
        });
    }
}
