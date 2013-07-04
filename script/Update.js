var colpi = new Array();
var pressedKeys = [];

/* minimo intervallo per sparare consecutivamente */
var minInterval = 400;

var lastAdded1 = new Date().getTime();
var lastAdded2 = new Date().getTime();

var Timer;

/* last update */
var then;

/* Funzione di aggiornamento */
function GameLoop() {
    
    var now = new Date();
    var delta = now - then;
    
    Update(delta / 1000);
    
    Draw();
    
    then = now;
}


function Update(delta) {
    
    for (i in Shoots.p1) 
        Shoots.p1[i].Update(delta);
    
    for (i in Shoots.p2) 
        Shoots.p2[i].Update(delta);
    
    UpdateInput(delta); 
}

/* Aggiornamento dei tasti premuti */
function UpdateInput(delta) {
    
    /* First Ship */
    if (PressedKeys[37] == true) {
        /* left arrow */
        Players.p1.goLeft(delta)
    }
/*
    if (pressedKeys[38] == true) {
        // up arrow
        Characters.c1.ship.style.top = parseInt(Characters.c1.ship.style.top) - vy + 'px';
    }
*/
    if (PressedKeys[39] == true) {
        /* right arrow */
        Players.p1.goRight(delta);
    }
    
    /*
    if (pressedKeys[40] == true) {
        /. down arrow
        Characters.c1.ship.style.top = parseInt(Characters.c1.ship.style.top) + vy + 'px';
    }
    */
    
    if ( PressedKeys[80] == true ) {
        /* Shoot */
        Players.p1.Shoot();
    }


    /* Second ship */
    /* WASD SpaceBar */
    if (PressedKeys[65] == true) {
        /* left arrow */
        Players.p2.goLeft(delta)
    }
    
    /*
    if (pressedKeys[87] == true) {
        // up arrow
        Characters.c2.ship.style.top = parseInt(Characters.c2.ship.style.top) - vy + 'px';
    }
    */

    if (PressedKeys[68] == true) {
        /* right arrow */
        Players.p2.goRight(delta)
    }
    
    /*
    if (pressedKeys[83] == true) {
        // down arrow
        Characters.c2.ship.style.top = parseInt(Characters.c2.ship.style.top) + vy + 'px';
    }
    */
    
    if (PressedKeys[32] == true) {
        /* Shoot */
        Players.p2.Shoot();
    }
}

function Draw() {
    
    var cnv = document.getElementById('game');
    var ctx = cnv.getContext('2d');
    
    ctx.drawImage(bgImage,0, 0, cnv.width, cnv.height );
    
    for (i in Shoots.p1)
        Shoots.p1[i].Draw(ctx);
        
    for (i in Shoots.p2)
        Shoots.p2[i].Draw(ctx);
        
    Players.p1.Draw(ctx);
    Players.p2.Draw(ctx);

    /* Drawing life points */    
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";

    ctx.textBaseline = "top";
    ctx.fillText("Life: " + Players.p2.ship.stats.life , 4 , 0);
    
    ctx.textBaseline = "bottom";
    ctx.fillText("Life: " + Players.p1.ship.stats.life , 4 , Canvas.height);
}