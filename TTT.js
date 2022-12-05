const Gameboard = (() => {
	const gameArea = document.getElementById("game-board");
	let _board = [];

	const render = () => {
		_board.forEach((field) => {
			const newField = document.createElement("div");
			newField.classList = "field";
			newField.textContent = field.getStatus();
			newField.addEventListener("click", field.set);
			gameArea.appendChild(newField);
		});
	};

	const init = () => {
		for (i = 0; i < 9; i++) {
			let newField = Field(i);
			_board.push(newField);
		}
		render();
	};

	const reset = () => {
		console.log("reseting..");
		gameArea.innerHTML = "";
	};
	return {
		init,
		render,
		reset,
	};
})();

const Field = (fieldIndex) => {
	let status = "";

	const getStatus = () => status;
	const set = () => {
		if (status != "") {
			console.log("occupied cell");
			console.log(status);
		} else if (status === "") {
			console.log("empty cell");
			status = player.symbol();
			Gameboard.reset();
			Gameboard.render();
		}
	};
	return {
		fieldIndex,
		set,
		status,
		getStatus,
	};
};

const Player = (userName, userSymbol) => {
	const name = () => userName;
	const symbol = () => userSymbol;

	return {
		name,
		symbol,
		setName,
	};
};

const Game = (() => {
	let _currentMode = undefined;
	let _currentPlayer = undefined;

	const start = () => {
		Gameboard.init();
		setMode();
		newPLayer();
	};

	const newPLayer = () => {
		const 
		const _username = document.getElementById("username");
		const _confirm = document.getElementById("btn-confirm");
		const _popup = document.getElementById("popup-name");

		_popup.style.display = "flex";
	};

	const setMode = () => {
		const _popup = document.getElementById("popup-mode");
		const _monkey = document.getElementById("btn-monkey");
		const _computer = document.getElementById("btn-KI");

		_popup.style.display = "flex";
		_monkey.addEventListener("click", () => {
			_currentMode = false;
			_popup.style.display = "none";
		});
		_computer.addEventListener("click", () => {
			_currentMode = true;
			_popup.style.display = "none";
		});
	};

	const getCurrentPlayer = () => _currentPlayer;
	const setUsernName = () => {};

	return {
		start,
	};
})();

Game.start();
