/// <reference path="typings/main.d.ts" />
import { ApplicationConfiguration } from './config/ApplicationConfiguration';

import { GameServer } from './GameServer';

// Setting up Web Server
var game = new GameServer();
game.initialize();
game.start();