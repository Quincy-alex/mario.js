// FONCTIONS
function initGame()
{
    intiMario();
    initPumba();
    setInterval(randomPiece,2500);
    setInterval(spawnGoomba, 1000);
    timerCoin = setInterval(collisiontrue,30);
    timerChrono = setInterval(diminuerTemps,1000); 
    timerCollision =setInterval(collision2true,1000);
    window.addEventListener('keydown', onKeyDown);
}

function intiMario()
{
    mario.style.position = 'absolute';
    mario.style.left = window.innerWidth/2 - mario.width/2 + "px";
    mario.style.top= window.innerHeight/2 - mario.height/2 + "px";
}

function initPumba()
{
    pumba.style.top = "200px";
    pumba.style.left = "200px";
    xymarioold = [mario.style.left, mario.style.top];
}

function onKeyDown(e) 
{
    switch(e.key){
            case "ArrowUp": 
            mario.style.top = parseInt(mario.style.top)- move + 'px';
        break;
            case "ArrowDown": 
            mario.style.top = parseInt(mario.style.top) + move + 'px';
        break;
            case "ArrowRight": 
            mario.style.left = parseInt(mario.style.left) + move + 'px';
        break;
            case "ArrowLeft": 
            mario.style.left = parseInt(mario.style.left)- move + 'px';
        break;
    }
}

function diminuerTemps() 
{
    time.innerText = `Temps restant : ${temps} s`;
    temps--;

    if (temps < 0) {
        clearInterval(timerChrono);
        gameover();
    }
}

// suite pumba vénère
function spawnGoomba()
{
    pumba.style.left = parseInt(xymarioold[0]) + "px";
    pumba.style.top = parseInt(xymarioold[1]) + "px";
    xymarioold = [mario.style.left, mario.style.top];
}  

// diminution du score et collision pumba
function collision2true()
{
    if (
        (piece.offsetLeft > mario.offsetLeft + mario.offsetWidth ||
          pumba.offsetLeft < mario.offsetLeft - pumba.offsetWidth ||
          pumba.offsetTop > mario.offsetTop + mario.offsetHeight ||
          pumba.offsetTop < mario.offsetTop - pumba.offsetHeight) != true
      ) {
        spawnGoomba();
        scores = scores - 1;
        score.innerHTML = " Score = " + scores;
      }
}

// arret du jeu
function gameover()
{
    if (scores <= 0) {
        gameOver.classList.remove('hidden');
    }
    else {
        great.classList.remove('hidden');
    }
    
    mario.classList.add('hidden');
    piece.classList.add('hidden');
    clearInterval(timerCollision)
    clearInterval(timerCoin);
}

function randomPiece()
{
    pos_x = Math.round(Math.random()*window.innerWidth);
    pos_y = Math.round(Math.random()*window.innerHeight);
    document.getElementById("piece").style.left = pos_x+ "px";
    document.getElementById("piece").style.top= pos_y+ "px";
}

function collisiontrue()
{
    if ((piece.x > mario.x+ mario.width ||piece.x < mario.x- piece.width || piece.y > mario.y+ mario.height || piece.y < mario.y- piece.height) != true)
    {
        randomPiece();
        scores = scores + 1;
    }
    score.innerHTML = " Score = " + scores;
}

/////////////////////
// INITIALISATIONS //
/////////////////////
let scores = 0 ;
let temps = 3;
let xymarioold;
let timerCoin;
let timerChrono;
let timerCollision;
let mario = document.getElementById('perso');
let piece = document.getElementById('piece');
let gameOver = document.getElementById("gameover");
let great = document.getElementById("great");
let score = document.getElementById("score");
let time = document.getElementById("temps");
let pumba = document.getElementById("pumba");
let move = 50;

////////////////////
// CODE PRINCIPAL //
////////////////////
initGame();