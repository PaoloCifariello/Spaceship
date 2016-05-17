// import cluster = require('cluster');

import ApplicationConfiguration = require('./config/ApplicationConfiguration');

import WebServer = require('./WebServer');
//import Database = require('./Database');
//import passportInitializer = require('./passport/PassportInitializer');

// Setting up Web Server
var app = new WebServer();
app.Initialize();

// launch Web server
app.Listen();


/* 
import express = require('express');

var port: number = process.env.PORT || 3000;
var app = express();

var renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
}
 
app.get('/*', renderIndex);
 
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});
*/