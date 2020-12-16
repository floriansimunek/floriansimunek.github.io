const colors = ['blue', 'red', 'yellow', 'purple', 'orange', 'black', 'orange', 'brown', 'gray', 'pink'];
const changeColorBtn = document.querySelector('button');
const body = document.querySelector('body');

changeColorBtn.addEventListener('click', changeBackgroundColor);

function changeBackgroundColor(){
    const colorIndex = parseInt(Math.random() * colors.length);
    body.style.backgroundColor = colors[colorIndex];
}