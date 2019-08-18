var mapWidth;
var mapHeight;

window.onload = function()
{
    var map = document.getElementById('map');
    mapWidth = 5042;
    mapHeight = 7562;
    map.style.width = mapWidth + 'px';
    map.style.height = mapHeight + 'px';
    map.style.left = '0px';
    map.style.top = '0px';

    initDragControls();
    initZoomControls();

    document.onmousemove = updateCoords;
}

function updateCoords(e)
{
    coordX = Math.round((e.clientX - parseInt(map.style.left)) / parseInt(map.style.width) * mapWidth);
    coordY = Math.round((e.clientY - parseInt(map.style.top)) / parseInt(map.style.height) * mapHeight);

    document.getElementById('coordinates').innerHTML = coordX + ", " + coordY;
}

function updateZoom()
{
    document.getElementById('zoom').innerHTML = Math.round(zoom * 100) + "%";
}
