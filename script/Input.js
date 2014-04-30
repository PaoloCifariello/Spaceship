/*
 * When we click on the ship 
 */
function ClickShip(ship) 
{
    var player1 = Game.getPlayer(1);
    
    if ( player1 ) 
    {
        /* Create new Ship and new Player 2 */
        var player2 = new Player( 2 , new Ship( ship.id ) );
        Game.setPlayer(2, player2);
        $(document.body).html("");

        /* Inizializza il canvas dopo la scelta della nave */
        Util.initializeScenario();

        var cnv = Game.Canvas;
        
        player1.posx = $(cnv).width() / 2;
        player1.posy = $(cnv).height() - player1.ship.stats.dy;
        
        player2.posx = $(cnv).width() / 2;
        player2.posy = 0;
        
        then = new Date();
    
        /* Start Game */
        Game.startGame(1);
    }

    else
    {
        /* Create new Ship and new Player 1 */
        player1 = new Player( 1 , new Ship( ship.id ) );
        Game.setPlayer(1 , player1 );
        
        $("#chooseTitle").text('Player 2 scegli la navicella:\nSpostati con W-A-S-D e spara con Backspace');
    }
}

function Over(obj)
{
    $(obj).width($(obj).width() * 1.5);
    $(obj).height($(obj).height() * 1.5);
}

function notOver(obj)
{
    $(obj).width($(obj).width() / 1.5);
    $(obj).height($(obj).height() / 1.5);
}