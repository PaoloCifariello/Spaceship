import {Player} from './Player';
import {GameServer} from './GameServer';
import {Point} from './Point';
import {GameConfiguration} from './config/GameConfiguration';

export class Match {
    private player1: Player;
    private player2: Player;
    
    private lastUpdate: number;
    
    constructor(game: GameServer, player1: Player, player2: Player) {
        this.player1 = player1;
        this.player2 = player2;
        
        this.player1.setPosition(Point.fromPoint(GameConfiguration.PLAYER1_INITIAL_POSITION));
        this.player2.setPosition(Point.fromPoint(GameConfiguration.PLAYER2_INITIAL_POSITION));
    }
    
    public onShipSelect(player, data) {
        player.ship = data.shipId;
        
        if (this.player1.ship !== null && this.player2.ship !== null) {
            this.start();
        }
    }
    
    private start() {
        this.player1.send('match start', {
            local: {
                "shipId": this.player1.ship
            }, 
            remote: {
                "shipId": this.player2.ship
            }
        });
        
        this.player2.send('match start', {
            local: {
                shipId: this.player2.ship
            }, 
            remote: {
                shipId: this.player1.ship
            }
        })
        
        this.lastUpdate = Date.now();
        setInterval(() => this.gameLoop.call(this), GameConfiguration.GAME_TIMEOUT);
    }
    
    private gameLoop() {
        var now = Date.now();
        var delta = now - this.lastUpdate;
        
        this.player1.update(delta);
        this.player2.update(delta);
        
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
            shoots: player1Shoots
        }, player2Pack = {
            x: this.player2.position.x,
            y: this.player2.position.y,
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
        
        this.lastUpdate = now;
    }
}