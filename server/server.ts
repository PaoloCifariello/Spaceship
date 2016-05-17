/// <reference path="typings/main.d.ts" />
import ApplicationConfiguration = require('./config/ApplicationConfiguration');

import WebServer = require('./WebServer');

// Setting up Web Server
var app = new WebServer();
app.Initialize();

// launch Web server
app.Listen();