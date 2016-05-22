import {Entity} from './Entity';
import {Player} from './Player';
import {Point} from './Point';
import {Renderer} from './Renderer';

export class Bullet extends Entity {
    private player: Player;
    
    constructor(player: Player) {
        super();
        this.player = player;
        this.position = Point.fromPoint(this.player.position);
        
        if (player.playerId == 1) {
            this.speed = new Point(0, 1);
        } else {
            this.speed = new Point(0, -1);
        }
    }
    
    public draw(renderer: Renderer) {
        renderer.drawShoot(this.position.x, this.position.y);
    }
}