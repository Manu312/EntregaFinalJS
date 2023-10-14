
const saveGameToStorage = ({ tablero, estado }) => {
    window.localStorage.setItem('tablero', JSON.stringify(tablero));
    window.localStorage.setItem('estado', estado);
}
const resetGameStorage = () => {
    window.localStorage.removeItem('tablero');
    window.localStorage.removeItem('estado');
}
const posiblesWins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const tableroStorage = window.localStorage.getItem('tablero');
let tablero = tableroStorage ? JSON.parse(tableroStorage) : Array(9).fill(null);
if(tablero!=null){
    pintarTablero(tablero);
}
const turno = {
    "X": "X", "O": "O"
}
let ganador = false;
const estadoStorage = window.localStorage.getItem('estado');
let estado = estadoStorage ? estadoStorage : turno.X;

const casilleros = document.querySelectorAll(".casilla");
function handleCasillaClick(event) {
    const celda = event.target;
    if(celda.className.includes("X") || celda.className.includes("O") || !notComplete() || ganador) {
        return;
    }
    celda.className += ` ${estado}`;
    tablero[celda.id]=estado;
    estado === turno.X ? estado = turno.O : estado = turno.X;
    saveGameToStorage({ tablero, estado });
    chequearGanador();
}

function chequearGanador() {
    posiblesWins.forEach((posiblesWin) => {
        const [a, b, c] = posiblesWin;
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
            ganador = true;
            const container = document.querySelector(".main-container");
            console.log(container);
            Swal.fire({
                title:`El Ganador es el jugador: ${tablero[a] === "X" ? "Amarillo" : "Rojo"}`,
                fontSize: 1,
        }).then(() => {
                resetGameStorage();
                window.location.reload();
            });
        }
    });
}

casilleros.forEach(celda => {
    celda.addEventListener("click", handleCasillaClick);
});
const reset = document.querySelector(".btn");
reset.addEventListener("click", resetGame);
//const cell = addEventListener("click", handleCasillaClick);
function notComplete() {
    return tablero.includes(null);
}

function resetGame(){
    resetGameStorage();
    window.location.reload();
}
function pintarTablero( tablero  ){
    tablero.forEach((casilla, index) => {
        let celda = document.getElementById(index);
        celda.className += ` ${casilla}`;
    });
}