import {GameServer} from './GameServer';
import {Match} from './Match';
import {Point} from './Point';

export class Player {
    private game: GameServer;
    private socket: SocketIO.Socket;
    private ID: string;
    private Ship: string = null;
    private match: Match;
    private input: {
        w: boolean,
        a: boolean,
        s: boolean,
        d: boolean,
        backspace: boolean
    } = {
        w: false,
        a: false,
        s: false,
        d: false,
        backspace: false
    };
    
    public position: Point;
    
    constructor(game: GameServer, socket: SocketIO.Socket) {
        this.game = game;
        this.socket = socket;
        this.ID = socket.id;
    }
    
    public initialize() {
        this.socket.on('find match', (data) => this.onFindMatch.call(this, data));
        this.socket.on('disconnect', () => this.onDisconnect.call(this));
        this.socket.on('input update', (input) => this.onInputUpdate.call(this, input));
    }   
    
    private onFindMatch(data) {
        this.game.findMatch(this);
    }

    private onDisconnect() {
        this.game.removePlayer(this);
    }
    
    private onInputUpdate(input) {
        this.input = input;
    }
    
    public id(): string {
        return this.ID;
    }
    
    public ship(): string {
        return this.Ship;
    }
      
    public addMatch(match: Match) {
        this.match = match;
        this.send('match found', {});
        this.socket.on('ship select', (data) => this.match.onShipSelect.call(this.match, this, data));
    }
    
    public setPosition(position: Point) {
        this.position = position;
    }
    
    public addShip(ship: string) {
        this.Ship = ship;
    }
    
    public send(message: string, data) {
        this.socket.emit(message, data);
    }
    
    private goUp(delta) {
        
    }
    
    private goLeft(delta) {
        if (this.position.x > 0) 
            this.position.x -= 1 * delta;
        if (this.position.x < 0)
            this.position.x = 0;    
    }
    
    private goDown(delta) {
        
    }
    
    private goRight(delta) {
        var limit = 1000;
        
        if (this.position.x < limit) 
            this.position.x += 1 * delta;
        
        if (this.position.x > limit)
            this.position.x = limit;
    }
    
    public update(delta: number) {
        if (this.input.w) {
            this.goUp(delta);
        }
        
        if (this.input.a) {
            this.goLeft(delta);
        }
        
        if (this.input.s) {
            this.goDown(delta);
        }
        
        if (this.input.d) {
            this.goRight(delta);
        }
        
    }
}