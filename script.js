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

// for (let i=0; i < imgDivs.length; i++){
//     imgDivs[i].setAttribute("style", `background: url(images/img${i}.jpg) no-repeat center`);
// }  


// let answer = document.querySelector('.answer').innerText

//Adds new numbers to the questions
function populate(){
    first.innerText = Math.floor(Math.random()*15)
    last.innerText = Math.ceil(Math.random()*15)
    // correctAction(chosenDiv);
    let corAns = calculate();
    let cDiv = randomDiv(corAns);
    return cDiv
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
    let choDiv = ansDivs[aDiv]
    for (let i = 0; i < ansDivs.length; i++){
        if (ansDivs[i] == choDiv){
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
    return choDiv
}

let unshuffled = [1,2,3,4,5,6,7,8,9]

function shuffle(arry){
    let shuffled = arry
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    return shuffled    
}

function reveal(){
    let x = 0
    let shuf = shuffle(unshuffled)
    let a = Math.ceil(Math.random()*shuf[0])
    while (x<=9){
        x++
        for (let i=a; i <= img_divs.length;){
            if (img_divs[i].classList.contains('reveal')){
                continue
            } else {    
                img_divs[i].classList.add('reveal');
            }
            break
        } 
        break
    } 
    shuf.pop(shuf[a])
}


function correctAction(chosenDiv, guess){
    // console.log(isClicked)
    if (guess.classList.contains('answer')){
        guess.classList.add('correct');
        
        // INSERT Correction actions regarding images here.
        reveal();

        setTimeout(() => {
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
            chosenDiv = populate();
        }, 2000);
    } else {
        // chosenDiv.classList.remove('correct');
        guess.classList.remove('clicked');
        alert('Try again!')
    }};


    // div_arr.forEach(ads => {
    //     console.log('correctaction')
    //     if (ads.classList.contains('clicked') && ads.classList.contains('answer')){
    //         chosenDiv.classList.add('correct');
    //     } else {
    //         ads.classList.remove('correct');
    //         ads.classList.remove('clicked');
    //     };
    // })

    // if (chosenDiv.classList.contains('answer')){
    //     sleep(2000)
    //     chosenDiv.classList.add('correct');
    //     console.log('correct')
    // } else {
    //     chosenDiv.classList.remove('correct');
    //     // chosenDiv.classList.remove('answer');
    // };

let chosenDiv = populate()


// //Adds event listener for each answer
// ans1.addEventListener('click', populate)
// ans2.addEventListener('click', populate)
// ans3.addEventListener('click', populate)

// let isClicked = false
// div_arr.forEach(ads => {
    //     ads.addEventListener('click', ()=>{
        //         populate()
        //         isClicked = true
        //     })
        // });

ans1.addEventListener("click", (ev) => {
    // isClicked = true;
    ans1.classList.add('clicked')
    console.log('clicked1')
    correctAction(chosenDiv, ev.target)
    // sleep(1000)
    // reset()
    // populate();
});

ans2.addEventListener("click", (ev) => {
    // isClicked = true;
    ans2.classList.add('clicked')
    correctAction(chosenDiv, ev.target)
    console.log('clicked2')

    // reset()
    // populate();
});

ans3.addEventListener("click", (ev) => {
    // isClicked = true;
    ans3.classList.add('clicked')
    console.log('clicked3')

    correctAction(chosenDiv, ev.target)
    // reset()
    // populate();
});

window.onload = populate();