/*
This was done as a part of a (first) course project to learn JavaScript through Udemy.    (https://www.udemy.com/the-complete-javascript-course)
The index.html, images, and style.css were provided, with only some id's added from me.
Only this class was 100% done by me to challenge myself.
*/

/* 
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game
*/

/* Global Vars */
var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;
var dice = 0;
var diceDom = document.querySelector('.dice');
var hasBeenWon = false;

initializeNewGame();

/* Change Player when activePlayer rolls a 1 or holds */
function changePlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    setAndUndoActivePanels();
}

/* Alternate between panel types (active/inactive), based on who's turn it is */
function setAndUndoActivePanels() {
    diceDom.style.display = 'none';
    togglePlayers();
}

/* Used in initialize, and when the player holds. Reset the current score's text to 0. */
function resetCurrentScore() {
    document.getElementById('current-' + activePlayer).textContent = 0;
}

/* Swap between active players */
function togglePlayers() {
     document.querySelector('.player-1-panel').classList.toggle('active');
     document.querySelector('.player-0-panel').classList.toggle('active');
}

/* The winner panel will be changed and an alert will appear to notify the winner. */
function setWinnerPanel() {
    var panel = ".player-" + activePlayer + "-panel";
    document.querySelector(panel).classList.toggle('winner');
    setTimeout(function() {
        alert("Player " + (activePlayer + 1) + " wins!");
        initializeNewGame();
    }, 100); //Set short delay so that the panel can update before alerting the winner.
}

/* Initialize the Game */
function initializeNewGame() {
    if(activePlayer === 1) {
        togglePlayers();
    }
    if(hasBeenWon) {
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
    }
    resetCurrentScore();
    diceDom.style.display = 'none';
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    dice = 0;
    this.document.querySelector('#score-0').textContent = 0;
    this.document.querySelector('#score-1').textContent = 0;
    hasBeenWon = false;
}

/************************/
/***On-Click functions***/
/************************/
document.querySelector('.btn-new').onclick = function() {
    initializeNewGame();
}

document.querySelector('.btn-hold').onclick = function() {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer] >= 10) {
        hasBeenWon = true;
        setWinnerPanel();
        return;
    }
    roundScore = 0;
    resetCurrentScore();
    changePlayer();
}

document.querySelector('.btn-roll').onclick = function() {
    if(diceDom.style.display === 'none') {
        diceDom.style.display = 'inline';
    }
    
    dice = Math.floor(Math.random() * 6) + 1; //Generate random # 1-6
    
    if(dice === 1) {
        diceDom.src = "dice-" + dice + ".png";
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        changePlayer();
        return;
    } else {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        diceDom.src = "dice-" + dice + ".png";
    }
}