/*
var totalTime = 0;
var updateTime = 0;
var totalFrames = 0;
var updateFrames = 0;
var FPSavg = 0;
var FPScur = 0;
*/

/* last update */
var then;


/*
 * This is the timer fo Game Loop
 */
var idTimer;

/* Funzione di aggiornamento */
function GameLoop() {
    
    var now = new Date();
    var delta = now - then;
    
    /* This is used to update frame rate
    totalTime += delta;
    updateTime += delta;
    totalFrames++;
    updateFrames++;
    
    if (updateTime > 1000) {
        FPSavg = 1000 * totalFrames / totalTime;
        FPScur = 1000 * updateFrames / updateTime;
        updateTime = 0;
        updateFrames =0;
    }
    */
    
    Update(delta / 1000);
    
    Draw();
    
    then = now;
}


function Update(delta) {
    
    Shoots = Game.getShoots(1);
    
    for (i in Shoots) 
        Shoots[i].Update(delta);
    
    Shoots = Game.getShoots(2);
    for (i in Shoots) 
        Shoots[i].Update(delta);
    
    UpdateInput(delta); 
}

/* Aggiornamento dei tasti premuti */
function UpdateInput(delta) {

    PressedKeys = Game.PressedKeys;
    player1 = Game.getPlayer(1);
    player2 = Game.getPlayer(2);
    
    /* First Ship */
    if (PressedKeys[37] == true) {
        /* left arrow */
        player1.goLeft(delta)
    }

    if (PressedKeys[38] == true) {
        // up arrow
        player1.goUp(delta);
    }

    if (PressedKeys[39] == true) {
        /* right arrow */
        player1.goRight(delta);
    }
    
    
    if (PressedKeys[40] == true) {
        /* down arrow */
        player1.goDown(delta);
    }
    
    
    if ( PressedKeys[80] == true ) {
        /* Shoot */
        player1.Shoot();
    }


    /* Second ship */
    /* WASD SpaceBar */
    if (PressedKeys[65] == true) {
        /* left arrow */
        player2.goLeft(delta)
    }
    
    
    if (PressedKeys[87] == true) {
        // up arrow
        player2.goUp(delta);
    }


    if (PressedKeys[68] == true) {
        /* right arrow */
        player2.goRight(delta)
    }
    
    
    if (PressedKeys[83] == true) {
        // down arrow
        player2.goDown(delta);
    }
    
    
    if (PressedKeys[32] == true) {
        /* Shoot */
        player2.Shoot();
    }
}

function Draw() {
    
    var ctx = Canvas.getContext('2d');
    
    ctx.drawImage( Game.getBackground() , 0 , 0, Canvas.width , Canvas.height );
    
    Shoots = Game.getShoots(1);
    for (i in Shoots)
        Shoots[i].Draw(ctx);
        
    Shoots = Game.getShoots(2);
    for (i in Shoots)
        Shoots[i].Draw(ctx);
      
    player1 = Game.getPlayer(1);
    player2 = Game.getPlayer(2); 
    player1.Draw(ctx);
    player2.Draw(ctx);

    /* Drawing life points */    
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";

    ctx.textBaseline = "bottom";
    ctx.fillText("Life: " + Math.round( (player1.life * 100 ) / player1.ship.stats.life ) + '%'  , 4 , Canvas.height);

    ctx.textBaseline = "top";
    ctx.fillText("Life: " + Math.round( (player2.life * 100 ) / player2.ship.stats.life  ) + '%' , 4 , 0 );
 
 /*   
    ctx.textBaseLine = "center";
    ctx.fillText("FPS Average: " +  Math.round(FPSavg) , 0 , Canvas.height/2 );
    ctx.fillText("FPS Current: " +  Math.round(FPScur) , 0 , Canvas.height/2 + 20 );
*/
}