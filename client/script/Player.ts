import {Renderer} from './Renderer';
import {Point} from './Point';
import {Entity} from './Entity';
import {Bullet} from './Bullet';
import {Ship} from './Ship';

export class Player extends Entity {
    private lastShoot: number = Date.now();
    
    public input: {
        w: boolean,
        a: boolean,
        s: boolean,
        d: boolean,
        backspace: boolean
    } = {
        w: false,
        a: false,
        s: false,
        d: false,
        backspace: false
    };
    
    public shoots: Bullet[] = [];
    public playerId: number;
    public ship: Ship;
    
    constructor(playerId, shipId) {
        super();
        this.playerId = playerId;
        this.ship = new Ship(shipId);
        this.position = new Point(50, 50);
        
        if(playerId == 1) {
            this.topLimit = 0;
            this.bottomLimit = 500;
        } else {
            this.topLimit = 500;
            this.bottomLimit = 1000;
        }
    }

    public removeShoot(shoot: Bullet) {
        let ind = this.shoots.indexOf(shoot);
        if (ind > -1) {
            this.shoots.splice(ind, 1);
        }
    }
    
    public moveTo(position: Point) {
        this.position.x = position.x;
        this.position.y = position.y;
    }
    
    private shoot() {
        let now = Date.now();

        if ((now - this.lastShoot) < this.ship.shootInterval)
            return;

        this.shoots.push(new Bullet(this));
        this.lastShoot = now;
    }
    
    public update(delta: number) {
        this.updateSpeed();
        super.update(delta);
       
        if (this.input.backspace) {
            this.shoot();
        }
       
        let nextShoots = [];
        this.shoots.forEach((shoot) => {
           shoot.update(delta);
           if (shoot.isVisible()) {
               nextShoots.push(shoot); 
           }
        });
        
        this.shoots = nextShoots;
    }
    
    public updateSpeed() {
        if (this.input.w) {
            this.speed.y = - this.ship.speed.y
        } else if (this.input.s) {
            this.speed.y = this.ship.speed.y;
        } else {
            this.speed.y = 0;
        }
        
        if (this.input.a) {
            this.speed.x = - this.ship.speed.x;
        } else if (this.input.d) {
            this.speed.x = this.ship.speed.x;
        } else {
            this.speed.x = 0;
        }
    }
    
        public draw(renderer: Renderer) {
        renderer.drawShip(this.ship.id, {
            x: this.position.x,
            y: this.position.y,
            dx: 140,
            dy: 76 
        });
        
        this.shoots.forEach((shoot) => shoot.draw(renderer));
    }
}