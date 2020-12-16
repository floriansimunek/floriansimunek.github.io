const changeColorBtn = document.querySelector('button');
const body = document.querySelector('body');
const hexValueText = document.getElementById('hex-value');

changeColorBtn.addEventListener('click', changeBackgroundColor);

function changeBackgroundColor(){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    hexValueText.innerHTML = '#' + randomColor;
    body.style.backgroundColor = '#' + randomColor;
}