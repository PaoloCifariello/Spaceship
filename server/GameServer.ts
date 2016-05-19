import {WebServer} from './WebServer';
import {ServerSocket} from './ServerSocket';
import {Player} from './Player';
import {Match} from './Match';

export class GameServer {
    private webServer: WebServer;
    private serverSocket: ServerSocket
    private players: {[Identifier: string]: Player} = {};
    private lookingForMatch: Player = null;
    
    constructor() {
        this.webServer = new WebServer(this);
        this.serverSocket = new ServerSocket(this, this.webServer);
    }
    
    public initialize() {
       this.webServer.initialize();
       this.serverSocket.initialize(); 
    }
    
    public start() {
        this.webServer.listen();
    }
    
    public newPlayer(socket: SocketIO.Socket) {
        let p = new Player(this, socket);
        p.initialize();
        this.players[socket.id] = p;
        console.log("New Player connected " + p.id());
    }
    
    public removePlayer(player: Player) {
        let p = this.players[player.id()]
        
        if (p) {
            delete this.players[player.id()];
        }
        
        if (this.lookingForMatch == p) {
            this.lookingForMatch = null;
        }
        
        console.log("Player disconnected " + p.id());
    }
    
    public findMatch(player: Player) {
        if (this.lookingForMatch == null || this.lookingForMatch == player) {
            this.lookingForMatch = player;
        } else {
            let p1 = this.lookingForMatch;
            let p2 = player;
            
            this.lookingForMatch = null;
            
            this.newMatch(p1, p2);
        }
    }
    
    private newMatch(p1: Player, p2: Player) {
        let match = new Match(this, p1, p2);
        p1.addMatch(match);
        p2.addMatch(match);
    }
}