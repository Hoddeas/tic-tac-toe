


function theme(mode) {
    document.getElementById("game-container").setAttribute("display-mode", mode);
    document.getElementById("gameboard").setAttribute("display-mode", mode);
    document.getElementById("header-container").setAttribute("display-mode", mode);
    document.getElementById("title").setAttribute("display-mode", mode);
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("box")[i].setAttribute("display-mode", mode);
    }
    for (let i = 0; i < 2; i++) {
        document.getElementsByClassName("display-mode-button")[i].setAttribute("display-mode", mode);
    }
}

let savedDisplayMode = localStorage.getItem("theme");

theme(savedDisplayMode);

let lightModeButton = document.getElementById("light-mode-button");
let darkModeButton = document.getElementById("dark-mode-button");

lightModeButton.addEventListener("click", () => {
    theme("light");
    localStorage.setItem("theme", "light")
})
darkModeButton.addEventListener("click", () => {
    theme("dark");
    localStorage.setItem("theme", "dark")
})