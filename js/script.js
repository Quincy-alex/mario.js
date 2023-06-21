// FONCTIONS



// CODE PRINCIPAL


let mario = document.getElementById('perso');
let piece = document.getElementById('piece');
let gameOver = document.getElementById("gameover");
let great = document.getElementById("great");
let score = document.getElementById("score");
let time = document.getElementById("temps");
let pumba = document.getElementById("pumba");
let move = 50;

// mario au milieu
window.addEventListener('load', () => 
{
    mario.style.position = 'absolute';
    mario.style.left = window.innerWidth/2 - mario.width/2 + "px";
    mario.style.top= window.innerHeight/2 - mario.height/2 + "px";
});

//attribution touche pour deplacement mario
window.addEventListener('keydown', function(e){
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
});

// deplacement aleatoire de la pièce
function randomPiece()
{
    pos_x = Math.round(Math.random()*window.innerWidth);
    pos_y = Math.round(Math.random()*window.innerHeight);
    document.getElementById("piece").style.left = pos_x+ "px";
    document.getElementById("piece").style.top= pos_y+ "px";
}
setInterval(randomPiece,2500)

// pumba vénère
pumba.style.top = "200px";
pumba.style.left = "200px";
let xymarioold = [mario.style.left, mario.style.top];
setInterval(spawnGoomba, 1000);

// score et colision
let scores = 0 ;
function collisiontrue()
{
    if ((piece.x > mario.x+ mario.width ||piece.x < mario.x- piece.width || piece.y > mario.y+ mario.height || piece.y < mario.y- piece.height) != true)
    {
        randomPiece();
        scores = scores + 1;
    }
    score.innerHTML = " Score = " + scores;
}
setInterval(collisiontrue,30);

//timer
let temps = 3;
function diminuerTemps() 
{
    time.innerText = `Temps restant : ${temps} s`;
    temps--;

    if (temps < 0) {
        clearInterval(timerChrono);
        gameover();
    }
}

let timerChrono = setInterval(diminuerTemps,1000) // création d'une variable pour arreter l'interval


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
        console.log(scores);
        score.innerHTML = " Score = " + scores;
      }
}

let timerCollision = setInterval(collision2true,1000); // variable pour arreter l'intervalle

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
    score.innerHTML =" Score = " + scores;
    clearTimeout(timerCollision)
}


// après avoir régler le problème du timer en haut a gauche t'as mario qu'a sauté

