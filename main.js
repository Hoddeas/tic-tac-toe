// Tic-tac-toe

// Change Theme
function theme(mode) {
    document.getElementById("game-container").setAttribute("data-display-mode", mode);
    document.getElementById("gameboard").setAttribute("data-display-mode", mode);
    document.getElementById("header-container").setAttribute("data-display-mode", mode);
    document.getElementById("title").setAttribute("data-display-mode", mode);
    document.getElementById("body").setAttribute("data-display-mode", mode);
    document.getElementById("infoboard").setAttribute("data-display-mode", mode);
    document.getElementById("result").setAttribute("data-display-mode", mode);
    document.getElementById("player-one").setAttribute("data-display-mode", mode);
    document.getElementById("player-two").setAttribute("data-display-mode", mode);
    for (let i = 0; i < 2; i++) {
        document.getElementsByClassName("swap-button")[i].setAttribute("data-display-mode", mode);
    }
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("box")[i].setAttribute("data-display-mode", mode);
    }
    for (let i = 0; i < 2; i++) {
        document.getElementsByClassName("display-mode-button")[i].setAttribute("data-display-mode", mode);
    }
}

// Load Theme
let savedDisplayMode = localStorage.getItem("theme");
theme(savedDisplayMode);

// Default Theme = Light
if (savedDisplayMode === null) {
    localStorage.setItem("theme", "light");
    theme("light");
}

// Theme Buttons
let lightModeButton = document.getElementById("light-mode-button");
let darkModeButton = document.getElementById("dark-mode-button");

// Change theme
lightModeButton.addEventListener("click", () => {
    theme("light");
    localStorage.setItem("theme", "light")
})

darkModeButton.addEventListener("click", () => {
    theme("dark");
    localStorage.setItem("theme", "dark")
})

// Game

// Board
let board = [
    ["","",""],
    ["","",""],
    ["","",""],
];

// Player Mode
let playerMode = "one-player";
let player = document.getElementById("player");
let playerOne = document.getElementById("player-1");
let computer = document.getElementById("computer");
let playerTwo = document.getElementById("player-2");
let swapButton = document.getElementById("swap-buttons");

document.getElementById("player-one").classList.add("turn");
document.getElementById("player-two").classList.remove("turn");

function setToPlayerOne() {
    playerOneTurn = true;
    playerTwoTurn = false;
    document.getElementById("player-one").classList.add("turn");
    document.getElementById("player-two").classList.remove("turn");
}

swapButton.addEventListener("click", () => {
    if (playerMode === "one-player") {
        playerMode = "two-player";
        restart();
        setToPlayerOne();
        playerOne.style.display = "inline-block";
        playerTwo.style.display = "inline-block";
        player.style.display = "none";
        computer.style.display = "none";
    } else if (playerMode === "two-player") {
        playerMode = "one-player";
        restart();
        setToPlayerOne();
        player.style.display = "inline-block";
        computer.style.display = "inline-block";
        playerOne.style.display = "none";
        playerTwo.style.display = "none";
    }
});

// Winning Combinations
let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add X and O
let gameboard = document.getElementById("gameboard");
let playerOneTurn = true;
let playerTwoTurn = false;
let moveCount = 0;
let canPlace = true;

gameboard.addEventListener("click", (e) => {
    if (e.target.id === "gameboard") {
        return;
    }

    if (!canPlace) {
        return;
    }

    if (playerMode === "one-player") {
        onePlayerMode(e);
        checkWin("Computer", "Player");
    } else if (playerMode === "two-player") {
        twoPlayerMode(e);
        checkWin("Player 1", "Player 2");
    }
});

// FUNCTIONS

// Blink
let result = document.getElementById("result");
function resultBlink(winner) {
    result.innerHTML = winner;
    result.setAttribute("data-animation", "blink");
    result.addEventListener("animationend", () => {
        result.setAttribute("data-animation", "");
        result.innerHTML = "";
        restart();
    });
}

