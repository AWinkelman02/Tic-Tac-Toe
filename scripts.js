const game = (() => {
    const players = (name, mark, turn) => {
        return {name, mark, turn};
    };

    const player1 = players('player 1', 'X', true);
    const player2 = players('player 2', 'O', false);
    
    const winConditions = [
        [0,1,2],
        [0,3,6],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [0,4,8]
    ];

    let winner = null;

    let turns = 0;

    let gameCombo = [];

    const cell = document.querySelectorAll('.cell');

    const playerTurn = (function () {
        cell.forEach(cell => {
            cell.addEventListener('click', function(e){
                if(player1.turn && winner == null && e.target.textContent == ''){
                    gameCombo[e.target.id] = player1.mark;
                    cell.innerHTML = player1.mark;
                    cell.classList.add('player1')
                    player1.turn = false;
                    player2.turn = true;
                }
                else if(player2.turn && winner == null && e.target.textContent == ''){
                    gameCombo[e.target.id] = player2.mark;
                    cell.innerHTML = player2.mark;
                    cell.classList.add('player2')
                    player2.turn = false;
                    player1.turn = true;
                }
                else{
                    return;
                }

                checkWinner();

            });
        });

        return {cell}
    })();

    checkWinner = () =>{
        turns++;
        
        // Seperates each player X | O move into 2 diffrent arrays
        let xPlays = gameCombo.reduce((a, e, i) => 
        (e === player1.mark) ? a.concat(i) : a, []);
        let oPlays = gameCombo.reduce((a, e, i) => 
        (e === player2.mark) ? a.concat(i) : a, []);
        // Loop iterates over each winCombo array 
        for(let [index, combo] of winConditions.entries()) {
            // Check if player moves index is equal to combo array index 
            if (combo.every(elem => xPlays.indexOf(elem) > -1)) {
                
                winner = 'p1';
                //winConditions = combo;
                
            } else if (combo.every(elem => oPlays.indexOf(elem) > -1)) {
                
                winner = 'p2';
                //winConditions = combo;

            } else if (winner == null && winner == undefined && turns == 9) {
                winner = 'tie';
                //winConditions = combo;
            };
        };
        displayWinner();
    };
        
    const resultScreen = document.querySelector('.resultsScreen');
    const result = document.querySelector('.result');
    const closeModal = document.querySelector('.close');
    const resetButton = document.querySelector('#reset');

    closeModal.addEventListener('click', function(){
        resultScreen.close();
        resetGame();
    });

    resetButton.addEventListener('click', function(){
        resetGame();
    });

    displayWinner = () => {
        if(winner == null) return
        if(winner == 'p1'){
            result.innerHTML = "Player 1 Wins!";
            resultScreen.showModal();
        }
        else if(winner == 'p2'){
            result.innerHTML = "Player 2 Wins!";
            resultScreen.showModal();

        }
        else{
            result.innerHTML = "Draw!";
            resultScreen.showModal();

        }
        console.log(winner, turns);
    };
        
    resetGame = () => {
        cell.forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove('player1');
            cell.classList.remove('player2');
        })
        gameCombo.splice(0,gameCombo.length);
        winner = null;
        player1.turn = true;
        player2.turn = false;
        turns = 0;
    };

})();

