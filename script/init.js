
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
        { name: 'SirViper', vx: 250, life: 150, atk: 12, def: 8, vel: 400, ric: 500, dx: 140, dy: 76 },
        { name: 'Q-uore', vx: 300, life: 100, atk: 15, def: 3, vel: 500, ric: 300, dx: 140, dy: 76 },
        { name: 'Sharingo', vx: 140, life: 100, atk: 15, def: 5, vel: 1000, ric: 500, dx: 140, dy: 76 },
        { name: 'NimRod', vx: 150, life: 100, atk: 15, def: 5, vel: 200, ric: 500, dx: 140, dy: 76 },
        { name: 'Solbadguy', vx: 140, life: 100, atk: 15, def: 5, vel: 200, ric: 500, dx: 140, dy: 76 },
        { name: 'Starship', vx: 150, life: 100, atk: 15, def: 5, vel: 200, ric: 500, dx: 140, dy: 76 }
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
    var Players = { p1: null, p2: null };

    /*
    * These are shoots
    * respectively shooted by Player1 and Player2
    */
    var Shoots = { p1: new Array(), p2: new Array() };

    var PressedKeys = new Array();

    var bgReady = false;
    var bgImage = new Image();

    bgImage.onload = function () {
        bgReady = true;
    };

    bgImage.src = "images/background.jpg";