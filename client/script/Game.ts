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
        this.localPlayer.position = new Point(data.localPlayer.x, data.localPlayer.y);
        this.localPlayer.shoots = data.localPlayer.shoots;
        this.remotePlayer.position = new Point(data.remotePlayer.x, data.remotePlayer.y);
        this.remotePlayer.input = data.remotePlayer.input;
        this.remotePlayer.shoots = data.remotePlayer.shoots;
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
    
    public keydown(event: JQueryEventObject) {
        switch (event.keyCode) {
            case 87:
                this.localPlayer.input.w = true;
                break;
            case 65:
                this.localPlayer.input.a = true;
                break;
            case 83:
                this.localPlayer.input.s = true;
                break;
            case 68:
                this.localPlayer.input.d = true;
                break;
            case 32:
                this.localPlayer.input.backspace = true;
                break;
        }
        
        this.clientSocket.send('input update', this.localPlayer.input);
    }
        
    public keyup(event: JQueryEventObject) {
        switch (event.keyCode) {
            case 87:
                this.localPlayer.input.w = false;
                break;
            case 65:
                this.localPlayer.input.a = false;
                break;
            case 83:
                this.localPlayer.input.s = false;
                break;
            case 68:
                this.localPlayer.input.d = false;
                break;
            case 32:
                this.localPlayer.input.backspace = false;
                break;
        }
        
        this.clientSocket.send('input update', this.localPlayer.input);
    }
}