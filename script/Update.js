var Characters = { c1: null, c2: null};

var colpi = new Array();
var pressedKeys = [];

var minInterval = 400;
var lastAdded1 = new Date().getTime();
var lastAdded2 = new Date().getTime();

function Update() {

    for (i in colpi) {
        var newposy = parseInt(colpi[i].obj.style.top) + colpi[i].vy;

        if ((newposy < -10) || (newposy > window.screen.availHeight)) {
            var toRemove = colpi[i].obj;
            document.body.removeChild(toRemove);

            colpi.splice(i, 1);
        }
        else {
            colpi[i].obj.style.top = newposy + 'px';

            /* Collides Second Ship */
            if ( colpi[i].id == 1 && Collides(colpi[i], Characters.c2) ) {
                document.body.innerHTML = "";
                var win = document.createElement('p');
                win.innerHTML = 'The Winner is Player 1';
                document.body.appendChild(win);

            }

            /* Collides First Ship */
            else if ( colpi[i].id == 2 && Collides(colpi[i], Characters.c1) ) {
                document.body.innerHTML = "";
                var win = document.createElement('p');
                win.innerHTML = 'The Winner is Player 2';
                document.body.appendChild(win);
            }

        }
    }

    UpdateInput();
    
}
function UpdateInput() {
    var vx = 10;
    var vy = 0;

    /* First Ship */
    if (pressedKeys[37] == true) {
        /* left arrow */
        Characters.c1.style.left = parseInt(Characters.c1.style.left) - vx + 'px';
    }

    if (pressedKeys[38] == true) {
        /* up arrow */
        Characters.c1.style.top = parseInt(Characters.c1.style.top) - vy + 'px';
    }

    if (pressedKeys[39] == true) {
        /* right arrow */
        Characters.c1.style.left = parseInt(Characters.c1.style.left) + vx + 'px';
    }

    if (pressedKeys[40] == true) {
        /* down arrow */
        Characters.c1.style.top = parseInt(Characters.c1.style.top) + vy + 'px';
    }
    if (pressedKeys[80] == true) {
        /* Shoot */
        AddColpo(1);
    }


    /* Second ship */
    /* WASD SpaceBar */
    if (pressedKeys[65] == true) {
        /* left arrow */
        Characters.c2.style.left = parseInt(Characters.c2.style.left) - vx + 'px';
    }

    if (pressedKeys[87] == true) {
        /* up arrow */
        Characters.c2.style.top = parseInt(Characters.c2.style.top) - vy + 'px';
    }

    if (pressedKeys[68] == true) {
        /* right arrow */
        Characters.c2.style.left = parseInt(Characters.c2.style.left) + vx + 'px';
    }

    if (pressedKeys[83] == true) {
        /* down arrow */
        Characters.c2.style.top = parseInt(Characters.c2.style.top) + vy + 'px';
    }

    if (pressedKeys[32] == true) {
        /* Shoot */
        AddColpo(2);
    }
}

function AddColpo(id) {

    if (id == 1) {
        if (new Date().getTime() - lastAdded1 < minInterval) return;
        lastAdded1 = new Date().getTime();
        var posx = parseInt(Characters.c1.style.left) - 7 + parseInt(Characters.c1.style.width) / 2;
        var posy = parseInt(Characters.c1.style.top) + parseInt(Characters.c1.style.height) / 2;
    }

    else {
        if (new Date().getTime() - lastAdded2 < minInterval) return;
        lastAdded2 = new Date().getTime();
        var posx = parseInt(Characters.c2.style.left) - 7 + parseInt(Characters.c2.style.width) / 2;
        var posy = parseInt(Characters.c2.style.top) + parseInt(Characters.c2.style.height) / 2;
    }

    var colpo = new Colpo(posx, posy, id);
    colpi.push(colpo);
}