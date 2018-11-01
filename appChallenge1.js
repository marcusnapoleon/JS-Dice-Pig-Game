/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



/*  USED FOR TESTING    
//dice = Math.floor(Math.random() * 6) + 1;

//document.querySelector(`#current-` + activePlayer).innerHTML = `<em>` + dice + `</em>`;
//var x = document.querySelector(`#score-0`).textContent;
//console.log(x);
*/



var scores, roundScore, prevRoll, activePlayer, dice, gameStatus;

var rollDice1, rollDice6, winGame;

gameInit();

document.querySelector(`.dice`).style.display = `none`;



/****** SETTING UP AN EVENT HANDLER/LISTENERS ******/

//*************  BUTTON ROLL


document.querySelector(`.btn-roll`).addEventListener(`click`, function () {
	
	if (gameStatus) {
		
		// A. Generate Random Number
		var dice = Math.floor(Math.random() * 6) + 1;
		
		// B. Display The Result of the Dice Roll
		var diceDOM = document.querySelector(`.dice`);
		diceDOM.style.display = `block`;
		diceDOM.src = `dice-` + dice + `.png`;
		
		if (dice === 6 && prevRoll === 6) {
			
			playSmash();//for playing notification "bell ding" when a player rolls a "6" (NOT PART OF COURSE PROJECT REQUIREMENT)
			scores[activePlayer] = 0;
			document.getElementById(`score-` + activePlayer).textContent = `0`;
			nextPlayer();
			
			
			console.log(prevRoll);//shows value of PREVIOUS dice roll
			console.log(dice);//shows value of CURRENT dice roll
			
			console.log(dice === 1);//verifies if dice roll = '1'
			
			console.log(dice === 6);//verifies if dice roll = '6'
			console.log(prevRoll === 6);//verifies if dice roll = '6'
			console.log(dice === prevRoll);//verifies if BOTH VALUES MATCH
			
			} else if (dice > 1 ) {
			roundScore += dice;
			document.getElementById(`current-` + activePlayer).textContent = roundScore;
			
			} else {
			playBell();//for playing notification "bell ding" when a player rolls a "1" (NOT PART OF COURSE PROJECT REQUIREMENT)
			nextPlayer();
					
			}
			prevRoll = dice;
			console.log(roundScore);
			console.log(prevRoll);//shows value of PREVIOUS dice roll
			console.log(dice);//shows value of CURRENT dice roll
			
			console.log(dice === 1);//verifies if dice roll = '1'
			
			console.log(dice === 6);//verifies if dice roll = '6'
			console.log(prevRoll === 6);//verifies if dice roll = '6'
			console.log(dice === prevRoll);//verifies if BOTH VALUES MATCH
		
			console.log(newPointLimit.value);
	}
});



//***************  BUTTON HOLD

function nextPlayer() {
	
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById(`current-0`).textContent = `0`;
	document.getElementById(`current-1`).textContent = `0`;
	
	document.querySelector(`.player-0-panel`).classList.toggle(`active`);
	document.querySelector(`.player-1-panel`).classList.toggle(`active`);
	
	document.querySelector(`.dice`).style.display = `none`;
	
}

/*******  SETTING UP EVENT NOTIFICATION SOUNDS  ******/

// Added the following functions to play different notification sounds depending on event that took place during the game.
// Added feature not part of the course project requirements. Added personal touch.

function playTada() {
	document.getElementById(`winTada`).play(winGame);//function for playing celebratory "ta-da" when a player wins
}

function playBell() {
	document.getElementById('roll1Bell').play(rollDice1);//function for playing notification "bell ding" when a player rolls a "1"
}

function playSmash() {
	document.getElementById('roll6Smash').play(rollDice6);//function for playing notification "smash" when a player rolls a "6"
}



/****** SETTING UP AN EVENT LISTENER ******/

// 1. Select the element where/which will trigger the event, in this case for the // project the element is the 'button' representing the 'hold' score - class "btn-hold". this will also trigger a change of active player.


