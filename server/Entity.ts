import {Point} from './Point';

export class Entity {
    public position: Point;
    public speed: Point;
    public topLimit: number;
    public bottomLimit: number;
    
    constructor() {
        this.speed = Point.zeroPoint();
        this.position = Point.zeroPoint();
        this.topLimit = 0;
        this.bottomLimit = 1000;
    }
    
    public update(delta: number) {
        this.updatePosition(delta);
    }
    
    public updatePosition(delta: number) {
        this.position.x += this.speed.x * delta;
        this.position.y += this.speed.y * delta;
        
        if (this.position.x < 0)
            this.position.x = 0;
        else if (this.position.x > 1000)
            this.position.x = 1000;
        
        if (this.position.y < this.topLimit)
            this.position.y = this.topLimit;
        else if (this.position.y > this.bottomLimit)
            this.position.y = this.bottomLimit;
    }
    
    public getDistance(pt: Point): number {
        return Math.sqrt(Math.pow(this.position.x - pt.x, 2) + Math.pow(this.position.y - pt.y, 2));
    }
    
    public isVisible() {
        return this.position.y > 0 && this.position.y < 1000;
    }
}