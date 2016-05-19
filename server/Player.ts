import {GameServer} from './GameServer';
import {Match} from './Match';
import {Point} from './Point';
import {Shoot} from './Shoot';

export class Player {
    private game: GameServer;
    private socket: SocketIO.Socket;
    private ID: string;
    private match: Match;
    private topLimit: number;
    private bottomLimit: number;
    private lastShoot: number = Date.now();

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
    public shoots: Shoot[] = [];
    public playerId: number;
    public ship: string = null;
    
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
    
    public removeShoot(shoot: Shoot) {
        let ind = this.shoots.indexOf(shoot);
        if (ind > -1) {
            this.shoots.splice(ind, 1);
        }
    }
      
    public addMatch(match: Match, playerId: number) {
        this.match = match;
        this.playerId = playerId;
        
        if(playerId == 1) {
            this.topLimit = 0;
            this.bottomLimit = 500;
        } else {
            this.topLimit = 500;
            this.bottomLimit = 1000;
        }
        
        this.send('match found', {});
        this.socket.on('ship select', (data) => this.match.onShipSelect.call(this.match, this, data));
    }
    
    public setPosition(position: Point) {
        this.position = position;
    }
    
    public send(message: string, data) {
        this.socket.emit(message, data);
    }
    
    private goUp(delta) {
        let limit = this.topLimit;
        
        if (this.position.y > limit) 
            this.position.y -= 1 * delta;
        if (this.position.y < limit)
            this.position.y = limit;
    }
    
    private goLeft(delta) {
        let limit = 0;
        
        if (this.position.x > limit) 
            this.position.x -= 1 * delta;
        if (this.position.x < limit)
            this.position.x = limit;
    }
    
    private goDown(delta) {
        let limit = this.bottomLimit;
        
        if (this.position.y < limit) 
            this.position.y += 1 * delta;
        if (this.position.y > limit)
            this.position.y = limit;
    }
    
    private goRight(delta) {
        let limit = 1000;
        
        if (this.position.x < limit) 
            this.position.x += 1 * delta;
        if (this.position.x > limit)
            this.position.x = limit;
    }
    
    private shoot() {
        let now = Date.now();

        if ((now - this.lastShoot) < 500)
            return;

        this.shoots.push(new Shoot(this));
        this.lastShoot = now;
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
        if (this.input.backspace) {
            this.shoot();
        }
        
        let nextShoots = [];
        this.shoots.forEach((shoot) => {
           shoot.update(delta);
           if (shoot.isVisible()) {
               nextShoots.push(shoot); 
           }
        });
        
        this.shoots = nextShoots;
    }
}