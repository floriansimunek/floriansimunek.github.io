let counter = 0;
const counterValueText = document.getElementById('counter-value');
const minusBtn = document.getElementById('minus-button');
const plusBtn = document.getElementById('plus-button');

minusBtn.addEventListener('click', function(){
    counter--;
    counterValueText.textContent = counter;
    counterColor();
})

plusBtn.addEventListener('click', function(){
    counter++;
    counterValueText.textContent = counter;
    counterColor();
})

function counterColor(){
    if(counter > 0){
        counterValueText.style.color = 'green';
    } else if(counter < 0 ){
        counterValueText.style.color = 'red';
    } else {
        counterValueText.style.color = '#333';
    }
}