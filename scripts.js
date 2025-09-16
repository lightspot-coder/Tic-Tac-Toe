//console.log("Hello world");

const createGameBoard = (function() {
    let gameBoard = [[null,null,null],[null,null,null],[null,null,null]];
    const setMove = (move,x,y) => {
        if((x > 2 || x < 0) || ( y > 2 || y < 0)){
            console.log("fuera del tablero");
        }
        else{
            gameBoard[x][y] = move;
            console.log(gameBoard);
            console.log(gameBoard.length);
            flowGame();

        }
    }
    const flowGame = () => {
        let previous_move = null;
        let three_in_a_row = false;
        let three_in_a_column = false;
        let ties = false;

        // check if someone win in a row
        for( let i=0; i < gameBoard.length; i++ ){
            previous_move = gameBoard[i][0];
            for( let j=1; j < gameBoard[i].length;j++){
                let current_move_row = gameBoard[i][j];
                if((previous_move != null) && (previous_move === current_move_row)){
                    three_in_a_row = true;
                }
                else{
                    three_in_a_row = false;
                }
                previous_move = current_move_row;
            }
            if(three_in_a_row === true){
                return console.log(`the ${previous_move}'s win the game`);
            }
        }

        // check if someone win in a column
        for( let i=0; i < gameBoard.length; i++ ){
            previous_move = gameBoard[0][i];
            for( let j=1; j < 3 ;j++){
                let current_move_column = gameBoard[j][i];
                if((previous_move != null) && (previous_move === current_move_column)){
                    three_in_a_column = true;
                }
                else{
                    three_in_a_column = false;
                }
                previous_move = current_move_column;
            }
            if(three_in_a_column === true){
                return console.log(`the ${previous_move}'s win the game`);
            }
        }

    }
    return {setMove};
})();



