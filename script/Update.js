var Characters = { c1: null, c2: null};

var colpi = new Array();
var pressedKeys = [];

function Update()
{
    for  (i in colpi)
    {
        var newposy = parseInt(colpi[i].obj.style.top) + colpi[i].vy;

        if ( (newposy < -10) || ( newposy > window.screen.availHeight) ) {
            var toRemove = colpi[i].obj;
            document.body.removeChild(toRemove);

            colpi.splice(i, 1);
        }
        else {
            colpi[i].obj.style.top = newposy + 'px';
        }
    } 
    
    
    UpdateInput();
}

function UpdateInput()
{
    var vx = 5;
    var vy = 0;

    /* First Ship */
    if (pressedKeys[37] == true) 
    {
        /* left arrow */
        Characters.c1.style.left = parseInt(Characters.c1.style.left) - vx + 'px';
    }

    if (pressedKeys[38] == true) 
    {
        /* up arrow */
        Characters.c1.style.top = parseInt(Characters.c1.style.top) - vy + 'px';
    }      

    if (pressedKeys[39] == true) 
    {
        /* right arrow */
        Characters.c1.style.left = parseInt(Characters.c1.style.left) + vx + 'px';
    }   
    
    if (pressedKeys[40] == true) 
    {
        /* down arrow */
        Characters.c1.style.top = parseInt(Characters.c1.style.top) + vy + 'px'; 
    }
    if (pressedKeys[80] == true)
    {
        /* Shoot */
        
        var posx = parseInt(Characters.c1.style.left) - 7 + parseInt(Characters.c1.style.width) / 2 ;
        var posy = parseInt(Characters.c1.style.top) + parseInt(Characters.c1.style.height) / 2;

        var colpo = new Colpo(posx, posy , 1);
        
        colpi.push(colpo);
    }    


    /* Second ship */
    /* WASD SpaceBar */
    if (pressedKeys[65] == true) 
    {
        /* left arrow */
        Characters.c2.style.left = parseInt(Characters.c2.style.left) - vx + 'px';
    }

    if (pressedKeys[87] == true) 
    {
        /* up arrow */
        Characters.c2.style.top = parseInt(Characters.c2.style.top) - vy + 'px';
    }      

    if (pressedKeys[68] == true) 
    {
        /* right arrow */
        Characters.c2.style.left = parseInt(Characters.c2.style.left) + vx + 'px';
    }   
    
    if (pressedKeys[83] == true) 
    {
        /* down arrow */
        Characters.c2.style.top = parseInt(Characters.c2.style.top) + vy + 'px'; 
    }

    if (pressedKeys[32] == true)
    {
        /* Shoot */

        var posx = parseInt(Characters.c2.style.left) - 7 + parseInt(Characters.c2.style.width) / 2 ;
        var posy = parseInt(Characters.c2.style.top) + parseInt(Characters.c2.style.height) / 2;

        var colpo = new Colpo(posx, posy, 2 );
        
        colpi.push(colpo);
    } 
}

function KeyUp(e)
{
    pressedKeys[e.keyCode] = false;
}

function KeyDown(e)
{
    pressedKeys[e.keyCode] = true;
}