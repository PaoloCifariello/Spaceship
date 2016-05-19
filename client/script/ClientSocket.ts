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
        this.socket.on("match found", (data) => this.game.onGameFound.call(this.game, data));
        this.socket.on("match start", (data) => this.game.start.call(this.game, data));
    }
    
    public send(event: string, data) {
        this.socket.emit(event, data);
    }
}