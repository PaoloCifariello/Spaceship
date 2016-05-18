import { Game } from './Game';

export class ClientSocket {
    private socket: SocketIOClient.Socket;
    private game: Game;
    
    constructor(game: Game) {
        this.game = game;
    }
    
    public initialize() {
        this.socket = io();
        this.socket.on("game found", this.onGameFound)
    }
    
    public lookForGame() {
        this.socket.emit("find match");
    }
    
    private onGameFound(data) {
        console.log("Game found");
    }
}