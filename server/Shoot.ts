import {Player} from './Player';
import {Point} from './Point';

export class Shoot {
    private player: Player;
    private speed: number;
    public position: Point;
    
    constructor(player: Player) {
        this.player = player;
        this.position = Point.fromPoint(this.player.position);
        
        if (player.playerId == 1) {
            this.speed = 1;
        } else {
            this.speed = -1;
        }
    }
    
    public update(delta) {
        this.position.y += this.speed*delta;
    }
    
    public isVisible() {
        return this.position.y > 0 && this.position.y < 1000;
    }
    public draw() {
        
    }
}