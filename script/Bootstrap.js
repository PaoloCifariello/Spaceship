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
    ship.style.position = 'absolute';
    ship.style.left = GetWidth() / 2 + 'px';
    ship.style.margin = "0px";
    ship.style.width = '150px';
    ship.style.height = '100px';

    if (id == 1) 
    {
        ship.style.top = ( GetHeight() - parseInt( ship.style.height ) ) + 'px';
    }
    
    else 
    {
        ship.style.top = "0px";
    }

    ship.class = "char";
    
    ship.onclick = "";
    ship.onmouseover = "";
    ship.onmouseout = "";
}

 function GetWidth()
  {
          var x = 0;
          if (self.innerHeight)
          {
                  x = self.innerWidth;
          }
          else if (document.documentElement && document.documentElement.clientHeight)
          {
                  x = document.documentElement.clientWidth;
          }
          else if (document.body)
          {
                  x = document.body.clientWidth;
          }
          return x;
  }

  function GetHeight()
  {
          var y = 0;
          if (self.innerHeight)
          {
                  y = self.innerHeight;
          }
          else if (document.documentElement && document.documentElement.clientHeight)
          {
                  y = document.documentElement.clientHeight;
          }
          else if (document.body)
          {
                  y = document.body.clientHeight;
          }
          return y;
  }

document.title = "Flight Game"
document.getElementById('chooseTitle').innerText = 'Scegli la navicella 1:';