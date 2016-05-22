import {Player} from './Player';
import {GameServer} from './GameServer';
import {Point} from './Point';
import {GameConfiguration} from './config/GameConfiguration';
import {Ship} from './Ship';

export class Match {
    private player1: Player;
    private player2: Player;
    
    private lastUpdate: number;
    
    constructor(game: GameServer, player1: Player, player2: Player) {
        this.player1 = player1;
        this.player2 = player2;
        
        this.player1.moveTo(GameConfiguration.PLAYER1_INITIAL_POSITION);
        this.player2.moveTo(GameConfiguration.PLAYER2_INITIAL_POSITION);
    }
    
    public onShipSelect(player: Player, data) {
        player.ship = new Ship(data.shipId);
        
        if (this.player1.ship !== null && this.player2.ship !== null) {
            this.start();
        }
    }
    
    private start() {
        this.player1.send('match start', {
            local: {
                playerId: this.player1.playerId,
                shipId: this.player1.ship.id
            }, 
            remote: {
                playerId: this.player2.playerId,
                shipId: this.player2.ship.id
            }
        });
        
        this.player2.send('match start', {
            local: {
                playerId: this.player2.playerId,
                shipId: this.player2.ship.id
            }, 
            remote: {
                playerId: this.player1.playerId,
                shipId: this.player1.ship.id
            }
        })
        
        this.lastUpdate = Date.now();
        setInterval(() => this.gameLoop.call(this), GameConfiguration.GAME_TIMEOUT);
    }
    
    public sendUpdate() {
        let player1Shoots = [];
        let player2Shoots = [];
        this.player1.shoots.forEach((shoot) => {
           player1Shoots.push({
               x: shoot.position.x,
               y: shoot.position.y
           }) 
        });
        this.player2.shoots.forEach((shoot) => {
           player2Shoots.push({
               x: shoot.position.x,
               y: shoot.position.y
           }) 
        });

        let player1Pack = {
            x: this.player1.position.x,
            y: this.player1.position.y,
            input: this.player1.input,
            shoots: player1Shoots
        }, player2Pack = {
            x: this.player2.position.x,
            y: this.player2.position.y,
            input: this.player2.input,
            shoots: player2Shoots 
        };
          
        
        this.player1.send('update', {
            localPlayer: player1Pack, 
            remotePlayer: player2Pack
        });
        
        this.player2.send('update', {
            localPlayer: player2Pack,
            remotePlayer: player1Pack
        });
    }
    
    private gameLoop() {
        var now = Date.now();
        var delta = now - this.lastUpdate;
        
        this.player1.update(delta);
        this.player2.update(delta);
        
        this.lastUpdate = now;
    }
}