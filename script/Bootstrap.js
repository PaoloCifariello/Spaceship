function Colpo(posx, posy, id)
{
    var img = document.createElement('img');
    img.src = 'images/colpo.png';
    img.style.position = 'absolute';
    img.style.left = posx + 'px';
    img.style.top = posy + 'px';

    document.body.appendChild(img);

    this.obj = img;
    this.vx = 0;
    if (id == 1) this.vy = -( ( Math.random() * 4 ) + 1 );
    else this.vy = ( Math.random() * 4 ) + 2;   
}

function InitializeShip(ship, id)
{
    if (id == 1) 
    {
        ship.style.top = "600px";
    }
    
    else 
    {
        ship.style.top = "0px";
    }

    ship.class = "char";

    ship.style.position = 'absolute';
    ship.style.left = '600px';
    ship.style.margin = "0px";
    ship.style.width = '150px';
    ship.style.height = '100px';
    
    ship.onclick = "";
    ship.onmouseover = "";
    ship.onmouseout = "";
}

document.title = "Flight Game"
document.getElementById('chooseTitle').innerText = 'Scegli la navicella 1:';