import * as io from 'socket.io';
import {WebServer} from './WebServer';
import {GameServer} from './GameServer';

export class ServerSocket {
    private game: GameServer;
    private webServer: WebServer;
    private serverSocket: SocketIO.Server;

    private lookingForMatch: SocketIO.Socket = null;

    public constructor(game: GameServer, webServer: WebServer) {
        this.game = game;
        this.webServer = webServer;
    }

    public initialize() {
        this.serverSocket = io(this.webServer.HTTPServer);
        this.serverSocket.on('connection', (socket: SocketIO.Socket) => this.onSocketConnection.call(this, socket));
    }

    private onSocketConnection(socket: SocketIO.Socket) {
        this.game.newPlayer(socket);
    }
}
