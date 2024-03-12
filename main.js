let playersInGame = 0;
let currentPlayer = 0;
let spacesFree = 9;
let players = [];
let board = [['', '', ''], ['', '', ''], ['', '', '']];

function updateCreate() {
    document.querySelector('.username').value = '';
    
    if (playersInGame !== 2) {
        document.querySelector('.stats_wrapper').style.display = 'none';
        document.querySelector('.grid_wrapper').style.display = 'none';
        document.querySelector('.username').placeholder = `Player ${playersInGame + 1} username...`
    } else {
        document.querySelector('.grid_wrapper').style.display = 'flex';
        document.querySelector('.create_wrapper').style.display = 'none';
        document.querySelector('.stats_wrapper').style.display = 'flex';
        updateStats();
        updateTitle();
    }
};

updateCreate();

function updateStats() {
    document.querySelector('.player1_stats').innerHTML = `${players[0].name} : ${players[0].score}`;
    document.querySelector('.player2_stats').innerHTML = `${players[1].name} : ${players[1].score}`
};

function updateTitle(message) {
    document.querySelector('.title').innerHTML = `It is ${players[currentPlayer].name}'s go...`;
};

function checkWin() {
    for (i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return board[i][0];
        } else if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') { 
            return board[0][i];
        }
    }

    if (board[1][1] !== '') {
        if (board[0][0] === board[1][1] && board [1][1] === board[2][2]) {
            return board [1][1]
        } else if (board[0][2] == board[1][1] && board[1][1] === board[2][0]) {

            return board[1][1]
        }
    }

    return '';
};

function clearBoard(){
    let spots = document.querySelectorAll('.spot');
    spots.forEach(spot => spot.innerHTML = '');
    board = [['','',''],['','',''],['','','']];
};

document.querySelector('.submit').addEventListener('click', function(){
    const username = document.querySelector('.username').value;

    if (username !== '') {
        players.push({name:username, score:0});
        playersInGame += 1;
        updateCreate();
    }
});

document.querySelector('.username').addEventListener('keypress', function(event){
    if (event.key === 'Enter') {
        document.querySelector('.submit').click();
    }
});

let spots = document.querySelectorAll('.spot');

spots.forEach(spots => spots.addEventListener('click', function() {
    if (spots.innerHTML === '') {
        let piece = '';

        if (currentPlayer === 0) {
            piece = 'X';
            currentPlayer = 1;
        }
        else {
            piece = 'O';
            currentPlayer = 0;
        }

        spots.innerHTML = piece;
        board[spots.classList.value[5]-1][spots.classList.value[7] - 1] = piece;
        spacesFree -= 1;

        let result = checkWin();
        
        if (result !== '') {
            if (result === 'X') {
                players[0].score += 1;
                currentPlayer = 1;
            } else if (result === 'O') {
                players[1].score += 1;
                currentPlayer = 0;
            }
            updateStats();
            clearBoard();
            spacesFree = 9;
        } else if (spacesFree < 1) {
            spacesFree = 9
            clearBoard();
        }

        updateTitle();
    }
}));

