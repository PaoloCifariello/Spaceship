import * as io from 'socket.io';


export class ServerSocket {
    private WebServer;
    private serverSocket;

    private lookingForMatch = null;

    public constructor(WebServer) {
        this.WebServer = WebServer;
    }

    public Initialize() {
        this.serverSocket = io(this.WebServer.HTTPServer);
        this.serverSocket.on('connection', (socket) => this.onSocketConnection.call(this, socket));
    }

    private onSocketConnection(socket) {
        socket.on('find match', (data) => this.onLookForMatch.call(this, socket, data));
        socket.on('disconnect', () => this.onDisconnect.call(this, socket));
    }

    private onLookForMatch(socket, data) {
        if (this.lookingForMatch == null) {
            this.lookingForMatch = socket;
        } else if (this.lookingForMatch != socket) {
            socket.emit('match found');
            this.lookingForMatch
            console.log("new match between " + socket.id + this.lookingForMatch.id);
        }
    }

    private onDisconnect(socket) {
        if (this.lookingForMatch == socket) {
            this.lookingForMatch = null;
        }
    }
}
