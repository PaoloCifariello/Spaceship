export class Point {
    public x: number;
    public y: number;
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    public static zeroPoint() {
        return new Point(0, 0);
    }
    
    public static fromPoint(p: Point) {
        let point = new Point(p.x, p.y);
        return point;
    }
}