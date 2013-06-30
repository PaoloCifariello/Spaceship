function Colpo(posx, posy, id) {
    var img = document.createElement('img');
    img.src = 'images/colpo.png';
    img.style.position = 'absolute';
    img.style.left = posx + 'px';
    img.style.top = posy + 'px';
    img.style.width = '10px';
    img.style.height = '15px'

    document.body.appendChild(img);

    this.obj = img;
    this.id = id;
    this.vx = 0;
    if (id == 1) this.vy = -((Math.random() * 4) + 4);
    else this.vy = (Math.random() * 4) + 4;
}

function Character(ship){

    this.ship = ship;
    this.life = 100;
}

document.title = "Flight Game"
document.getElementById('chooseTitle').innerText = 'Player 1 scegli la navicella:\nSpostati con le frecce e spara con P';