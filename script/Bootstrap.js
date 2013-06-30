
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
    if (id == 1) this.vy = -((Math.random() * 4) + 2);
    else this.vy = (Math.random() * 4) + 2;
}
    document.title = "Flight Game"
    document.getElementById('chooseTitle').innerText = 'Scegli la navicella 1:';