import {ClientSocket} from './ClientSocket';
import {Player} from './Player';
import {Renderer} from './Renderer';
import {Point} from './Point';

export class Game {
    private canvas: HTMLCanvasElement;
    private clientSocket: ClientSocket;
    private renderer: Renderer;
    private timerId: number;
    private lastTiming: number;
    
    private localPlayer: Player;
    private remotePlayer: Player;
    
    private pressedKeys = {
        w: false,
        a: false,
        s: false,
        d: false,
        backspace: false
    };
    
    constructor() {
        this.clientSocket = new ClientSocket(this);
        this.renderer = new Renderer(this);
    }
    
    private getTiming() {
        return (new Date()).getMilliseconds();
    }
    
    public initialize() {
        this.localPlayer = new Player(1);
        this.remotePlayer = new Player(2);
        
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
        this.localPlayer.position = new Point(data.localPlayer.x, data.localPlayer.y);
        this.remotePlayer.position = new Point(data.remotePlayer.x, data.remotePlayer.y);
    }
    
    public start(matchData) {
        this.localPlayer = new Player(matchData.local.shipId);
        this.remotePlayer = new Player(matchData.remote.shipId);
        
        this.renderer.initializeScenario();
        
        // set keydown and keyup event handler
        $(document).keydown((event) => this.keydown.call(this, event))
        $(document).keyup((event) => this.keyup.call(this, event))
        
        this.lastTiming = this.getTiming();
        this.timerId = setInterval(() => this.gameLoop.call(this), 1);
    }
    
    public gameLoop() {
        let actualTiming = this.getTiming();
        let delta = actualTiming - this.lastTiming;
        
        this.update(delta);
        this.draw();
        
        this.lastTiming = actualTiming; 
    }
    
    public update(delta) {
        this.clientSocket.send('input update', this.pressedKeys);
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
    
    public keydown(event: JQueryEventObject) {
        console.log("keydown di " + event.keyCode);
        switch (event.keyCode) {
            case 87:
                this.pressedKeys.w = true;
                break;
            case 65:
                this.pressedKeys.a = true;
                break;
            case 83:
                this.pressedKeys.s = true;
                break;
            case 68:
                this.pressedKeys.d = true;
                break;
            case 32:
                this.pressedKeys.backspace = true;
                break;
        }
    }
        
    public keyup(event: JQueryEventObject) {
        switch (event.keyCode) {
            case 87:
                this.pressedKeys.w = false;
                break;
            case 65:
                this.pressedKeys.a = false;
                break;
            case 83:
                this.pressedKeys.s = false;
                break;
            case 68:
                this.pressedKeys.d = false;
                break;
            case 32:
                this.pressedKeys.backspace = false;
                break;
        }
    }
}