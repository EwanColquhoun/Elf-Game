let first = document.getElementById('first')
let op = document.getElementById('operator').innerText
let last = document.getElementById('last')
let ans1 = document.getElementById('ans1')
let ans2 = document.getElementById('ans2')
let ans3 = document.getElementById('ans3')
let ansDivs = document.querySelectorAll('.ans')
let imgDivs = document.querySelectorAll('.col')
let div_arr = Array.from(ansDivs)
let img_divs = Array.from(imgDivs)
let x = 0
let cDiv = ''

//Adds new numbers to the questions
function populate(){
    first.innerText = Math.floor(Math.random()*15)
    last.innerText = Math.ceil(Math.random()*15)
    // correctAction(chosenDiv);
    
    let corAns = calculate();
    randomDiv(corAns);
}

function reset(){
    // isClicked = false
    div_arr.forEach(ads => {
        if (ads.classList.contains('clicked')){
            ads.classList.remove('clicked')
        }
        if (ads.classList.contains('answer')){
            ads.classList.remove('answer')
            ads.classList.remove('correct')
        } else {
            ads.classList.remove('correct')

        };
    });
}

//Works out the correct answer and returns it 
function calculate(){
    let sum = Number(first.innerText) + Number(last.innerText)
    return sum
};

//Chooses the div to have the correct answer
function randomDiv(corAns){
    let aDiv = Math.floor(Math.random()*ansDivs.length)
    // console.log('adiv', aDiv)
    let choDiv = ansDivs[aDiv]
    // console.log('chodiv', choDiv)
    for (let i= 0; i < ansDivs.length; i++){
        if (ansDivs[i] === choDiv){
            // console.log('ansdivs[i]', ansDivs[i])
            ansDivs[i].innerText = corAns
            ansDivs[i].classList.add('answer')
        } else {
            // let curr = i
            // let prev = i-1
            ansDivs[i].innerText = Math.ceil(Math.random()*15)
            // if(ansDivs[curr].innerText===ansDivs[prev].innerText){
            //     ansDivs[curr].innerText = Math.ceil(Math.random()*15)
            // }
        }
    }
    cDiv = choDiv
}


function shuffle(arry){
    let shuffled = arry
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    return shuffled
}

let unshuffled = [0,1,2,3,4,5,6,7,8]

function reveal(){
    // let x = 0
    console.log('unshuffled before', unshuffled)
    let shuf = shuffle(unshuffled)
    let a = shuf[0]
    console.log(a, 'a')
    console.log('shuf', shuf)
    while (x<=9){
        x++
        unshuffled = unshuffled.filter(function(item) {
            return item !== a})
        console.log('unshuffled after', unshuffled)
        for (let i=a; i <= img_divs.length;){
            if (img_divs[i].classList.contains('reveal')){
                continue
            } else {    
                img_divs[i].classList.add('reveal');
                break
            }
        } 
        break
    } 
}

//if correct guess the below happens
function correctAction(cDiv, guess){
    
    if (guess.classList.contains('answer')){
        guess.classList.add('correct');
        // INSERT Correction actions regarding images here.
        reveal();

        setTimeout(() => {
            // div_arr.forEach(ads => {
            //     if (ads.classList.contains('clicked')){
            //         console.log('clicked removed')
            //         ads.classList.remove('clicked')
            //     }
            //     if (ads.classList.contains('answer')){
            //         console.log('answer and correct removed')
            //         ads.classList.remove('answer')
            //         ads.classList.remove('correct')
            //     } else {
            //         console.log('correct removed')
            //         ads.classList.remove('correct')
            //     };
            // });
            reset(),
            populate();
        }, 2000);
    } else {
        guess.classList.remove('clicked');
        alert('Try again!')
    }};

// let chosenDiv = populate()

ans1.addEventListener("click", (ev) => {
    ans1.classList.add('clicked')
    console.log('clicked1', cDiv, ev.target)
    correctAction(cDiv, ev.target)
});

ans2.addEventListener("click", (ev) => {
    ans2.classList.add('clicked')
    console.log('clicked2', cDiv, ev.target)
    correctAction(cDiv, ev.target)
});

ans3.addEventListener("click", (ev) => {
    ans3.classList.add('clicked')
    console.log('clicked3', cDiv, ev.target)
    correctAction(cDiv, ev.target)
});

window.onload = setTimeout(populate(), 500);