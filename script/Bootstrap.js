function Colpo(posx, posy)
{
    var img = document.createElement('img');
    img.src = '/images/colpo.png';
    img.style.position = 'absolute';
    img.style.left = posx;
    img.style.top = posy;

    document.body.appendChild(img);

    this.posx = posx;
    this.posy = posy;
    this.obj = img;
    this.vx = 0;
    this.vy = -( ( Math.random() * 5 ) + 1 );
    
}

document.title = "Flight Game"