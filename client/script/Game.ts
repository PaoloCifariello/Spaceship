import {ClientSocket} from './ClientSocket';
import {Player} from './Player';
import {Renderer} from './Renderer';
import {Point} from './Point';
import {Bullet} from './Bullet';

export class Game {
    private canvas: HTMLCanvasElement;
    private clientSocket: ClientSocket;
    private renderer: Renderer;
    private timerId: number;
    private lastTiming: number;
    
    private localPlayer: Player;
    private remotePlayer: Player;
    
    private lastUpdateId = 0;

    constructor() {
        this.clientSocket = new ClientSocket(this);
        this.renderer = new Renderer(this);
    }
    
    public initialize() {
        this.clientSocket.initialize();
        
        $('#cerca').click(() => {
            this.lookForGame.call(this)
            $('#cerca').prop("disabled",true);
        });
    }
    
    private lookForGame() {
        this.clientSocket.lookForGame();
    }
    
    public chooseShip(shipId) {
        this.clientSocket.send('ship select', {
            shipId: shipId
        });
    }
    
    public refresh(data) {
        console.log(new Date().getTime() + ": Game update");
        this.localPlayer.position = new Point(data.localPlayer.x, data.localPlayer.y);
        let shoots = [];
        
        data.localPlayer.shoots.forEach((shoot) => {
            let bullet = new Bullet(this.localPlayer)
            bullet.position.x = shoot.x;
            bullet.position.y = shoot.y;
            bullet.speed.x = shoot.vx;
            bullet.speed.y = shoot.vy;
            shoots.push(bullet);
        });
        
        this.localPlayer.shoots = shoots;
        
        this.remotePlayer.position = new Point(data.remotePlayer.x, data.remotePlayer.y);
        this.remotePlayer.input = data.remotePlayer.input;
        
        shoots = [];
        
        data.remotePlayer.shoots.forEach((shoot) => {
            let bullet = new Bullet(this.remotePlayer)
            bullet.position.x = shoot.x;
            bullet.position.y = shoot.y;
            bullet.speed.x = shoot.vx;
            bullet.speed.y = shoot.vy;
            shoots.push(bullet);
        });
        
        this.remotePlayer.shoots = shoots;
    }
    
    public start(matchData) {
        this.localPlayer = new Player(matchData.local.playerId, matchData.local.shipId);
        this.remotePlayer = new Player(matchData.remote.playerId, matchData.remote.shipId);
        
        this.renderer.initializeScenario();
        
        // set keydown and keyup event handler
        $(document).keydown((event) => this.keydown.call(this, event))
        $(document).keyup((event) => this.keyup.call(this, event))
        
        this.lastTiming = Date.now();
        this.timerId = setInterval(() => this.gameLoop.call(this), 1);
    }
    
    public gameLoop() {
        let actualTiming = Date.now();
        let delta = actualTiming - this.lastTiming;
        
        this.update(delta);
        this.draw();
        
        this.lastTiming = actualTiming; 
    }
    
    public update(delta) {
        this.localPlayer.update(delta);
        this.remotePlayer.update(delta);
    }
    
    public draw() {
        this.renderer.drawBackground();
        this.localPlayer.draw(this.renderer);
        this.remotePlayer.draw(this.renderer)
        
        //this.renderer.drawLifeBars()
        
    }
    
    public onGameFound(data) {
        this.renderer.initializeShipChoice();
    }
    
    private sendUpdate() {
        
        
        this.clientSocket.send('input update', {
            id: this.lastUpdateId++,
            input: this.localPlayer.input,
            lastUpdateId: this.lastUpdateId++
        });   
    }
    
    public keydown(event: JQueryEventObject) {
        let updated = this.updateInput(event.keyCode, true);
        
        if (updated)
            this.sendUpdate();            
    }
        
    public keyup(event: JQueryEventObject) {
        let updated = this.updateInput(event.keyCode, false);
        
        if (updated)
            this.sendUpdate();
    }
    
    private updateInput(keyCode: number, value: boolean) {
        let inputChar = String.fromCharCode(keyCode).toLowerCase();
        
        if (["w", "a", "s", "d", " "].indexOf(inputChar) == -1)
            return false;
         
        if (inputChar == " ") inputChar = "backspace";
         
        if (this.localPlayer.input[inputChar] == value)
            return false;
        
        this.localPlayer.input[inputChar] = value;
        return true;
           
    }
}