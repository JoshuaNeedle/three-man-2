//Three Man

var players, activePlayer, threeMan, gamePlaying, rollNumber;

function getPlayers() {
	players = prompt("How many players will be in this game? Enter a number (up to 10) or type exit to leave");
	if (parseInt(players) > 10) {
		alert("You cannot have more than 10 players");
		init()
	} else if (players && players !== "exit") {
		players = parseInt(players) - 1;
		for (i = 0; i < 10; i++) {
			if (i > players){
				document.getElementById("name-" + i).style.display = "none"
			}
		}
	}
}
function init () {
	getPlayers();
	document.querySelector(".player-0-panel").classList.toggle("active");
	gamePlaying = true;
	activePlayer = 0;
	threeMan = "";
}

init();

document.querySelector(".btn-new").addEventListener("click", init);

document.querySelector(".btn-roll").addEventListener("click", function() {
	if (gamePlaying) {
		//1. Random Number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		//2. Display Result
		document.getElementById("dice-1").style.display = "block";
		document.getElementById("dice-2").style.display = "block";
		document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
		document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
		var drinks = []
		rollRules(dice1, dice2, drinks)
		if (drinks.length === 0) {
			nextPlayer();
			drinks[i] = "Next player's turn"
		} else {
			rollNumber += 1;
			document.querySelector("#roll").textContent = "Successful Rolls: " + rollNumber;
		}
		document.querySelector("#results-drinks").textContent = drinks.join("; ");
	}
});

function rollRules(el1, el2, arr) {
	i = 0;
	var totalRoll = el1 + el2
	var activePlayerName = activePlayer + 1
	var playerAhead = activePlayer + 2
	var playerBehind = activePlayer
	if (el1 === 3 || el2 === 3 || totalRoll === 3) {
		if (threeMan !== "") {
			var threeManPlayer = threeMan + 1
			if (threeMan == activePlayer) {
				threeMan = "";
				document.querySelector("#name-" + activePlayer).textContent = "PLAYER " + activePlayerName;
			} else if (el1 === 3 && el2 === 3) {
				arr[i] = "Three Man: Player " + threeManPlayer + " drinks twice";
				i += 1;
			} else {
				arr[i] = "Three Man: Player " + threeManPlayer + " drinks once";
				i += 1;
			}
		} else {
			threeMan = activePlayer;
			document.querySelector("#name-" + activePlayer).textContent = "PLAYER " + activePlayerName + " - THREE MAN";
		}
	}
	
	if (el1 === el2) {
		arr[i] = "Player " + activePlayerName + " gives out two drinks";
		i += 1;
	}
	
	if (totalRoll === 7) {
		arr[i] = "7 - Player " + playerBehind + " drinks once";
		i += 1;
	}
	
	if (totalRoll === 11) {
		arr[i] = "11 - Player " + playerAhead + " drinks once";
		i += 1;
	}
	
	return arr
}

function nextPlayer() {
	document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
	activePlayer === players ? activePlayer = 0 : activePlayer += 1;
	document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
	rollNumber = 0;
	document.querySelector("#roll").textContent = "Successful Rolls: " + rollNumber;
}






























