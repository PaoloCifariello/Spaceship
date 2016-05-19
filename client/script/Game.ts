import {ClientSocket} from './ClientSocket';
import {Player} from './Player';
import {Renderer} from './Renderer';

export class Game {
    private canvas: HTMLCanvasElement;
    private clientSocket: ClientSocket;
    private renderer: Renderer;
    private timerId: number;
    private lastTiming: number;
    
    private localPlayer: Player;
    private remotePlayer: Player;
    
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
    
    public start(matchData) {
        this.localPlayer = new Player(matchData.local.shipId);
        this.remotePlayer = new Player(matchData.remote.shipId);
        
        this.renderer.initializeScenario();
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
        console.log("Update " + delta);
    }
    
    public draw() {
        console.log("Draw");
    }
    
    public onGameFound(data) {
        this.renderer.initializeShipChoice();
    }
}