import {Point} from './Point';

let ships = [
    { name: 'SirViper', vx: 1.5, vy: 1.5, life: 190, atk: 11, def: 8, vel: 380, ric: 440, dx: 140, dy: 76 },
    { name: 'Q-uore', vx: 1.3, vy: 1.5,life: 170, atk: 14, def: 3, vel: 420, ric: 500, dx: 140, dy: 76 },
    { name: 'Sharingo', vx: 1.4, vy: 1.5,life: 180, atk: 13, def: 5, vel: 360, ric: 460, dx: 140, dy: 76 },
    { name: 'NimRod', vx: 1, vy: 1.5,life: 200, atk: 11, def: 9, vel: 320, ric: 400, dx: 140, dy: 76 },
    { name: 'Solbadguy', vx: 1.25, vy: 1.5,life: 160, atk: 14, def: 5, vel: 350, ric: 400, dx: 140, dy: 76 },
    { name: 'Starship', vx: 1.6, vy: 1.5,life: 150, atk: 13, def: 5, vel: 200, ric: 300, dx: 140, dy: 76 }
];

export class Ship {
    public id: number;
    public speed: Point;
    private life: number;
    private attack: number;
    private defense: number;
    private shootSpeed: number;
    public shootInterval: number;
    
    constructor(shipId: number) {
        let ship = ships[shipId];
        
        this.id = shipId;
        this.speed = new Point(ship.vx, ship.vy);
        this.life = ship.life;
        this.attack = ship.atk;
        this.defense = ship.def;
        this.shootSpeed = ship.vel;
        this.shootInterval = ship.ric;
    }
}