function Colpo(posx, posy)
{
    var img = document.createElement('img');
    img.src = 'images/colpo.png';
    img.style.position = 'absolute';
    img.style.left = posx;
    img.style.top = posy;

    document.body.appendChild(img);

    this.posx = posx;
    this.posy = posy;
    this.obj = img;
    this.vx = 0;
    this.vy = -( ( Math.random() * 4 ) + 1 );
    
}

function InitializeShip(ship)
{
    ship.id = "char";
    ship.style.left = "600px";
    ship.style.top = "600px";
    ship.style.margin = "0px";
    ship.style.width = '150px';
    ship.style.height = '100px';
    
    ship.onclick = "";
    ship.onmouseover = "";
    ship.onmouseout = "";
}

document.title = "Flight Game"