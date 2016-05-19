import {Renderer} from './Renderer';
import {Point} from './Point';

export class Player {
    private shipId: number;
    public position: Point;
    
    constructor(shipId) {
        this.shipId = shipId;
        this.position = new Point(50, 50);
    }
    
    public draw(renderer: Renderer) {
        renderer.drawShip(this.shipId, {
            x: this.position.x,
            y: this.position.y,
            dx: 140,
            dy: 76 
        })
    }
}