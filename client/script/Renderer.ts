import {Game} from './Game';

export class Renderer {
    private game: Game;
    private canvas: HTMLCanvasElement;
    private backgroundImage: HTMLImageElement;
    
    constructor(game: Game) { 
        this.game = game;
        this.backgroundImage = new Image();
        let bgReady = false;

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
        $(this.canvas).attr('id','game');
        $(this.canvas).width(width - 25);
        $(this.canvas).height(height - 25);
        
        $(this.canvas).attr('width', width - 25);
        $(this.canvas).attr('height', height - 25);
        $(document.head).append($('<audio src="sound/backtrack.mp3" autoplay loop />')); 
        $(document.body).append($(this.canvas));
        
        // set keydown and keyup event handler
        // $(document).keydown(keydown)
        // $(document).keyup(keyup);
        
        // function keydown(e) {
        //     Game.PressedKeys[e.keyCode] = true;
        // }
        // function keyup(e) {
        //     Game.PressedKeys[e.keyCode] = false;
        // }
        
        $(document.body).append(this.canvas);
    }
}