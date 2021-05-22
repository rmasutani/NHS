let header = document.getElementById('header');
let degree = 0;

function rotateHeader() {
    degree = degree + 6;
    header.style.transform = 'rotateX(' + degree + 'deg)';
}

setInterval(rotateHeader, 20);