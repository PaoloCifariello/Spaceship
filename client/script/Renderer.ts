import {Game} from './Game';

let shipImages = {
    0: 'images/ship0.png',
    1: 'images/ship1.png',
    2: 'images/ship2.png',
    3: 'images/ship3.png',
    4: 'images/ship4.png',
    5: 'images/ship5.png'
};

export class Renderer {
    private game: Game;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private backgroundImage: HTMLImageElement;
    
    constructor(game: Game) { 
        this.game = game;
        this.backgroundImage = new Image();
        let bgReady = false;
        
        for (var i in shipImages) {
            let src = shipImages[i];
            shipImages[i] = new Image();
            shipImages[i].src = src;
        };

        this.backgroundImage.onload = function () {
            bgReady = true;
        };

        this.backgroundImage.src = "images/background.jpg";
    }
    
    public initializeShipChoice() {
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
        $(".SceltaImg").click((event) => this.onChooseShip.call(this, event));
    }
    
    private onChooseShip(event: JQueryEventObject) {
        $("#main").hide();
        this.game.chooseShip.call(this.game, event.target.id);
    }
    
    public initializeScenario() {
        let height = $(window).height();
        let width = $(window).width();
        
        $(document.body).html("");
        
        /* create, initialize and add canvas */
        this.canvas = $('<canvas />')[0] as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        $(this.canvas).attr('id','game');
        $(this.canvas).width(width - 25);
        $(this.canvas).height(height - 25);
        
        $(this.canvas).attr('width', width - 25);
        $(this.canvas).attr('height', height - 25);
        $(document.head).append($('<audio src="sound/backtrack.mp3" autoplay loop />')); 
        $(document.body).append($(this.canvas));
                
        $(document.body).append(this.canvas);
    }
    
    public drawBackground() {
        this.ctx.drawImage( this.backgroundImage , 0 , 0, $(this.canvas).width() , $(this.canvas).height() );
    }
    
    public drawShip(shipId: number, pos: {x: number, y: number, dx: number, dy: number} ) {
        let shipImage = shipImages[shipId];
        
        let realX = pos.x * $(this.canvas).width() / 1000;
        let realY = pos.y * $(this.canvas).height() / 1000;
        this.ctx.drawImage(shipImage, realX, realY , pos.dx, pos.dy);
        this.ctx.globalAlpha = 1;
    }
}