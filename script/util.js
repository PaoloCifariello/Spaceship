/* Get Width size of window */
function GetWidth() {
    var x = 0;
    if (self.innerHeight) {
        x = self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        x = document.documentElement.clientWidth;
    }
    else if (document.body) {
        x = document.body.clientWidth;
    }
    return x;
}

/* Get Height size of window */
function GetHeight() {
    var y = 0;
    if (self.innerHeight) {
        y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        y = document.documentElement.clientHeight;
    }
    else if (document.body) {
        y = document.body.clientHeight;
    }
    return y;
}

/* Hide DOM element */
function Hide(el) {
    el.style.visibility = "hidden";
}

/* Shows DOM element */
function Show(el) {
    el.style.visibility = "visible";
}

/* Initialize ship property */
function InitializeShip(ship, id) {

    ship.style.position = 'absolute';
    ship.style.left = GetWidth() / 2 + 'px';
    ship.style.margin = "0px";
    ship.style.width = '160px';
    ship.style.height = '80px';

    if (id == 1) {
        ship.style.top = (GetHeight() - parseInt(ship.style.height)) + 'px';
    }

    else {
        ship.style.top = "0px";
    }

    Hide(ship);

    ship.onclick = "";
    ship.onmouseover = "";
    ship.onmouseout = "";
}

/* controlla se ball collide con ship */
function Collides ( ball, ship)
{
    var posxBall = parseInt(ball.obj.style.left);
    var widthBall = parseInt(ball.obj.style.width);  
    var posyBall = parseInt(ball.obj.style.top);
    var heightBall = parseInt(ball.obj.style.height);

    var posxShip = parseInt(ship.style.left);  
    var widthShip = parseInt(ship.style.width); 
    var posyShip = parseInt(ship.style.top);
    var heightShip = parseInt(ship.style.height);

    if ( (posxBall >= posxShip) && (posxBall <= posxShip + widthShip) && (posyBall >= posyShip) && (posyBall <= posyShip + heightShip) )
        return true;

    return false; 
}

/* Rimuove il colpo di indice index dall'array array */
function remove(array, index)
{
    var toRemove = array[index].obj;
    document.body.removeChild(toRemove);
    array.splice(index, 1);
}

/* Initialize main windows */
function InitializeScenario()
{

        var life1 = document.createElement('p');
        var life2 = document.createElement('p');

        life2.id = 'l1';
        life1.id = 'l2';
        
        life1.className += 'life';
        life2.className += 'life';

        life1.innerText = 'LIFE: 100';
        life2.innerText = 'LIFE: 100';

        life1.style.position = 'absolute';
        life2.style.position = 'absolute';

        life1.style.left = '0px';
        life2.style.left = '0px';

        life1.style.top = '0px';
        life2.style.top = (GetHeight() - 50) + 'px';
        /* creates background */   
        var background = document.createElement('img');
        background.alt = 'Could not display background';
        background.src = 'images/background.jpg';
        background.class = 'background';

        document.body.appendChild(background);

        /* append and show ship images */
        document.body.appendChild(Characters.c1.ship);
        document.body.appendChild(Characters.c2.ship);

        document.body.appendChild(life1);
        document.body.appendChild(life2);

        Show(Characters.c1.ship);
        Show(Characters.c2.ship);

        document.addEventListener("keydown", KeyDown, false);
        document.addEventListener("keyup", KeyUp, false);
}