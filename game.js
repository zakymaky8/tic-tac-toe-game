const container = document.querySelector('.container');
const gameContainer = document.querySelector('.game-container');
const emabarker = document.querySelector('#embarker');
// notices and descriptions
const helpImgBtn = document.querySelector('#help-img');
const dialog = document.querySelector('.help-discr')
const dialogClose = document.querySelector('#dialog-closer')
const notice = document.querySelector('.notice');
const winner = document.querySelector('.winner');

const gameType = document.querySelector('#games');
const playerNameOne = document.querySelector('#player-name1')
const playerNameTwo = document.querySelector('#player-name2')

const mark1 = document.querySelector('#mark1');
const mark2 = document.querySelector('#mark2')
const markChanger = document.querySelector('#changer')
//scoring and winning marks
const score1 = document.querySelector('#score1')
const score2 = document.querySelector('#score2')
// manipulations
const restartBtns = document.querySelectorAll('.restart-btn');
let arrBtns = Array.from(restartBtns);
const gameCells = document.getElementsByClassName('cells');
let arrCells = Array.from(gameCells);
let currentValue = mark1.textContent;
const gameEndResult = document.querySelector('#msg');

// factory of main game

let x = 0;
let o = 0;
let am = [0,1,2,3,4,5,6,7,8];
let st = Array(9).fill('a');

const generalGameBoard = function() {
    let a = [[0,1,2], [0,3,6], [3,4,5], [1,4,7], [6,7,8], [2,5,8], [0,4,8], [2,4,6]]
    let arrCells = Array.from(gameCells);
    currentValue = mark1.textContent;
    const setGameBoard = function() {
        markChanger.addEventListener('click',swapValues)
        arrCells.forEach(c=>{
            c.addEventListener('click', (e)=>{
                if (c.textContent==='X' || c.textContent==='O') {
                    console.log('nothing')
                }
                else {
                    c.textContent = currentValue;
                    let ind = arrCells.indexOf(c);
                    am[ind] = c.textContent;
                    st[ind] = c.textContent; // tracker for the fullfilment of the array with X and O
                    // console.log(am)
                    currentValue = (currentValue==='O') ? 'X' : 'O';
                    markChanger.removeEventListener('click',swapValues)
               }
                for (let k of a) {
                    if ((am[k[0]]==am[k[1]])&& (am[k[1]]==am[k[2]])) {
                        setTimeout(()=>{
                            let winnerMark = e.target.textContent;
                            gameEndResult.innerHTML = winnerMark + ' is the winner'
                            winner.showModal();
                            if (winnerMark==='X') {
                                x+=1;
                            }
                            else if (winnerMark === 'O') {
                                o+=1;
                            }
                            displayScore()
                        },100)
                    }
                    else {
                        if (!st.includes('a')) {
                            gameEndResult.innerHTML = 'It is tie game';
                            winner.showModal()
                        }
                    }
                }

            })
        })
    }
    const displayScore = function() {
        markChanger.removeEventListener('click',swapValues)
        if (mark1.textContent === 'O') {
            score1.textContent = o;
            score2.textContent = x;
        }
        else {
            score1.textContent = x;
            score2.textContent = o;
        }
    }
    return { arrCells, setGameBoard }
}
let d = generalGameBoard();

gameType.addEventListener('change', ()=>{
    reset()
    if (gameType.value==='twos') {
            let player1Name = prompt('First name of the first player(Ice Breaker)?','Zaky')
            let player2Name = prompt('First name of the second player?','Maky')
            playerNameOne.textContent = player1Name;
            playerNameTwo.textContent = player2Name;
            arrBtns.forEach((b)=>{
                b.addEventListener('click',()=>{
                    reset()
                    winner.close()
                    am = [0,1,2,3,4,5,6,7,8];
                    st = Array(9).fill('a')
                })
            })
            arrBtns[0].addEventListener('click', ()=>{
                resetScore()
                enableSwap()
            })
            markChanger.addEventListener('click',swapValues)
            d.setGameBoard();
    }

    else if (gameType.value==='one') {
            gameType.value = ''
            alert('The option is not working for the time being (left for the later update)')
    }
})


//Function that swap starting mark

function swapValues() {
    mark1.textContent = mark1.textContent==='X' ? 'O':'X';
    mark2.textContent = mark2.textContent==='X' ? 'O':'X';
    currentValue = mark1.textContent;
}
// function to unlock the game UI

function getToGameAndNotify() {
    container.style.transform = 'translateX(-100%)'
    container.style.transition = 'transform 1s';
    gameContainer.style.transform = 'translateY(-100%)'
    gameContainer.style.transition = 'transform 1.5s'
    setTimeout(()=>{notice.showModal()},2100)
    setTimeout(()=>notice.close(), 11000)
}
// function to reset the game

function reset() {
    arrCells.forEach(c=>{
        c.textContent='';
        currentValue = mark1.textContent
    })
}
// enabling listener to allow swapping marks

function enableSwap() {
    markChanger.addEventListener('click',swapValues)
}

const replay = document.querySelector('.replay')
replay.addEventListener('click', ()=>{
    markChanger.removeEventListener('click',swapValues)
})
//score reseter function
function resetScore() {
    x = 0;
    o = 0;
    score1.textContent = 0;
    score2.textContent = 0;
}
// event listeners
emabarker.addEventListener('click', getToGameAndNotify)
helpImgBtn.addEventListener('click', ()=>{dialog.showModal()})
dialogClose.addEventListener('click', ()=>{dialog.close()})