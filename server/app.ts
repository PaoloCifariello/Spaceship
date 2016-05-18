/// <reference path="typings/main.d.ts" />
import { ApplicationConfiguration } from './config/ApplicationConfiguration';

import { WebServer } from './WebServer';

// Setting up Web Server
var app = new WebServer();
app.Initialize();

// launch Web server
app.Listen();