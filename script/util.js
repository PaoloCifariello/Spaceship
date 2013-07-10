/*
 *
 * Util module contains utility functions
 *
 */

var Util = function(){
    /* Get Width size of window */
    function getWidth() {
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
    function getHeight() {
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
    
    /* Rimuove il colpo di indice index dall'array array */
    function removeShoot(array, index)
    {
	array.splice(index, 1);
    }
    
    /* Initialize game */
    function initializeScenario()
    {
	/* create, initialize and add canvas */
	Canvas = document.createElement('canvas');
	Canvas.id = 'game';
	Canvas.width = getWidth() - 25;
	Canvas.height = getHeight() - 25;
	document.write('<audio src="sound/backtrack.mp3" autoplay loop></audio>')
	document.addEventListener("keydown", KeyDown, false);
	document.addEventListener("keyup", KeyUp, false);
	
	document.body.appendChild(Canvas);
    }
    
    function AddCounter()
    {
	var counter = document.createElement('script');
	counter.type = 'text/javascript';
	counter.src = 'http://www.altervista.org/js_tags/contatore.js';
	document.appendChild('counter');    
    }
    
    function setWinner(player)
    {
	Game.stopGame();
	
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
    function addColpo(player) {
    
	var now = Date.now();
	
	if ( ( now - player.lastShoot ) < player.ship.stats.ric )
	    return;
	    
	Game.getShoots( player.id ).push(new Colpo(player));
	player.lastShoot = now;
    }
    
    return {
	
	getWidth: getWidth,
	getHeight: getHeight,
	Hide: Hide,
	Show: Show,
	removeShoot: removeShoot,
	initializeScenario: initializeScenario,
	setWinner: setWinner,
	addColpo: addColpo
    };
    
}();