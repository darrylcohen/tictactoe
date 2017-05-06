// Function Closure. Get and store all the elements once
var view = (function () {
    var gameData = {
			gameTiles: document.getElementsByClassName("box"),
			p1Score: document.getElementById("p1Score"),
			p2Score: document.getElementById("p2Score"),
			drawScore: document.getElementById("drawScore"),
			message: document.getElementById("message"),
			changeMessage: function(message) {
//				this.message.innerText = message;
				$(".message").text(message);
			},
		};
    return function () {return gameData;}
})();

var logic = {
		currentPlayer: 1,
		playersTurn: 1,
		guesses:[] ,
		gameLogic: 

				function (gameTile) {
					if (!($(gameTile).text() == "O" || $(gameTile).text() == "X")) {
						var symbols = ["O","X"];

						$(gameTile).text(symbols[logic.currentPlayer-1]).css({color:"red"});
						logic.guesses.push(gameTile);

						if(logic.checkWinner(view().gameTiles)) {
							logic.updateGame(logic.currentPlayer, "Player " + logic.currentPlayer + " WINNER!!!!");	
						} else if (logic.checkDraw(view().gameTiles)) {
							logic.updateGame("draw", "The Game was a Draw");	
						} else {
							// change the player
							logic.changePlayer(logic.currentPlayer = logic.currentPlayer == 1 ? 2:1);
						}
					}
				},
		updateGame:
				function(currentPlayer, message) {
						if(currentPlayer == 1)  {
							view().p1Score.innerText = Number(view().p1Score.innerText) + 1;
						} else if (currentPlayer == 2){
								view().p2Score.innerText = Number(view().p2Score.innerText) + 1;
						} else {
								view().drawScore.innerText = Number(view().drawScore.innerText) +1;
						}
						view().changeMessage(message);
						$(".message").animate({fontSize:"200%"},2000);
				},
		checkTilesEqual :
				function(tile1, tile2, tile3){
						// reason for result is to return from 1 place in the function
						var result;
						// If any of the 3 tiles = "" then cannot have a winner for that option
						if( view().gameTiles[tile1].innerText == "" || view().gameTiles[tile2].innerText == "" || view().gameTiles[tile3].innerText == "") {
							result = false;
						// If the 3 tiles are the same symbol then have a winning option
						} else if ((view().gameTiles[tile1].innerText == view().gameTiles[tile2].innerText) &&
								   (view().gameTiles[tile1].innerText == view().gameTiles[tile3].innerText)) {
							$(view().gameTiles[tile1]).css("color","black");
							$(view().gameTiles[tile2]).css("color","black");
							$(view().gameTiles[tile3]).css("color","black");
							result = true
						} 
						return result;
				},

		checkWinner:
				function (gameTiles) {
						var result = false;
						if ( logic.checkTilesEqual(0,1,2)  || //Horizontal top
							logic.checkTilesEqual(3,4,5) || //Horizontal middle
							logic.checkTilesEqual(6,7,8) || //Horizontal bottom
							logic.checkTilesEqual(0,3,6) || //Vertical left
							logic.checkTilesEqual(1,4,7) || //Vertical middle
							logic.checkTilesEqual(2,5,8) || //Vertical right
							logic.checkTilesEqual(0,4,8) || //Diagonal top left bottom right
							logic.checkTilesEqual(2,4,6) ) {  // Diagonal top right bottom left
							result = true;
						}
						return result;
				},
		checkDraw:
				function (gameTiles) {
						if(logic.guesses.length == 9) {
							return true;
						}
				},	
		changePlayer:
				function (player) {
						logic.currentPlayer = player;
						view().changeMessage("Player " + player + " to Go");
				},
		reset:
				function() {
						// change the tet for all the tiles
						for(var i = 0; i < view().gameTiles.length; i++) {
							view().gameTiles[i].innerText = "";

						}
//						
						
						logic.changePlayer(logic.playersTurn = logic.playersTurn == 1 ? 2:1);
						$(".message").animate({fontSize:"150%"});
						//reset the guesses
						logic.guesses.length = 0;
				},
};

$(document).ready(function() {

	// add all tic tac toe squres
	for(i = 0; i < 9; i++) {
		var box = document.createElement("div");
		$(box).attr("data-id", "a").attr("class", "box").click(function () {logic.gameLogic(this)});
		$(box).attr("data-id", "a").attr("class", "box");
//		box.addEventListener("click", function () {logic.gameLogic(this)});
		$(".gameContainer").append(box);
	}
	$("#playAgain").click(function() {logic.reset()});


});

