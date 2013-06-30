var Character;
var colpi = new Array();


function Update()
{
    for  (i in colpi)
    {
        var newposy = parseInt(colpi[i].obj.style.top) + colpi[i].vy;

        if (newposy < -10) {
            var toRemove = colpi[i].obj;
            document.body.removeChild(toRemove);

            colpi.splice(i, 1);
        }
        else {
            colpi[i].obj.style.top = newposy + 'px';
            colpi[i].obj.style.left = (parseInt(colpi[i].obj.style.left) + colpi[i].vx) + 'px';
        }
    }    

}

/* When we click on the ship */
function ClickShip(obj) 
{
    document.body.innerHTML = "";

    InitializeShip(obj);
    
    var background = document.createElement('img');
    background.alt = 'Could not display background';
    background.src = 'images/background.jpg';
    background.class = 'background';

    document.body.appendChild(background);
    document.body.appendChild(obj);

    document.addEventListener("keydown", KeyDown, false);
    Character = obj;

    setInterval(Update,10);
}

function KeyDown(e)
{
    var vx = 5;
    var vy = 5;

    var keyCode = e.keyCode;

    if (keyCode == 37) 
    {
        /* left arrow */
        Character.style.left = parseInt(Character.style.left) - vx + 'px';
    }

    if (keyCode == 38) 
    {
        /* up arrow */
        Character.style.top = parseInt(Character.style.top) - vy + 'px';
    }      

    if (keyCode == 39) 
    {
        /* right arrow */
        Character.style.left = parseInt(Character.style.left) + vx + 'px';
    }   
    
    if (keyCode == 40) 
    {
        /* down arrow */
        Character.style.top = parseInt(Character.style.top) + vy + 'px'; 
    }

    if (keyCode == 32)
    {
        /* Spacebar */

        var posx = ( parseInt(Character.style.left) - 7 + parseInt(Character.style.width) / 2  ) + 'px';

        var colpo = new Colpo(posx, Character.style.top);

        colpi.push(colpo);
    }
}