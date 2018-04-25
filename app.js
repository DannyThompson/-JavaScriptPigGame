/*
This was done as a part of a course project to learn JavaScript through Udemy.    (https://www.udemy.com/the-complete-javascript-course)
The index.html, images, and style.css were provided, with only some id's added from me.
Only this class was 100% done by me.
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

initializeNewGame();

/* Change Player when activePlayer rolls a 1 or holds */
function changePlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    setAndUndoActivePanels(activePlayer);
}

/* Alternate between panel types (active/inactive), based on who's turn it is */
function setAndUndoActivePanels(active) {
     var inactive = active === 0 ? 1 : 0;
     var getPanelId = function(panel) {
        return "player-" + panel + "-panel";  
    }
    document.getElementById(getPanelId(inactive))
        .className = getPanelId(inactive);
    document.getElementById(getPanelId(active))
        .className = getPanelId(active) + " active";
}

/* Generate a random # between 1 and 6 to simulate a dice roll */
function generateRandomRoll() {
    return Math.floor(Math.random() * 6) + 1;
}

/* The winner panel will be changed and an alert will appear to notify the winner. */
function setWinnerPanel() {
    var panel = "player-" + activePlayer + "-panel";
    document.getElementById(panel).className = panel + " winner";
    setTimeout(function() {
        alert("Player " + (activePlayer + 1) + " wins!");
        initializeNewGame();
    }, 100); //Set short delay so that the panel can update before alerting the winner.
}

/* Initialize the Game */
function initializeNewGame() {
    diceDom.style.display = 'none';
    this.document.querySelector('#current-0').textContent = 0;
    this.document.querySelector('#current-1').textContent = 0;
    this.document.querySelector('#score-0').textContent = 0;
    this.document.querySelector('#score-1').textContent = 0;
    scores = [0, 0];
    roundScore, activePlayer = 0;
    dice = 0;
    setAndUndoActivePanels(0);
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
    if(scores[activePlayer] >= 50) {
        setWinnerPanel();
        return;
    }
    roundScore = 0;
    changePlayer();
}

document.querySelector('.btn-roll').onclick = function() {
    if(diceDom.style.display === 'none') {
        diceDom.style.display = 'inline';
    }
    
    dice = generateRandomRoll();
    if(dice == 1) {
        document.querySelector('#current-' + activePlayer).textContent = dice;
        roundScore = 0;
        changePlayer();
        return;
    }
    else {
        document.querySelector('#current-' + activePlayer).textContent = dice;
        roundScore += dice;
        diceDom.src = "dice-" + dice + ".png";
        console.log(dice);
    }
}