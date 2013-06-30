/* When we click on the ship */
function ClickShip(obj) 
{
    if (Characters.c1) 
    {
        Characters.c2 = new Character(obj);

        document.body.innerHTML = "";

        InitializeShip(obj, 2);
        InitializeScenario();
        Timer = setInterval(Update, 20);
    }

    else
    {
        Characters.c1 = new Character(obj);
        InitializeShip(obj, 1);
        document.getElementById('chooseTitle').innerText = 'Player 2 scegli la navicella:\nSpostati con A-D e spara con Backspace';
    }
}