document.querySelector(`.btn-hold`).addEventListener(`click`, function () {
	
	if (gameStatus) {
		scores[activePlayer] += roundScore;
		document.getElementById(`score-` + activePlayer).textContent = scores[activePlayer];
		
		if (scores[activePlayer] >= document.getElementById(`newPointLimit`).value) {
			playTada();//for playing celebratory "ta-da" when a player wins (NOT PART OF COURSE PROJECT REQUIREMENT)
			document.getElementById('name-' + activePlayer).textContent = 'You Win!';
			document.querySelector(`.dice`).style.display = 'none';
			document.querySelector(`.player-` + activePlayer + `-panel`).classList.add(`winner`);
			document.querySelector(`.player-` + activePlayer + `-panel`).classList.remove(`active`);
			gameStatus = false;
		} else {
		console.log(newPointLimit.value);

		nextPlayer();
		}
	}	
});

console.log(newPointLimit.value);


//*************  BUTTON NEW GAME


document.querySelector(`.btn-new`).addEventListener('click', gameInit);

function gameInit() {
	scores = [0, 0];//variable to store scores for player[index] = 1[0] and 2[1]//
	roundScore = 0;//variable to store current score for the active player//
	prevRoll = 0;//variable to be used to compare if following dice roll is equal a 6//
	activePlayer = 0;//variable to store information on who is the active player//
	gameStatus = true;//this is the STATE VARIABLE //
	
	
	document.getElementById(`newPointLimit`).value = `100`;
	
	document.querySelector(`.dice`).style.display = `none`;//removes dice image from GUI
	
	document.getElementById(`score-0`).textContent = `0`;//resets player global score to 0
	document.getElementById(`score-1`).textContent = `0`;//resets player global score to 0
	document.getElementById(`current-0`).textContent = `0`;//resets player current score to 0
	document.getElementById(`current-1`).textContent = `0`;//resets player current score to 0
	
	document.getElementById('name-0').textContent = 'Player 1';//resets back to player name - Player 1
	document.getElementById('name-1').textContent = 'Player 2';//resets back to player name - Player 2
	
	document.querySelector(`.player-0-panel`).classList.remove(`winner`);
	document.querySelector(`.player-1-panel`).classList.remove(`winner`);
	//the above resets both players GUI to default style, removing the '.winner' style CSS
	document.querySelector(`.player-0-panel`).classList.remove(`active`);
	document.querySelector(`.player-1-panel`).classList.remove(`active`);
	//the above resets both players GUI to default style, removing the '.active' style CSS
	//both '.active' and '.winner' classes are being removed to ensure game and GUI are at default state before a new game starts.
	document.querySelector(`.player-0-panel`).classList.add(`active`);
	//the above resets both players panel GUI to default style, removing the '.winner' style CSS
	//while we have removed the panel '.active' classes (line 271 and 272) we are adding it again,
	//but only to player 1 (.player-0-panel) sinec when teh game starts, player 1 is the default
	//starting player (activePlayer).
	
	
}


/****** STATE VARIABLE*/
//a variable that is able to provide information on the condition/state of the system/app 
//in our project, the question or state that we need to find out is, whether our game is 
//playing or not. This new variable will need to be created at the Global Level so that it can 
//be re-used in other functions. if created within a function as above in the game initialization //(line 253) the variable (Local Level) will only be accessible to the gameInit() 
//this is due to the Scope Chain rule/flow.
//new variable (State Variable) declared 'gameStatus' (line 24)

//the gameStatus jobs is to allow certain conditions if gameStatus=true and prevent them when the
//gameStatus = false.  in our game we need the ability to prevent rolling the dice and change //GUI/panel display when a winner has already been declared (reached 100 points).
//to address the issue we need to determine where the 'roll dice' and 'panel display' are taking place
//and in our game it is in the '.btn-roll' event, so we have to create a function for the gameStatus 
//variable within the .btn-roll event and enclose all other codes from .btn-roll event within - this
//means if the game is playing (true) all of our code inside will work, allow roll dice, update panel
//info and display. but as soon as a winner is declared the game is no longer playing (false) and 
//all of our code inside will/should no longer work, roll dice, update panel not available until a 
//new game is started.







