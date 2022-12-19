// Tic-tac-toe

// Change Theme
function theme(mode) {
    document.getElementById("game-container").setAttribute("data-display-mode", mode);
    document.getElementById("gameboard").setAttribute("data-display-mode", mode);
    document.getElementById("header-container").setAttribute("data-display-mode", mode);
    document.getElementById("title").setAttribute("data-display-mode", mode);
    document.getElementById("body").setAttribute("data-display-mode", mode);
    document.getElementById("scoreboard").setAttribute("data-display-mode", mode);
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

// Player Mode
let playerMode = "one-player";
let player = document.getElementById("player");
let playerOne = document.getElementById("player-1");
let computer = document.getElementById("computer");
let playerTwo = document.getElementById("player-2");
let swapButton = document.getElementById("swap-buttons");

swapButton.addEventListener("click", () => {
    if (playerMode === "one-player") {
        playerMode = "two-player";
    } else if (playerMode === "two-player") {
        playerMode = "one-player";
    }

    if (playerMode === "one-player") {
        player.style.display = "inline-block";
        computer.style.display = "inline-block";
        playerOne.style.display = "none";
        playerTwo.style.display = "none";
    } else if (playerMode === "two-player") {
        playerOne.style.display = "inline-block";
        playerTwo.style.display = "inline-block";
        player.style.display = "none";
        computer.style.display = "none";
    }
});

// Winning Combinations
let win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// Game
let gameboard = document.getElementById("gameboard");
let playerTurn = true;
let computerTurn = false;
let playerOneTurn = true;
let playerTwoTurn = false;


gameboard.addEventListener("click", (e) => {
    if (playerMode === "two-player") {
        if (playerOneTurn) {
            if (e.target.getAttribute("data-placed") === "o") {
                return;
            }
            e.target.setAttribute("data-placed", "x");
            playerOneTurn = false;
            playerTwoTurn = true;
        } else if (playerTwoTurn) {
            if (e.target.getAttribute("data-placed") === "x") {
                return;
            }
            e.target.setAttribute("data-placed", "o");
            playerOneTurn = true;
            playerTwoTurn = false;
        }
    }

    for (let i = 0; i < 8; i++) {
        if (gameboard.children[win[i][0]].getAttribute("data-placed") === "x" && gameboard.children[win[i][1]].getAttribute("data-placed") === "x" && gameboard.children[win[i][2]].getAttribute("data-placed") === "x")
            console.log("x win")
    }
});
