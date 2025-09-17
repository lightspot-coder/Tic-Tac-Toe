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

const displayBoard = (function(){

    let cell1 = null;
    let cell2 = null;
    let cell3 = null;
    let cell4 = null;
    let cell5 = null;
    let cell6 = null;
    let cell7 = null;
    let cell8 = null;
    let cell9 = null;

    init = () => {

        cell1 = document.getElementById("cell-1");
        cell2 = document.getElementById("cell-2");
        cell3 = document.getElementById("cell-3");
        cell4 = document.getElementById("cell-4");
        cell5 = document.getElementById("cell-5");
        cell6 = document.getElementById("cell-6");
        cell7 = document.getElementById("cell-7");
        cell8 = document.getElementById("cell-8");
        cell9 = document.getElementById("cell-9");

        let p1 = document.createElement("p");
        
        let p2 = document.createElement("p");
       
        let p3 = document.createElement("p");
        
        let p4 = document.createElement("p");
      
        let p5 = document.createElement("p");
        
        let p6 = document.createElement("p");
        
        let p7 = document.createElement("p");
        
        let p8 = document.createElement("p");
        
        let p9 = document.createElement("p");

        cell1.appendChild(p1);
        cell2.appendChild(p2);
        cell3.appendChild(p3);
        cell4.appendChild(p4);
        cell5.appendChild(p5);
        cell6.appendChild(p6);
        cell7.appendChild(p7);
        cell8.appendChild(p8);
        cell9.appendChild(p9);
        
        

        

    }
    addMove = (id) => {
        console.log("render->addMove: trying to render a x");
        let cell_clicked = document.getElementById(id);
        cell_clicked.childNodes[0].textContent = "X";
        
    }
    render = () => {
        init();
        cell1.addEventListener("click", function () {addMove("cell-1")});
        cell2.addEventListener("click",function () {addMove("cell-2")});
        cell3.addEventListener("click",function () {addMove("cell-3")});
        cell4.addEventListener("click",function () {addMove("cell-4")});
        cell5.addEventListener("click",function () {addMove("cell-5")});
        cell6.addEventListener("click",function () {addMove("cell-6")});
        cell7.addEventListener("click",function () {addMove("cell-7")});
        cell8.addEventListener("click",function () {addMove("cell-8")});
        cell9.addEventListener("click",function () {addMove("cell-9")});
    }
    return {render};

})();
