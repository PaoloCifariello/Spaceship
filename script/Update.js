/* Ships */
var Characters = { c1: null, c2: null};

var colpi = new Array();
var pressedKeys = [];

/* minimo intervallo per sparare consecutivamente */
var minInterval = 400;

var lastAdded1 = new Date().getTime();
var lastAdded2 = new Date().getTime();

var Timer;

/* Funzione di aggiornamento */
function Update() {

    for (i in colpi) {
        var newposy = parseInt(colpi[i].obj.style.top) + colpi[i].vy;

        if ((newposy < -10) || (newposy > window.screen.availHeight)) {
            remove(colpi, i);
        }
        else {
            colpi[i].obj.style.top = newposy + 'px';

            /* Collides Second Ship */
            if ( colpi[i].id == 1 && Collides(colpi[i], Characters.c2.ship) ) {
                Characters.c2.life -= 10;
                document.getElementById('l2').innerText = "LIFE: " + Characters.c2.life;
                remove(colpi, i);
                
                if (Characters.c2.life == 0)
                    SetWinner(1);
            }

            /* Collides First Ship */
            else if ( colpi[i].id == 2 && Collides(colpi[i], Characters.c1.ship) ) {
                Characters.c1.life -= 10;
                document.getElementById('l1').innerText = "LIFE: " + Characters.c1.life;
                remove(colpi, i);

                if (Characters.c1.life == 0)
                    SetWinner(2);
            }

        }
    }

    UpdateInput();
    
}

/* Aggiornamento dei tasti premuti */
function UpdateInput() {
    var vx = 10;
    var vy = 0;

    /* First Ship */
    if (pressedKeys[37] == true) {
        /* left arrow */
        var oldx = parseInt(Characters.c1.ship.style.left);
        if (oldx >= 0) Characters.c1.ship.style.left = ( oldx - vx ) + 'px';
    }

    if (pressedKeys[38] == true) {
        /* up arrow */
        Characters.c1.ship.style.top = parseInt(Characters.c1.ship.style.top) - vy + 'px';
    }

    if (pressedKeys[39] == true) {
        /* right arrow */      
        var oldx = parseInt(Characters.c1.ship.style.left);
        if (oldx <= ( GetWidth() - parseInt(Characters.c1.ship.style.width) ) ) Characters.c1.ship.style.left = ( oldx + vx ) + 'px';    }

    if (pressedKeys[40] == true) {
        /* down arrow */
        Characters.c1.ship.style.top = parseInt(Characters.c1.ship.style.top) + vy + 'px';
    }
    if (pressedKeys[80] == true) {
        /* Shoot */
        AddColpo(1);
    }


    /* Second ship */
    /* WASD SpaceBar */
    if (pressedKeys[65] == true) {
        /* left arrow */
        var oldx = parseInt(Characters.c2.ship.style.left);
        if (oldx >= 0) Characters.c2.ship.style.left = ( oldx - vx ) + 'px';
    }

    if (pressedKeys[87] == true) {
        /* up arrow */
        Characters.c2.ship.style.top = parseInt(Characters.c2.ship.style.top) - vy + 'px';
    }

    if (pressedKeys[68] == true) {
        /* right arrow */
        var oldx = parseInt(Characters.c2.ship.style.left);
        if (oldx <= ( GetWidth() - parseInt(Characters.c2.ship.style.width) ) ) Characters.c2.ship.style.left = ( oldx + vx ) + 'px';
    }

    if (pressedKeys[83] == true) {
        /* down arrow */
        Characters.c2.ship.style.top = parseInt(Characters.c2.ship.style.top) + vy + 'px';
    }

    if (pressedKeys[32] == true) {
        /* Shoot */
        AddColpo(2);
    }
}

/* Aggiunge un colpo sparato dalla navicella id (indice player) se può essere aggiunto */
function AddColpo(id) {

    if (id == 1) {
        if (new Date().getTime() - lastAdded1 < minInterval) return;
        lastAdded1 = new Date().getTime();
        var posx = parseInt(Characters.c1.ship.style.left) - 7 + parseInt(Characters.c1.ship.style.width) / 2;
        var posy = parseInt(Characters.c1.ship.style.top);
    }

    else {
        if (new Date().getTime() - lastAdded2 < minInterval) return;
        lastAdded2 = new Date().getTime();
        var posx = parseInt(Characters.c2.ship.style.left) - 7 + parseInt(Characters.c2.ship.style.width) / 2;
        var posy = parseInt(Characters.c2.ship.style.top) + parseInt(Characters.c2.ship.style.height);
    }

    var colpo = new Colpo(posx, posy, id);
    colpi.push(colpo);
}