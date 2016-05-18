import {GameServer} from './GameServer';
import {Match} from './Match';

export class Player {
    private game: GameServer;
    private socket: SocketIO.Socket;
    private ID: string;
    private Ship: string;
    private match: Match;
    
    constructor(game: GameServer, socket: SocketIO.Socket) {
        this.game = game;
        this.socket = socket;
        this.ID = socket.id;
    }
    
    public initialize() {
        this.socket.on('find match', (data) => this.onFindMatch.call(this, data));
        this.socket.on('disconnect', () => this.onDisconnect.call(this));
    }   
    
    private onFindMatch(data) {
        this.game.findMatch(this);
    }

    private onDisconnect() {
        this.game.removePlayer(this);
    }
    
    public id(): string {
        return this.ID;
    }
    
    public ship(): string {
        return this.Ship;
    }
      
    public addMatch(match: Match) {
        this.match = match;    
    }
    
    public addShip(ship: string) {
        this.Ship = ship;
    }
    
    public on(event: string, callback) {
        this.socket.on(event, callback);
    }
    
    public send(message: string, data) {
        this.socket.emit(message, data);
    }
}