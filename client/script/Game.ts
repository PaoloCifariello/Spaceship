import {ClientSocket} from './ClientSocket';
import {Player} from './Player';

export class Game {
    private canvas: HTMLCanvasElement;
    private clientSocket: ClientSocket;
    
    private localPlayer: Player;
    private remotePlayer: Player;
    
    constructor() {
        this.clientSocket = new ClientSocket(this);
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
    
    public chooseShip() {
        
    }
    
    public onGameFound(data) {
        $('#prematch').hide();
        $('#main').show();
        $(".SceltaImg").mouseover(function(event) {
            let obj = event.target;
            $(obj).width($(obj).width() * 1.5);
            $(obj).height($(obj).height() * 1.5);
        });
        $(".SceltaImg").mouseout(function(event) {
            let obj = event.target;
            $(obj).width($(obj).width() / 1.5);
            $(obj).height($(obj).height() / 1.5);
        });
    }
}