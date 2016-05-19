import {Player} from './Player';

export class Match {
    private player1: Player;
    private player2: Player;
    
    constructor(player1: Player, player2: Player) {
        this.player1 = player1;
        this.player2 = player2;
    }
    
    public initialize() {
        this.player1.send('match found', {});
        this.player2.send('match found', {});
        this.player1.on('ship select', (data) => this.onShipSelect.call(this, this.player1, data));
        this.player2.on('ship select', (data) => this.onShipSelect.call(this, this.player2, data));
    }
    
    private onShipSelect(player, data) {
        player.addShip(data.shipId);
        
        if (this.player1.ship() !== null && this.player2.ship() !== null) {
            this.start();
        }
    }
    
    private start() {
        console.log(this.player1.ship());
        console.log(this.player2.ship());
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
    }
}