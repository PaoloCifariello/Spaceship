/* When we click on the ship */
function ClickShip(obj) 
{
    if (Characters.c1) 
    {
        Characters.c2 = obj;

        document.body.innerHTML = "";

        InitializeShip(obj, 2);

        var background = document.createElement('img');
        background.alt = 'Could not display background';
        background.src = 'images/background.jpg';
        background.class = 'background';

        document.body.appendChild(background);
        document.body.appendChild(Characters.c1);
        document.body.appendChild(Characters.c2);

        document.addEventListener("keydown", KeyDown, false);
        document.addEventListener("keyup", KeyUp, false);

        setInterval(Update, 10);
    }

    else
    {
        Characters.c1 = obj;
        InitializeShip(obj, 1);
        document.getElementById('chooseTitle').innerText = 'Scegli la navicella 2:';
    }
}