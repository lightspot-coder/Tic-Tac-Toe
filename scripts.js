//console.log("Hello world");

const createGameBoard = (function() {
    let gameBoard = [[null,null,null],[null,null,null],[null,null,null]];
    const setMove = (move,row,column) => {
        if((row > 2 || row < 0) || ( column > 2 || column < 0)){
            console.log("Out of the board");
        }
        else{
            gameBoard[row][column] = move;
            console.log(gameBoard);
        }
    }
    const getMove = (row,column) => {
        return gameBoard[row][column];
    }
    const getRow = (row) => {
        return gameBoard[row];
    }
    const getColumn = (column) => {
        return [gameBoard[0][column],gameBoard[1][column],gameBoard[2][column]];
    }
    const getDiagonals = () => {
        return [[gameBoard[0][0],gameBoard[1][1],gameBoard[2][2]],[gameBoard[2][0],gameBoard[1][1],gameBoard[0][2]]];
    }
    const eraseBoard = () => {
        gameBoard = [[null,null,null],[null,null,null],[null,null,null]];
        console.log("The board was erased");
        console.log(gameBoard);
    }
    return {setMove,getMove,eraseBoard,getRow,getColumn,getDiagonals};
})();

const Game = (function(){

    const allEqual = arr => arr.every(val => ((val === arr[0]) && (val !== null)) );

    const startGame = () => {
        createGameBoard.eraseBoard();
    }
    const checkSomeoneWin = (move, row, column) => {
       
        // check if there are 3 in a row
        if(allEqual(createGameBoard.getRow(row))){
            console.log("3 " + move + " in the row " + row);
            return true;
        }

        // check if there are 3 in a column
        if(allEqual(createGameBoard.getColumn(column))){
            console.log("3 " + move + " in the column " + column);
            return true;
        }

        // check if there are 3 in some of the two diagonals
        let diagonals = createGameBoard.getDiagonals();
        if(allEqual(diagonals[0])){
            console.log("3 " + move + " in the diagonal 0");
            return true;
        }
        if(allEqual(diagonals[1])){
            console.log("3 " + move + " in the diagonal 1");
            return true;
        }
        console.log("checkSomeoneWin: no winner, keep playing");
        return false;
        
    }
    const checkTies = () => {
        for(let row = 0; row < 3 ; row ++){
            for(let column = 0; column < 3; column++){
                if(createGameBoard.getMove(row,column) === null){ 
                    console.log("checkTies: some cells still empty");
                    return false;
                }
            }
        }
        console.log("checkTies: cells are full");
        return true; 
    }
    const flowOfGame = () => {

        let gameFinish = false;
        let ties = false;
        let winningMove = "";

        startGame();
        while(!gameFinish && !ties){

            let move = prompt("Select your move (x or o)");
            let row = prompt(" row:");
            let column = prompt("column:");
            console.log("your move is: " + move + " on row " + row + " and column " + column);
            createGameBoard.setMove(move, row, column);
            gameFinish = checkSomeoneWin(move, row, column);
            console.log("flowOfGame: the game it's over?: " + gameFinish );
            winningMove = move;
            ties = checkTies();
        }

        if(ties && !gameFinish){
            console.log("Game ties, please refresh page to start a new game");
        }
        else{
            console.log("The " + winningMove + " win the game, refresh for start a new game");
        }

    }
    return {flowOfGame};
})();

/*
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
*/