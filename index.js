const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score')

function play() {
    const game = document.getElementById('game')
    const home = document.getElementById('home')
    game.style.display = 'flex'
    home.style.display = 'none'

    let sound = setTimeout(() => {
        loop()
        setInterval(() => {
            playSound()
        }, 1600);
    }, 100);
}


const cols = 28;
const rows = 31;
let scores = 0
const widthColum = 20
canvas.width = cols * widthColum;
canvas.height = rows * widthColum;
const columnWidth = canvas.width / cols;
const rowHeight = canvas.height / rows;

const player = {
    x: 13 * widthColum,
    y: 23 * widthColum + 10,
    radius: widthColum / 2,
    dx: 1,
    dy: 0,
    speed: 1
};

const gosh = new Image()
gosh.src = './red.png'

const ghost = {
    x: 13 * widthColum,
    y: 14 * widthColum,
    radius: widthColum,
    dx: 0,
    dy: 0,
    speed: 1
}

let mangap = false

let colision = false
let ghostcolision = false
const pos = {
    col: 0,
    row: 0,
}
const ghostpos = {
    col: 0,
    row: 0,
}
const x = 1

const board = [
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x],
    [x, 0, x, x, x, x, 0, x, x, x, x, x, 0, x, x, 0, x, x, x, x, x, 0, x, x, x, x, 0, x],
    [x, 0, x, x, x, x, 0, x, x, x, x, x, 0, x, x, 0, x, x, x, x, x, 0, x, x, x, x, 0, x],
    [x, 0, x, x, x, x, 0, x, x, x, x, x, 0, x, x, 0, x, x, x, x, x, 0, x, x, x, x, 0, x],
    [x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x],
    [x, 0, x, x, x, x, 0, x, x, 0, x, x, x, x, x, x, x, x, 0, x, x, 0, x, x, x, x, 0, x],
    [x, 0, x, x, x, x, 0, x, x, 0, x, x, x, x, x, x, x, x, 0, x, x, 0, x, x, x, x, 0, x],
    [x, 0, 0, 0, 0, 0, 0, x, x, 0, 0, 0, 0, x, x, 0, 0, 0, 0, x, x, 0, 0, 0, 0, 0, 0, x],
    [x, x, x, x, x, x, 0, x, x, x, x, x, 4, x, x, 4, x, x, x, x, x, 0, x, x, x, x, x, x],
    [4, 4, 4, 4, 4, x, 0, x, x, x, x, x, 4, x, x, 4, x, x, x, x, x, 0, x, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, x, 0, x, x, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, x, x, 0, x, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, x, 0, x, x, 4, x, x, x, 4, 4, x, x, x, 4, x, x, 0, x, 4, 4, 4, 4, 4],
    [x, x, x, x, x, x, 0, x, x, 4, x, 4, 4, 4, 4, 4, 4, x, 4, x, x, 0, x, x, x, x, x, x],
    [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, x, 4, 4, 4, 4, 4, 4, x, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4],
    [x, x, x, x, x, x, 0, x, x, 4, x, 4, 4, 4, 4, 4, 4, x, 4, x, x, 0, x, x, x, x, x, x],
    [4, 4, 4, 4, 4, x, 0, x, x, 4, x, x, x, 4, 4, x, x, x, 4, x, x, 0, x, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, x, 0, x, x, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, x, x, 0, x, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, x, 0, x, x, 4, x, x, x, x, x, x, x, x, 4, x, x, 0, x, 4, 4, 4, 4, 4],
    [x, x, x, x, x, x, 0, x, x, 4, x, x, x, x, x, x, x, x, 4, x, x, 0, x, x, x, x, x, x],
    [x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x, x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x],
    [x, 0, x, x, x, x, 0, x, x, x, x, x, 0, x, x, 0, x, x, x, x, x, 0, x, x, x, x, 0, x],
    [x, 0, x, x, x, x, 0, x, x, x, x, x, 0, x, x, 0, x, x, x, x, x, 0, x, x, x, x, 0, x],
    [x, 0, 0, 0, x, x, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, x, x, 0, 0, 0, x],
    [x, x, x, 0, x, x, 0, x, x, 0, x, x, x, x, x, x, x, x, 0, x, x, 0, x, x, 0, x, x, x],
    [x, x, x, 0, x, x, 0, x, x, 0, x, x, x, x, x, x, x, x, 0, x, x, 0, x, x, 0, x, x, x],
    [x, 0, 0, 0, 0, 0, 0, x, x, 0, 0, 0, 0, x, x, 0, 0, 0, 0, x, x, 0, 0, 0, 0, 0, 0, x],
    [x, 0, x, x, x, x, x, x, x, x, x, x, 0, x, x, 0, x, x, x, x, x, x, x, x, x, x, 0, x],
    [x, 0, x, x, x, x, x, x, x, x, x, x, 0, x, x, 0, x, x, x, x, x, x, x, x, x, x, 0, x],
    [x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
]

