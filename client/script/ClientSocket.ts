import {Game} from './Game';

export class ClientSocket {
    private socket: SocketIOClient.Socket;
    private game: Game;
    
    constructor(game: Game) {
        this.game = game;
    }
    
    public initialize() {
        this.socket = io();
    }
    
    public lookForGame() {
        this.socket.emit("find match");
        this.socket.on("match found", (data) => this.game.onGameFound.call(this.game, data))
    }
}