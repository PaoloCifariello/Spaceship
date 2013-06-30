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
                
                if (Characters.c2.life == 0) {
                    document.body.innerHTML = "";
                    var win = document.createElement('p');
                    win.innerHTML = 'Il vincitore è Player 1!';
                    Characters.c1.ship.style.left = '100px';
                    Characters.c1.ship.style.top = '100px';
                    document.body.appendChild(win);
                    document.body.appendChild(Characters.c1.ship);
                    colpi = {};
                    clearInterval(Timer);
                }
            }

            /* Collides First Ship */
            else if ( colpi[i].id == 2 && Collides(colpi[i], Characters.c1.ship) ) {
                Characters.c1.life -= 10;
                document.getElementById('l1').innerText = "LIFE: " + Characters.c1.life;
                remove(colpi, i);

                if (Characters.c1.life == 0) {
                    document.body.innerHTML = "";
                    var win = document.createElement('p');
                    win.innerHTML = 'Il vincitore è Player 2!';
                    Characters.c2.ship.style.left = '100px';
                    Characters.c2.ship.style.top = '100px';
                    document.body.appendChild(win);
                    document.body.appendChild(Characters.c2.ship);
                    colpi = {};
                    clearInterval(Timer);
                }
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
        Characters.c1.ship.style.left = parseInt(Characters.c1.ship.style.left) - vx + 'px';
    }

    if (pressedKeys[38] == true) {
        /* up arrow */
        Characters.c1.ship.style.top = parseInt(Characters.c1.ship.style.top) - vy + 'px';
    }

    if (pressedKeys[39] == true) {
        /* right arrow */
        Characters.c1.ship.style.left = parseInt(Characters.c1.ship.style.left) + vx + 'px';
    }

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
        Characters.c2.ship.style.left = parseInt(Characters.c2.ship.style.left) - vx + 'px';
    }

    if (pressedKeys[87] == true) {
        /* up arrow */
        Characters.c2.ship.style.top = parseInt(Characters.c2.ship.style.top) - vy + 'px';
    }

    if (pressedKeys[68] == true) {
        /* right arrow */
        Characters.c2.ship.style.left = parseInt(Characters.c2.ship.style.left) + vx + 'px';
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