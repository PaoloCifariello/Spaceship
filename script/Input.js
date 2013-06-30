function Over(obj)
{
    obj.style.width = '240px';
    obj.style.height = '120px';
}

function notOver(obj)
{
    obj.style.width = '160px';
    obj.style.height = '80px';
}

function KeyUp(e)
{
    pressedKeys[e.keyCode] = false;
}

function KeyDown(e)
{
    pressedKeys[e.keyCode] = true;
}