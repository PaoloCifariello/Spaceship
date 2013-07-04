/* Get Width size of window */
function GetWidth() {
    var x = 0;

    if (self.innerWidth) {
        x = self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientWidth) {
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
function removeShoot(array, index)
{
    array.splice(index, 1);
}

/* Initialize game */
function InitializeScenario()
{
    /* create, initialize and add canvas */
    var cnv = document.createElement('canvas');
    cnv.id = 'game';
    cnv.width = GetWidth() - 25;
    cnv.height = GetHeight() - 25;

    document.addEventListener("keydown", KeyDown, false);
    document.addEventListener("keyup", KeyUp, false);
    
    document.body.appendChild(cnv);
}

function AddCounter()
{
    var counter = document.createElement('script');
    counter.type = 'text/javascript';
    counter.src = 'http://www.altervista.org/js_tags/contatore.js';
    document.appendChild('counter');    
}

function SetWinner(player)
{
    clearInterval(Timer);

    Shoots.p1 = {};
    Shoots.p2 = {};

    document.body.innerHTML = "";

    document.write('Il vincitore è Player' + player.id + '!' + '<br>' + 'con ' + player.ship.stats.name);
}

function InitializeSelectPG()
{
    document.write('<ul>');

    for (i in ShipImage) {

        document.write('<li>');
        document.write('<div>');
        InsertImageShip(i);
        document.write('</div>');
        document.write('</li>');
    }

    document.write('</ul>');

}

function InsertImageShip(id)
{
    document.write('<img id="' + id + '" class="Scelta" alt="Impossibile visualizzare" src="images/ship' + id + '.png" onmouseover="Over(this)" onmouseout="notOver(this)" onclick="ClickShip(this)"></img>');
}

/* Aggiunge un colpo sparato dalla navicella id (indice player) se può essere aggiunto */
function AddColpo(player) {

    var now = Date.now();
    
    //alert( player.ship.stats.vel - ( now - player.lastShoot ) );
    
    if ( ( now - player.lastShoot ) < player.ship.stats.ric )
	return;
	
    if ( player.id == 1 )
	Shoots.p1.push( new Colpo( player ) );
    else
	Shoots.p2.push( new Colpo( player ) );
    
    player.lastShoot = now;
}