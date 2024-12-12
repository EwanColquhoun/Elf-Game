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
let answers = []
let d = 0

//Works out the correct answer and returns it 
function calculate(){
    let sum = Number(first.innerText) + Number(last.innerText)
    return sum
};

//Adds new numbers to the questions
function populate(){
    first.innerText = Math.floor(Math.random()*15)
    last.innerText = Math.ceil(Math.random()*15)
    let corAns = calculate();
    randomDiv(corAns);
}

// resets the classes on the answers
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

const addUnique = (arry, value) => {
    if (!arry.includes(value)) arry.push(value);
};

//Chooses the div to have the correct answer
// then fills arry for random, non duplicated numbers to add to other divs.
function randomDiv(corAns){
    let aDiv = Math.floor(Math.random()*div_arr.length)
    let choDiv = ansDivs[aDiv]
    let otherDivs = []
    answers = []
    for (let i= 0; i < div_arr.length; i++){
        if (div_arr[i] === choDiv){
            div_arr[i].innerText = corAns
            div_arr[i].classList.add('answer')
            answers.push(corAns)
        } else {
            let ran = Math.ceil(Math.random()*15)
            if (answers.length <= 4){
                addUnique(answers, ran)           
            }
            otherDivs.push(div_arr[i])
        }
    }
    
    let threeAns = answers.filter(cai)
    while (threeAns.length < 3){
        let rand = Math.ceil(Math.random()*15)
        addUnique(threeAns, rand)
    }

    function cai(numb){
        return numb !== corAns
    }
    // populates the other divs that arent answers
    for (let d in otherDivs){
        otherDivs[d].innerText = threeAns[d]
        d ++
    }
    
    cDiv = choDiv
}

// Returns a randomized array
function shuffle(arry){
    let shuffled = arry
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    return shuffled
}

// Adds class to image divs to show the clue
function reveal(){
    let shuf = shuffle(unshuffled)
    let a = shuf[0]
    while (x<=9){
        x++
        unshuffled = unshuffled.filter(function(item) {
            return item !== a})
        for (let i=a; i <= img_divs.length;){
            if (img_divs[i].classList.contains('reveal')){
                continue
            } else {    
                img_divs[i].classList.remove('hidden')
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
        // Incorrect sound effect
        let incorr = new Audio('media/wrong.mp3')
        incorr.play();
        guess.classList.add('shake')
        guess.classList.remove('clicked');
        setTimeout(() => {
            guess.classList.remove('shake');
          }, 1000);
    }};

// Adds event listeners to the answer buttons
for (let div in div_arr){
    div_arr[div].addEventListener('click', function(ev) {
        div_arr[div].classList.add('clicked')
        correctAction(cDiv, ev.target)
    })
}

// Adds background jingle music
let ambMusic = new Audio('media/weWishYou.mp3')
document.body.addEventListener("mouseover", function () {
    ambMusic.play()
})

// Mute button!
let muteBut = document.getElementById('muteBut')
muteBut.addEventListener('click', ()=>
    ambMusic.muted = true)
    
window.onload = setTimeout(populate(), 100)