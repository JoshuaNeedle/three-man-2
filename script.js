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
			if (i > players) {
				document.getElementById("name-" + i).style.display = "none"
			} else {
				document.getElementById("name-" + i).style.display = "block"
				document.getElementById("name-" + i).innerHTML = "PLAYER " + (i + 1)
				document.querySelector(".player-" + i + "-panel").classList.remove("active");
			}
		}
	}
}

function init () {
	getPlayers();
	clearResults();
	document.querySelector(".player-0-panel").classList.toggle("active");
	gamePlaying = true;
	activePlayer = 0;
	threeMan = "";
	rollNumber = 0;
	changeRoll();
}

init();

document.querySelector(".btn-new").addEventListener("click", init);

document.querySelector(".btn-roll").addEventListener("click", function() {
	if (gamePlaying) {
		clearResults();
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		document.getElementById("dice-1").style.display = "block";
		document.getElementById("dice-2").style.display = "block";
		document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
		document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
		var drinks = []
		rollRules(dice1, dice2, drinks)
		if (drinks.length === 0) {
			nextPlayer();
			drinks[i] = "No Drinks - Turn is over: Player " + (activePlayer + 1) + "'s turn."
		} else {
			rollNumber += 1;
			changeRoll();
			if (rollNumber % 6 === 0) {
				document.querySelector("#results-three-man").textContent = "Six Successful Roles - Make a rule"
			}
		}

		for (i = 0; i < drinks.length; i++) {
			document.querySelector("#results-drinks-" + i).textContent = drinks[i];
		}
	}
});

function clearResults() {
	document.querySelector("#results-three-man").textContent = "";
	document.querySelector("#results-drinks-0").textContent = "";
	document.querySelector("#results-drinks-1").textContent = "";
	document.querySelector("#results-drinks-2").textContent = "";
}

function rollRules(el1, el2, arr) {
	i = 0;
	var playerAhead, playerBehind
	var totalRoll = el1 + el2
	var activePlayerName = activePlayer + 1
	activePlayer === 0 ? playerBehind = players + 1 : playerBehind = activePlayer
	activePlayer === players ? playerAhead = 1 : playerAhead = activePlayer + 2
	if (el1 === 3 || el2 === 3 || totalRoll === 3) {
		if (threeMan !== "") {
			var threeManPlayer = threeMan + 1
			if (threeMan == activePlayer) {
				threeMan = "";
				document.querySelector("#results-three-man").textContent = "Three rolled: THREE MAN is open";
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
			document.querySelector("#results-three-man").textContent = "Three rolled: Player " + activePlayerName + " is now THREE MAN";
			document.querySelector("#name-" + activePlayer).textContent = "PLAYER " + activePlayerName + " - THREE MAN";
		}
	}
	
	if (el1 === el2) {
		arr[i] = "Doubles: Player " + activePlayerName + " gives out two drinks";
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

function changeRoll () {
	document.querySelector("#roll").textContent = "Successful Rolls: " + rollNumber;
}

function nextPlayer() {
	document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
	activePlayer === players ? activePlayer = 0 : activePlayer += 1;
	document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
	rollNumber = 0;
	changeRoll();
}


