var Game = function(){
    /*
     * Canvas object
     */
    var Canvas;

    /* 
    * These are statistics about all ship
    * vx -> velocità lungo x
    * life -> vita iniziale
    * atk -> potenza colpi
    * def -> difesa dai colpi nemici
    * vel -> velocità dei colpi
    * ric -> tempo necessario per ricaricare
    * dx -> larghezza nave
    * dy -> altezza nave
    */
    var ShipStat = new Array(
        { name: 'SirViper', vx: 300, life: 190, atk: 11, def: 8, vel: 380, ric: 440, dx: 140, dy: 76 },
        { name: 'Q-uore', vx: 260, life: 170, atk: 14, def: 3, vel: 420, ric: 500, dx: 140, dy: 76 },
        { name: 'Sharingo', vx: 280, life: 180, atk: 13, def: 5, vel: 360, ric: 460, dx: 140, dy: 76 },
        { name: 'NimRod', vx: 200, life: 200, atk: 11, def: 9, vel: 320, ric: 400, dx: 140, dy: 76 },
        { name: 'Solbadguy', vx: 250, life: 160, atk: 14, def: 5, vel: 350, ric: 400, dx: 140, dy: 76 },
        { name: 'Starship', vx: 320, life: 150, atk: 13, def: 5, vel: 200, ric: 300, dx: 140, dy: 76 }
    )

    /* 
    * These are images of all ship
    */
    var ShipImage = new Array(
        'images/ship0.png',
        'images/ship1.png',
        'images/ship2.png',
        'images/ship3.png',
        'images/ship4.png',
        'images/ship5.png'
    )

    var immagineColpo1 = new Image() 
    var immagineColpo2 = new Image();
    immagineColpo1.src = 'images/colpo1.png';
    immagineColpo2.src = 'images/colpo2.png';
    
    /*
    * These are players
    */
    var Players = new Array();

    /*
    * These are shoots
    * respectively shooted by Player1 and Player2
    */
    var Shoots = new Array(2);
    Shoots[1] = new Array();
    Shoots[2] = new Array();
    
    var PressedKeys = new Array();
    var bgReady = false;
    var bgImage = new Image();

    bgImage.onload = function () {
        bgReady = true;
    };

    bgImage.src = "images/background.jpg";
    
    function getPlayer(id) {
        return Players[id];
    }
    
    function getVersus(id) {
        if (id == 1) {
            return Players[2];
        }
        return Players[1];
    }
    
    function setPlayer(id, player) {
        Players[id] = player;
    }
    
    function getShoots(id) {
        return Shoots[id];
    }
    
    function getBackground() {
        return bgImage;
    }
    
    function getImmagineColpo(id) {
        if (id == 1) return immagineColpo1;
        return immagineColpo2;
    }
    
    function startGame(interval) {
        idTimer = setInterval(GameLoop, interval);
    }
    
    function stopGame() {
        clearInterval(idTimer);
    }
    
    return {
      Canvas: Canvas,
      PressedKeys: PressedKeys,
      ShipStat: ShipStat,
      ShipImage: ShipImage,
      
      getPlayer: getPlayer,
      setPlayer: setPlayer,
      getVersus: getVersus,
      getShoots: getShoots,
      getImmagineColpo: getImmagineColpo,
      getBackground: getBackground,
      startGame: startGame,
      stopGame: stopGame
    };
    
}();