    
function theme(mode) {
    document.getElementById("game-container").setAttribute("display-mode", mode);
    document.getElementById("gameboard").setAttribute("display-mode", mode);
    document.getElementById("header-container").setAttribute("display-mode", mode);
    document.getElementById("title").setAttribute("display-mode", mode);
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("box")[i].setAttribute("display-mode", mode);
    }
}

theme("dark")