function drawGosh() {
    ctx.drawImage(gosh, ghost.x, ghost.y, ghost.radius, ghost.radius)
}


function drawPlayer() {
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    if (mangap) {
        ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
        setTimeout(() => {
            mangap = false
        }, 200);
    } else {
        if (player.dx == -1) {
            ctx.arc(player.x, player.y, player.radius, 3.8, 2.8 * Math.PI);
            ctx.lineTo(player.x, player.y)
            setTimeout(() => {
                mangap = true
            }, 200);
        } if (player.dy == -1) {
            ctx.arc(player.x, player.y, player.radius, 5.3, 3.3 * Math.PI);
            ctx.lineTo(player.x, player.y)
            setTimeout(() => {
                mangap = true
            }, 200);
        } if (player.dy == 1) {
            ctx.arc(player.x, player.y, player.radius, 2.3, 2.3 * Math.PI);
            ctx.lineTo(player.x, player.y)
            setTimeout(() => {
                mangap = true
            }, 200);
        } if (player.dx == 1) {
            ctx.arc(player.x, player.y, player.radius, 0.8, 1.8 * Math.PI);
            ctx.lineTo(player.x, player.y)
            setTimeout(() => {
                mangap = true
            }, 200);
        }

    }
    ctx.fill();
}

function drawBoard() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const width = widthColum
            const x = widthColum * j
            const y = widthColum * i
            if (board[i][j] === 1) {
                ctx.fillStyle = 'blue'
                ctx.strokeStyle = 'blue'

                ctx.fillRect(x + 1, y + 1, width - 2, width - 2)
            } if (board[i][j] === 0) {
                ctx.fillStyle = 'white'
                ctx.beginPath()
                ctx.arc(x + width / 2, y + width / 2, 2, 0, 2 * Math.PI)
                ctx.fill()
                ctx.closePath()
            }
        }

    }
}

function playEat() {
    const eat = new Audio('./sound/eating.mp3')
    eat.play()
}
function playSound() {
    const siren = new Audio('./sound/siren.mp3')
    siren.volume = 0.5; // Set volume to 50%
    siren.play()
}

function checkCollisionPlayer() {
    const upCol1 = Math.floor((player.x - player.radius + 0.8) / columnWidth);
    const upCol2 = Math.floor((player.x + player.radius - 0.8) / columnWidth);
    const upRow1 = Math.floor((player.y - player.radius + 0.8) / rowHeight);
    const upRow2 = Math.floor((player.y + player.radius - 0.8) / rowHeight);

    pos.col = Math.floor(player.y / rowHeight);
    pos.row = Math.floor(player.x / columnWidth);

    for (let i = upRow1; i <= upRow2; i++) {
        for (let j = upCol1; j <= upCol2; j++) {
            if (board[i] && board[i][j] === 1) {
                if (player.dx !== 0) {
                    player.x -= player.dx * player.speed;
                    colision = true
                }
                if (player.dy !== 0) {
                    player.y -= player.dy * player.speed;
                    colision = true
                }
                return;
            } if (board[i] && board[i][j] === 0) {
                board[i][j] = 4

                playEat()
                scores += 1
                score.innerText = 'Score: ' + scores
            }
        }
        colision = false
    }
    if (upCol1 < -2) {
        player.x = 30 * widthColum
    }

    if (upCol2 > 31) {
        player.x = 0 * widthColum
    }
}

let initialized = false