// Check win
function checkWin(winnerOne, winnerTwo) {
    for (let i = 0; i < 8; i++) {
        if (gameboard.children[win[i][0]].getAttribute("data-placed") === "x" && gameboard.children[win[i][1]].getAttribute("data-placed") === "x" && gameboard.children[win[i][2]].getAttribute("data-placed") === "x") {
            canPlace = false;
            resultBlink(`${winnerOne} Win`);
        } else if (gameboard.children[win[i][0]].getAttribute("data-placed") === "o" && gameboard.children[win[i][1]].getAttribute("data-placed") === "o" && gameboard.children[win[i][2]].getAttribute("data-placed") === "o") {
            canPlace = false;
            resultBlink(`${winnerTwo} Win`);
        } else if (moveCount === 9) {
            resultBlink("Tie");
        }
    }
}

// One Player Mode
function onePlayerMode(e) {
    if (e.target.getAttribute("data-placed") === "o" || e.target.getAttribute("data-placed") === "x") {
        return;
    }
    e.target.setAttribute("data-placed", "o");
    moveCount++;
    markPosition(e);
    computerMove();
}

// Mark Position
function markPosition(e) {
    switch(e.target.id) {
        case "top-left":
            board[0][0] = "o";
            break;
        case "top":
            board[0][1] = "o";
            break;
        case "top-right":
            board[0][2] = "o";
            break;
        case "middle-left":
            board[1][0] = "o";
            break;
        case "middle":
            board[1][1] = "o";
            break;
        case "middle-right":
            board[1][2] = "o";
            break;
        case "bottom-left":
            board[2][0] = "o";
            break;
        case "bottom":
            board[2][1] = "o";
            break;
        case "bottom-right":
            board[2][2] = "o";
            break;
    }
}

// Two Player Mode
function twoPlayerMode(e) {
    if (playerOneTurn) {
        if (e.target.getAttribute("data-placed") === "o" || e.target.getAttribute("data-placed") === "x") {
            return;
        }
        document.getElementById("player-two").classList.add("turn");
        document.getElementById("player-one").classList.remove("turn");
        e.target.setAttribute("data-placed", "x");
        playerOneTurn = false;
        playerTwoTurn = true;
        moveCount++;
    } else if (playerTwoTurn) {
        if (e.target.getAttribute("data-placed") === "x" || e.target.getAttribute("data-placed") === "o") {
            return;
        }
        document.getElementById("player-one").classList.add("turn");
        document.getElementById("player-two").classList.remove("turn");
        e.target.setAttribute("data-placed", "o");
        playerOneTurn = true;
        playerTwoTurn = false;
        moveCount++;
    }
}

// Restart Game
function restart() {
    for (let i = 0; i < 9; i++) {
        gameboard.children[i].setAttribute("data-placed", "");
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = "";
        }
    }

    moveCount = 0;
    canPlace = true;

    if (playerMode === "one-player") {
        computerMove();
    }
}

// AI FUNCTIONS

// AI Check win
function equals3(a, b, c) {
    return a === b && b === c && a !== "";
}

function AICheckWin() {
    let winner = null;

    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    if (equals3(board[0][0], board[1][1], board[2][2])) {
            winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
            winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

// AI Move
function computerMove() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                board[i][j] = "x";  
                let score = minimax(board, 0, false);
                board[i][j] = ""; 
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = {i, j};
                }
            }
        }
    }
    board[bestMove.i][bestMove.j] = "x";
    computerPlace();
    moveCount++;
}

let scores = {
    x: 10,
    o: -10,
    tie: 0
};

// Minimax Function
function minimax(board, depth, isMaximizing) {
    let result = AICheckWin();
    if (result !== null) {
        return scores[result];
    }
    
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    board[i][j] = "x";  
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    board[i][j] = "o";  
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

// Computer Placement
function computerPlace() {
    computerBoard = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            computerBoard.push(board[i][j]);
        }
    }
    
    for (let i = 0; i < 9; i++) {
        if (computerBoard[i] === "x") {
            gameboard.children[i].setAttribute("data-placed", "x");
        }
    }
}

// Computer move first if refresh
computerMove();
