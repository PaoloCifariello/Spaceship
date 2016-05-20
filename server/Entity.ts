import {Point} from './Point';

export class Entity {
    public position: Point;
    public speed: Point;
    
    constructor() {
        this.speed = Point.zeroPoint();
        this.position = Point.zeroPoint();
    }
    
    public update(delta: number) {
        this.updatePosition(delta);
    }
    
    public updatePosition(delta: number) {
        this.position.x += this.speed.x * delta;
        this.position.y += this.speed.y * delta;
    }
    
    public getDistance(pt: Point): number {
        return Math.sqrt(Math.pow(this.position.x - pt.x, 2) + Math.pow(this.position.y - pt.y, 2));
    }
    
    public isVisible() {
        return this.position.y > 0 && this.position.y < 1000;
    }
}