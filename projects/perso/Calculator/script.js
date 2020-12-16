let screen = document.getElementById('display');
let buttons = document.getElementsByClassName('btn');
let clear = document.getElementById('clear');
let result = document.getElementById('equal');
console.log(result)

for(let i = 0; i < buttons.length-1; i++){
    buttons[i].addEventListener('click', function(e){
        let value = e.target.dataset.num;
        screen.value += value;
    })
}

result.addEventListener('click', function(){
    if(screen.value === ''){
        screen.value = 'Please enter a value';
    } else {
        let answer = eval(screen.value);
        screen.value = answer;
    }
})

clear.addEventListener('click', function(e){
    screen.value = '';
})