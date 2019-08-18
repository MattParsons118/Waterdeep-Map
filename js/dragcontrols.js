function initDragControls()
{
    document.onmousedown = startDrag;
    document.onmouseup = stopDrag;
}

function startDrag(e)
{
    offsetX = e.clientX;
    offsetY = e.clientY;

    mapX = parseInt(map.style.left);
    mapY = parseInt(map.style.top);

    drag = true;
    document.onmousemove = dragDiv;

    return false;
}

function dragDiv(e)
{
    if(!drag)
    {
        document.onmousemove = updateCoords;
        return;
    }

    mapLeft = mapX + e.clientX - offsetX;
    mapTop = mapY + e.clientY - offsetY;
    repositionMap(mapLeft, mapTop);

    return false;
}

function stopDrag()
{
    drag = false;
}
