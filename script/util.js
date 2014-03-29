/*
 *
 * Util module contains utility functions
 *
 */

var Util = (function(){
    /* Get Width size of window */
    function getWidth() {
        return $(window).width();
    }
    
    /* Get Height size of window */
    function getHeight() {
        return $(window).height();
    }
    
    /* Hide DOM element */
    function Hide(el) {
        $(el).hide();
	el.style.visibility = "hidden";
    }
    
    /* Shows DOM element */
    function Show(el) {
        $(el).hide();
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
        Game.Canvas = document.createElement('canvas');
        var cnv = Game.Canvas;
        $(cnv).attr('id','game');
        $(cnv).width(getWidth() - 25);
        $(cnv).height(getHeight() - 25);
        $(cnv).attr('width', getWidth());
        $(cnv).attr('height', getHeight());
        
        document.write('<audio src="sound/backtrack.mp3" autoplay loop></audio>')

        document.addEventListener('keydown',keydown);
        document.addEventListener('keyup', keyup);
        
        function keydown(e) {
            Game.PressedKeys[e.keyCode] = true;
        }
        function keyup(e) {
            Game.PressedKeys[e.keyCode] = false;
        }
        // set keydown and keyup event handler
        
        $(document.body).append(cnv);
    }
    
    function AddCounter()
    {
        var counter = document.createElement('script');
        $(counter).attr('type','text/javascript');
        $(counter).attr('src', 'http://www.altervista.org/js_tags/contatore.js');
        $(document).append(counter);    
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
    
})();