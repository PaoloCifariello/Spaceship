/*
 * When we click on the ship 
 */
function ClickShip(ship) 
{
    if (Players.p1) 
    {
        /* Create new Ship and new Player 2 */
        Players.p2 = new Player( 2 , new Ship( ship.id ) );

        document.body.innerHTML = "";

        /* Inizializza il canvas dopo la scelta della nave */
        InitializeScenario();

        Canvas = document.getElementById('game');
        
        Players.p1.posx = Canvas.width / 2;
        Players.p1.posy = Canvas.height - Players.p1.ship.stats.dy;
        
        Players.p2.posx = Canvas.width / 2;
        Players.p2.posy = 0;
        
        then = new Date();
    
        /* Start Game */
        Timer = setInterval( GameLoop ,  20 );
    }

    else
    {
        /* Create new Ship and new Player 1 */
        Players.p1 = new Player( 1 , new Ship( ship.id ) );
        
        document.getElementById('chooseTitle').innerText = 'Player 2 scegli la navicella:\nSpostati con A-D e spara con Backspace';
    }
}

function Over(obj)
{
    obj.width = (parseInt(obj.width) * 1.5);
    obj.height = (parseInt(obj.height) * 1.5);
}

function notOver(obj)
{
    obj.width = (parseInt(obj.width) / 1.5);
    obj.height = (parseInt(obj.height) / 1.5);
}

function KeyUp(e)
{
    PressedKeys[e.keyCode] = false;
}

function KeyDown(e)
{
    PressedKeys[e.keyCode] = true;
}