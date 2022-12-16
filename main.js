// Tic-tac-toe

// Function to change the theme of the webpage
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

// Load saved theme
let savedDisplayMode = localStorage.getItem("theme");
theme(savedDisplayMode);

// If first time loading page, then theme should be light
if (savedDisplayMode === null) {
    localStorage.setItem("theme", "light");
    theme("light");
}

// Theme Buttons
let lightModeButton = document.getElementById("light-mode-button");
let darkModeButton = document.getElementById("dark-mode-button");

// Event listeners for theme button to change theme
lightModeButton.addEventListener("click", () => {
    theme("light");
    localStorage.setItem("theme", "light")
})

darkModeButton.addEventListener("click", () => {
    theme("dark");
    localStorage.setItem("theme", "dark")
})

// Event listener for clicked box and adding X or O to box
let gameboard = document.getElementById("gameboard");

gameboard.addEventListener("click", (e) => {
    e.target.classList.add("o")
})

//

