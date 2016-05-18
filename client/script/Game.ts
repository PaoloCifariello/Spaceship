import { ClientSocket } from './ClientSocket';

export class Game {
    private canvas: HTMLCanvasElement;
    private clientSocket: ClientSocket;
    
    constructor() {
        this.clientSocket = new ClientSocket(this);
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
}