function moveGhost() {
    const playerCol = pos.col
    const playerRow = pos.row

    

    function alignGhost() {
        if ((Math.floor((ghost.x + 1) / columnWidth) == Math.floor((ghost.x + ghost.radius - 2) / columnWidth))
            && (Math.floor((ghost.y + 1) / rowHeight) == Math.floor((ghost.y + ghost.radius - 2) / rowHeight))) {
            return true
        }
        return false
    }

    if ( alignGhost() ) {
        // Pilih langkah yang meminimalkan jarak ke player
        let potentialMoves = [];

        // Check move up
        if (ghostpos.col > 0 && board[ghostpos.col - 1][ghostpos.row] !== 1) {
            potentialMoves.push({ dx: 0, dy: -ghost.speed, distance: Math.abs((ghostpos.col - 1) - playerCol) + Math.abs(ghostpos.row - playerRow) });
        }
        // Check move down
        if (ghostpos.col < rows - 1 && board[ghostpos.col + 1][ghostpos.row] !== 1) {
            potentialMoves.push({ dx: 0, dy: ghost.speed, distance: Math.abs((ghostpos.col + 1) - playerCol) + Math.abs(ghostpos.row - playerRow) });
        }
        // Check move left
        if (ghostpos.row > 0 && board[ghostpos.col][ghostpos.row - 1] !== 1) {
            potentialMoves.push({ dx: -ghost.speed, dy: 0, distance: Math.abs(ghostpos.col - playerCol) + Math.abs((ghostpos.row - 1) - playerRow) });
        }
        // Check move right
        if (ghostpos.row < cols - 1 && board[ghostpos.col][ghostpos.row + 1] !== 1) {
            potentialMoves.push({ dx: ghost.speed, dy: 0, distance: Math.abs(ghostpos.col - playerCol) + Math.abs((ghostpos.row + 1) - playerRow) });
        }

        // Pilih langkah dengan jarak terpendek ke player
        if (potentialMoves.length > 0) {
            potentialMoves.sort((a, b) => a.distance - b.distance);
            ghost.dx = potentialMoves[0].dx;
            ghost.dy = potentialMoves[0].dy;
        }
    }

    if (ghost.dy != 0 && board[ghostpos.col + ghost.dy][ghostpos.row] == 1 && alignGhost()
    ) {
        ghost.dy = 0
    }
    if (ghost.dx != 0 && board[ghostpos.col][ghostpos.row + ghost.dx] == 1 && alignGhost()
    ) {
        ghost.dx = 0
    }

    ghostpos.col = Math.floor((ghost.y + 1) / rowHeight);
    ghostpos.row = Math.floor((ghost.x + 1) / columnWidth);

}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPlayer();
    drawGosh();
    // console.log(ghostcolision, colision);

    player.x += player.dx * player.speed;
    player.y += player.dy * player.speed;
    ghost.x += ghost.dx * ghost.speed;
    ghost.y += ghost.dy * ghost.speed;

    // console.log(ghost.dx, ghost.dy);
    
    moveGhost();
    checkCollisionPlayer();
    if (ghostpos.col == pos.col && ghostpos.row == pos.row) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard();
        drawPlayer();
        drawGosh();
        const die = new Audio('./sound/die.mp3')
        die.play()
        setTimeout(() => {
            alert('Game Over');
            location.reload();
        }, 200)
        return
    }
    let hasZero = board.some(row => row.includes(0));
    if (!hasZero) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard();
        drawPlayer();
        drawGosh();
        setTimeout(() => {
        alert('Game Win')
        location.reload()
        }, 200)
        return
    } else {
        requestAnimationFrame(loop);
    }
}

window.addEventListener('keydown', ({ key }) => {
    if (key === 'ArrowDown'
        && board[pos.col + 1][pos.row] != 1
        && ((player.x % player.radius == 0) != (player.x % (player.radius * 2) == 0))) {
        player.dx = 0;
        player.dy = 1;
    }
    if (key === 'ArrowUp'
        && board[pos.col - 1][pos.row] != 1
        && ((player.x % player.radius == 0) != (player.x % (player.radius * 2) == 0))) {
        player.dx = 0;
        player.dy = -1;
    }
    if (key === 'ArrowLeft'
        && board[pos.col][pos.row - 1] != 1
        && ((player.y % player.radius == 0) != (player.y % (player.radius * 2) == 0))) {
        player.dx = -1;
        player.dy = 0;
    }
    if (key === 'ArrowRight'
        && board[pos.col][pos.row + 1] != 1
        && ((player.y % player.radius == 0) != (player.y % (player.radius * 2) == 0))) {
        player.dx = 1;
        player.dy = 0;
    }
});

window.addEventListener('keyup', ({ key }) => {
    if (key == 'ArrowUp' && !colision) {
        const apatuh = setInterval(() => {
            if (board[pos.col - 1][pos.row] != 1
                && ((player.x % player.radius == 0) != (player.x % (player.radius * 2) == 0))) {
                player.dx = 0;
                player.dy = -1;
                clearInterval(apatuh)
                return
            }
            setTimeout(() => {
                clearInterval(apatuh)
            }, 300);
        }, 10);
    }
    if (key == 'ArrowDown' && !colision) {
        const apatuh = setInterval(() => {
            if (board[pos.col + 1][pos.row] != 1
                && ((player.x % player.radius == 0) != (player.x % (player.radius * 2) == 0))) {
                player.dx = 0;
                player.dy = 1;
                clearInterval(apatuh)
                return
            }
            setTimeout(() => {
                clearInterval(apatuh)
            }, 300);
        }, 10);
    }
    if (key == 'ArrowRight' && !colision) {
        const apatuh = setInterval(() => {
            if (board[pos.col][pos.row + 1] != 1
                && ((player.y % player.radius == 0) != (player.y % (player.radius * 2) == 0))) {
                player.dx = 1;
                player.dy = 0;
                clearInterval(apatuh)
                return
            }
            setTimeout(() => {
                clearInterval(apatuh)
            }, 300);
        }, 10);
    }
    if (key == 'ArrowLeft' && !colision) {
        const apatuh = setInterval(() => {
            if (board[pos.col][pos.row - 1] != 1
                && ((player.y % player.radius == 0) != (player.y % (player.radius * 2) == 0))) {
                player.dx = -1;
                player.dy = 0;
                clearInterval(apatuh)
                return
            }
            setTimeout(() => {
                clearInterval(apatuh)
            }, 300);
        }, 10);
    }
})