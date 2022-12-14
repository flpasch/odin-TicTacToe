// 3x3 game area

const Gameboard = (() => {
	const gameArea = document.getElementById("gameboard");
	let board = [];

	const init = () => {
		for (let i = 0; i < 9; i++) {
			board.push("");
		}
	};

	const removeListener = () => {
		const fields = document.querySelectorAll(".field");
		console.log("removing..");
		fields.removeEventListener("click", handleClick);
	};

	const render = () => {
		let index = 0;
		board.forEach((field) => {
			const newField = document.createElement("div");
			newField.classList = "field";
			newField.textContent = field;
			newField.index = index;
			newField.addEventListener("click", handleClick, { once: true });
			gameArea.appendChild(newField);
			index++;
		});
	};

	const reload = () => {
		gameArea.textContent = "";
		Gameboard.render();
	};

	const reset = () => {
		gameArea.textContent = "";
		board.length = 0;
		TicTacToe.gameOver = false;
	};

	const handleClick = (e) => {
		const { target } = e;
		if (target.textContent === "") {
			target.textContent = TicTacToe.currentPlayer.mark;
			TicTacToe.nextRound();
			board[target.index] = TicTacToe.currentPlayer.mark;

			if (TicTacToe.rowOfThree()) {
				TicTacToe.togglePopupOn("won");
				TicTacToe.currentPlayer.points++;
				TicTacToe.gameOver = true;
				TicTacToe.currentPlayer = TicTacToe.player1;
			}

			if (TicTacToe.currentRound === 9 && !TicTacToe.rowOfThree()) {
				TicTacToe.togglePopupOn("tie");
				TicTacToe.gameOver = true;
				TicTacToe.currentPlayer = TicTacToe.player1;
			}
		}
		TicTacToe.nextPlayer();
	};

	return {
		init,
		render,
		board,
		reset,
		handleClick,
		removeListener,
		reload,
	};
})();

// player object
const Player = (name, mark, isHuman) => {
	let points = 0;

	return {
		name,
		mark,
		points,
		isHuman,
	};
};

// game handle object
const Game = () => {
	const btnReset = document.getElementById("restart");
	let player1;
	let player2;
	let currentPlayer;
	let currentRound = 0;
	let gameOver = false;
	const winningConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 4, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],
	];

	const rowOfThree = () => {
		console.log("checking..");
		let result = false;
		winningConditions.forEach((combination) => {
			if (
				Gameboard.board[combination[0]] === TicTacToe.currentPlayer.mark &&
				Gameboard.board[combination[1]] === TicTacToe.currentPlayer.mark &&
				Gameboard.board[combination[2]] === TicTacToe.currentPlayer.mark
			) {
				console.log("ROW OF THREE");
				result = true;
				Gameboard.reset();
				TicTacToe.gameOver = true;
			}
		});

		return result;
	};

	const newGame = () => {
		Gameboard.init();
		Gameboard.render();
		togglePopupOn("new");
		const BTNstart = document.getElementById("btn-start");
		const newGamePopup = document.getElementById("name-selection");
		const player1UIname = document.getElementById("player1-name");
		const player2UIname = document.getElementById("player2-name");

		BTNstart.addEventListener("click", () => {
			let p1 = document.getElementById("player1").value;
			let p2 = document.getElementById("player2").value;

			if (p1 === "") {
				TicTacToe.player1 = Player("Player1", "X", true);
			} else if (p1 != "") {
				TicTacToe.player1 = Player(p1, "X", true);
				player1UIname.textContent = p1;
			}
			if (p2 === "") {
				TicTacToe.player2 = Player("BrRAin", "O", false);
				player2UIname.textContent = "BrRAin";
			} else if (p2 != "") {
				TicTacToe.player2 = Player(p2, "O", true);
				player2UIname.textContent = p2;
			}

			newGamePopup.style.display = "none";
			togglePopupOff();
			TicTacToe.currentPlayer = TicTacToe.player1;
		});
	};

	const nextPlayer = () => {
		console.log("next Player");
		if (TicTacToe.player1 === TicTacToe.currentPlayer) {
			TicTacToe.currentPlayer = TicTacToe.player2;
		} else {
			TicTacToe.currentPlayer = TicTacToe.player1;
		}
		if (TicTacToe.currentPlayer.isHuman === false) {
			TicTacToe.computerTurn();
		}
	};

	// toggles popup container on/off related to parameter passed
	const togglePopupOn = (result) => {
		const container = document.getElementById("popup-container");
		const newGamePopup = document.getElementById("name-selection");
		container.style.display = "flex";
		if (result === "tie") {
			console.log("tie Popup");
			container.textContent = "It's a TIE";
		} else if (result === "won") {
			console.log("won Popup");
			container.textContent = `${TicTacToe.currentPlayer.name} WON`;
		} else if (result === "lost") {
			console.log("lost popup");
			container.textContent = "You LOST";
		} else if (result === "new") {
			console.log("new Game popup");
			newGamePopup.style.display = "flex";
		}
	};

	const computerTurn = () => {
		if (TicTacToe.gameOver === false) {
			let rndField = Math.floor(Math.random() * 8);

			if (Gameboard.board[rndField] === "") {
				Gameboard.board[rndField] = TicTacToe.currentPlayer.mark;
				if (TicTacToe.rowOfThree()) {
					TicTacToe.currentPlayer = TicTacToe.player2;
					console.log(TicTacToe.currentPlayer);
					togglePopupOn("won");
					TicTacToe.currentPlayer.points++;
					TicTacToe.nextPlayer();
					TicTacToe.currentPlayer = TicTacToe.player1;
				} else {
					TicTacToe.nextPlayer();
					TicTacToe.nextRound();
					Gameboard.reload();
				}
			} else {
				computerTurn();
			}
		} else if (TicTacToe.gameOver === true) {
			return;
		}
	};

	const togglePopupOff = () => {
		const container = document.getElementById("popup-container");
		container.textContent = "";
		container.style.display = "none";
	};

	const nextRound = () => TicTacToe.currentRound++;

	const restartGame = () => {
		const player1Points = document.getElementById("player1-points");
		const player2Points = document.getElementById("player2-points");
		player1Points.textContent = TicTacToe.player1.points;
		player2Points.textContent = TicTacToe.player2.points;
		togglePopupOff();
		TicTacToe.currentRound = 0;
		Gameboard.reset();
		Gameboard.init();
		Gameboard.render();
	};

	btnReset.addEventListener("click", restartGame);

	return {
		currentPlayer,
		currentRound,
		nextPlayer,
		nextRound,
		rowOfThree,
		togglePopupOn,
		togglePopupOff,
		newGame,
		computerTurn,
		gameOver,
	};
};

const TicTacToe = Game();
TicTacToe.newGame();
