var zoom;
var toWidth;
var toHeight;
var zoomInterval;

function initZoomControls()
{
    map.style.height = mapHeight / 10 + 'px';
    map.style.width = mapWidth / 10 + 'px';
    repositionMap(0, 0);

    zoom = parseInt(map.style.width) / mapWidth;
    updateZoom();

    window.addEventListener('wheel', changeZoom, false);
}

function repositionMap(mapX, mapY)
{
    if(parseInt(map.style.width) > window.innerWidth)
    {
        if(mapX > 0)
        {
            mapX = 0;
        }else if(mapX + parseInt(map.style.width) < window.innerWidth)
        {
            mapX = window.innerWidth - parseInt(map.style.width);
        }
    }else
    {
        mapX = (window.innerWidth / 2) - (parseInt(map.style.width) / 2);
    }

    if(parseInt(map.style.height) > window.innerHeight)
    {
        if(mapY > 0)
        {
            mapY = 0;
        }else if(mapY + parseInt(map.style.height) < window.innerHeight)
        {
            mapY = window.innerHeight - parseInt(map.style.height);
        }
    }else
    {
        mapY = (window.innerHeight / 2) - (parseInt(map.style.height) / 2);
    }

    map.style.left = mapX + 'px';
    map.style.top = mapY + 'px';
}

function resizeMap(newWidth, newHeight, mouseX, mouseY)
{
    relMouseX = (mouseX - parseInt(map.style.left));
    relMouseY = (mouseY - parseInt(map.style.top));

    mapX = parseInt(map.style.left) + Math.round((parseInt(map.style.width) - newWidth) * (relMouseX / parseInt(map.style.width)));
    mapY = parseInt(map.style.top) + Math.round((parseInt(map.style.height) - newHeight) * (relMouseY / parseInt(map.style.height)));

    map.style.width = newWidth + 'px';
    map.style.height = newHeight + 'px';

    repositionMap(mapX, mapY);
}

function changeZoom(e)
{
    zoom -= 0.05 * (e.deltaY / Math.abs(e.deltaY));
    if(zoom < 0.1)
    {
        zoom = 0.1;
    }else if(zoom > 1)
    {
        zoom = 1;
    }

    toWidth = Math.round(mapWidth * zoom);
    toHeight = Math.round(mapHeight * zoom);
    clearInterval(zoomInterval);
    zoomInterval = setInterval(frame, 50);
    function frame()
    {
        newWidth = (parseInt(map.style.width) - ((parseInt(map.style.width) - toWidth) / 2)).toFixed();
        newHeight = mapHeight * (newWidth / mapWidth);
        resizeMap(newWidth, newHeight, e.clientX, e.clientY);

        if(Math.abs(parseInt(map.style.width) - toWidth) <= 1)
        {
            resizeMap(toWidth, toHeight, e.clientX, e.clientY);
            clearInterval(zoomInterval);
        }

        updateZoom();
    }

    return false;
}

window.onresize = function(e)
{
    repositionMap(parseInt(map.style.left), parseInt(map.style.top));
}
