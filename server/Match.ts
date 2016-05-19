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
        player.addShip(data.shipId);
        
        if (this.player1.ship() !== null && this.player2.ship() !== null) {
            this.start();
        }
    }
    
    private start() {
        this.player1.send('match start', {
            local: {
                "shipId": this.player1.ship()
            }, 
            remote: {
                "shipId": this.player2.ship()
            }
        });
        
        this.player2.send('match start', {
            local: {
                shipId: this.player2.ship()
            }, 
            remote: {
                shipId: this.player1.ship()
            }
        })
        
        this.lastUpdate = new Date().getTime();
        setInterval(() => this.gameLoop.call(this), GameConfiguration.GAME_TIMEOUT);
    }
    
    private gameLoop() {
        var now = new Date().getTime();
        var delta = now - this.lastUpdate;
        
        this.player1.update(delta);
        this.player2.update(delta);

        this.player1.send('update', {
            localPlayer: {
                x: this.player1.position.x,
                y: this.player1.position.y
            }, remotePlayer: {
                x: this.player2.position.x,
                y: this.player2.position.y
            }
        });
        
        this.player2.send('update', {
            localPlayer: {
                x: this.player2.position.x,
                y: this.player2.position.y
            }, remotePlayer: {
                x: this.player1.position.x,
                y: this.player1.position.y
            }
        });
        
        this.lastUpdate = now;
    }
}