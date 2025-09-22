//console.log("Hello world");

let game_over_message = document.getElementById("game-over-message");


function createPlayer (){
    let name;
    let choosen_move;
    let wins = 0;
    const getName = () => { return name };
    const setName = (player_name) => { name = player_name};
    const getMove = () => { return choosen_move};
    const setMove = (move) => {choosen_move = move};
    const getWins = () => {return wins};
    const setWins = () => {wins++}; 
    return {getName,setName,getMove,setMove,getWins,setWins};
}



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

    let gameFinish = false;
    let ties = false;
    let winningMove = "";

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
    const flowOfGame = (move, row, column) => {

        console.log("your move is: " + move + " on row " + row + " and column " + column);
        createGameBoard.setMove(move, row, column);
        gameFinish = checkSomeoneWin(move, row, column);
        console.log("flowOfGame: the game it's over?: " + gameFinish );
        winningMove = move;
        ties = checkTies();
       // }

        if(gameFinish){
            console.log("The " + winningMove + " win the game, refresh for start a new game");
            game_over_message.textContent = "The " + winningMove + " win the game, refresh for start a new game";
        }
        else if(ties){
            console.log("Game ties, please refresh page to start a new game");
            game_over_message.textContent = "Game ties, please refresh page to start a new game";
        }
        else {
            console.log("keep playing!!!!!!");
        }
        return [gameFinish,ties,winningMove];
        

    }
    return {startGame,flowOfGame};
})();

const displayBoard = (function(){


    let array_cells = [[null,null,null],[null,null,null],[null,null,null]];

    init = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                let id = `cell-${i}${j}`;
                array_cells[i][j] = document.getElementById(id);
                let p = document.createElement("p");
                array_cells[i][j].appendChild(p);
            }
        }
        console.log("init: create array of cells");
        console.log(array_cells[0][0]);

    }

    render = () => {
        console.log("render:gameboard displayed on the page");
        init();
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                let id = `cell-${i}${j}`;
                array_cells[i][j].addEventListener("click", function () {addMove(id)});
                array_cells[i][j].setAttribute("Listener",true);
            }
        }

    }
    remove_all_events = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                array_cells[i][j].setAttribute("Listener",false);
            }
        }

    }
    remove_event = (id) => {

        let cell_clicked = document.getElementById(id);
        cell_clicked.setAttribute("Listener",false);

    }
   
    return {render,init,remove_all_events,remove_event};

})();

const display_players = (function(){

    let player1 = createPlayer();
    let player2 = createPlayer();

    let players = [];
    let button_player1;
    let button_player2;
    let move_player1;
    let move_player2;


    const init = () => {

        player1.setName("Player 1");
        player1.setMove("X");
        player1.setWins(0);
    
        player2.setName("Player 2");
        player2.setMove("X");
        player2.setWins(0);

        players[0] = player1;
        players[1] = player2;

        button_player1 = document.getElementById("button_player_1_name");
        button_player2 = document.getElementById("button_player_2_name");




    }

    const prevent_Default = (event) => {
        event.preventDefault();
    }
    const change_header = (player) => {

        //"player_1","player_1_name"
        let id = "player_" + (player + 1);
        let input = "player_" + (player + 1) + "_name";
        
        console.log(id);
        console.log(input);
        const player_info_div = document.getElementById(id);
        //console.log("changeName: change h2 for player 1 to " );
        //console.log(player_info_div.childNodes[1]);
        let new_name = document.getElementById(input).value;
        if(new_name === ""){
            players[player].setName("Player " + (player + 1));
        }
        else
            players[player].setName(new_name);
        player_info_div.childNodes[1].textContent = players[player].getName();
        console.log(players[player].getName());


    }

    addEvents = () => {

        //button_player1.addEventListener("click",prevent_Default);
        button_player1.addEventListener("click",function () {change_header(0)});
        //button_player2.addEventListener("click",prevent_Default);
        button_player2.addEventListener("click",function () {change_header(1)});


    }
    return {init,addEvents};

})();

let current_selection = "X";

function addMove(id){

        
        let cell_clicked = document.getElementById(id);
        console.log("addMove: listener attribute = " + cell_clicked.getAttribute("Listener") );
        if(cell_clicked.getAttribute("Listener") === "true"){
            if(current_selection === "X"){
                current_selection = "O";
            }
            else{
                current_selection = "X";
            }

            displayBoard.remove_event(id);
            console.log("addMove: trying to render a " + current_selection);
            cell_clicked.childNodes[0].textContent = current_selection;
            
            let statOfGame = Game.flowOfGame(current_selection,+id.charAt(5),+id.charAt(6));
            if(statOfGame[0] || statOfGame[1]){ // someone win the game or ties
                console.log("addMove: the game is over!!!!!!!");
                displayBoard.remove_all_events(); 
            }
        }
        
}


Game.startGame();
displayBoard.render();
display_players.init();
display_players.addEvents();
