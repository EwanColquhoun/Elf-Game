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
let unshuffled = [0,1,2,3,4,5,6,7,8]

//Adds new numbers to the questions
function populate(){
    first.innerText = Math.floor(Math.random()*15)
    last.innerText = Math.ceil(Math.random()*15)
    let corAns = calculate();
    randomDiv(corAns);
}

function reset(){
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
            // console.log(ansDivs[i-1].innerText)
            ansDivs[i].innerText = Math.ceil(Math.random()*15)
            // if (ansDivs[i].innerText == ansDivs[i-1].innerText){
            //     ansDivs[i].innerText += 1
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

function reveal(){
    // let x = 0
    // console.log('unshuffled before', unshuffled)
    let shuf = shuffle(unshuffled)
    let a = shuf[0]
    // console.log(a, 'a')
    // console.log('shuf', shuf)
    while (x<=9){
        x++
        unshuffled = unshuffled.filter(function(item) {
            return item !== a})
        // console.log('unshuffled after', unshuffled)
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
        let corr = new Audio('media/bells.mp3')
        corr.play()
        // INSERT Correction actions regarding images here.
        reveal();

        setTimeout(() => {
            reset(),
            populate();
        }, 2000);
    } else {
        let incorr = new Audio('media/wrong.mp3')
        incorr.play();
        guess.classList.remove('clicked');
        // setTimeout(alert('Try again!'), 700)
    }};

// let chosenDiv = populate()

// ans1.addEventListener("click", (ev) => {
//     ans1.classList.add('clicked')
//     // console.log('clicked1', cDiv, ev.target)
//     correctAction(cDiv, ev.target)
// });

// ans2.addEventListener("click", (ev) => {
//     ans2.classList.add('clicked')
//     // console.log('clicked2', cDiv, ev.target)
//     correctAction(cDiv, ev.target)
// });

// ans3.addEventListener("click", (ev) => {
//     ans3.classList.add('clicked')
//     // console.log('clicked3', cDiv, ev.target)
//     correctAction(cDiv, ev.target)
// });

for (let div in div_arr){
    console.log(typeof(ansDivs))
    div_arr[div].addEventListener('click', function(ev) {
        console.log(`clicked`)
        div_arr[div].classList.add('clicked')

        correctAction(cDiv, ev.target)
    })
}

let ambMusic = new Audio('media/weWishYou.mp3')

document.body.addEventListener("mouseover", function () {
    ambMusic.play()
})
let muteBut = document.getElementById('muteBut')
muteBut.addEventListener('click', ()=>
    ambMusic.muted = true)
    
window.onload = setTimeout(populate(), 500);