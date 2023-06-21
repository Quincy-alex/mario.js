let mario = document.getElementById('perso');
let piece = document.getElementById('piece');
let gameOver = document.getElementById("gameover");
let great = document.getElementById("great");
let score = document.getElementById("score");
let time = document.getElementById("temps");
let pumba = document.getElementById("pumba");
let move = 50;
gameOver.width = 0;
gameOver.height = 0;
// Pour masquer gameover
gameOver.style.display = "none";
// Pour masquer great
great.style.display = "none";

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
let temps = 30;
function diminuerTemps() 
{
    console.log('coucou');
    time.innerText = " Temps restant: " + temps;
    temps--;
    return temps;
  }
let timer1= setInterval(diminuerTemps,1000) // création d'une variable pour arreter l'interval

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

let timer =setInterval(collision2true,1000); // variable pour arreter l'intervalle

// arret du jeu
function gameover()
{
        if (temps <= 0 && scores <= 0)
        {
            gameOver.width=518;
            gameOver.height=77;
            time.style.opacity="100%";
            mario.style.opacity="0%";
            piece.style.opacity="0%";
            score.innerHTML =" Score = " + scores;
        }
        else if (temps <= 0 && score > 0)
        {
            great.width=518;
            great.height=77;
            time.style.opacity="100%";
            mario.style.opacity="0%";
            piece.style.opacity="0%";
            score.innerHTML =" Score = " + scores;
        }
            clearTimeout(timer)
            clearTimeout(timer1)
}
setInterval(gameover,30)


// après avoir régler le problème du timer en haut a gauche t'as mario qu'a sauté

