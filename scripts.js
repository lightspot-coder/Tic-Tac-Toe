//console.log("Hello world");

let game_over_message = document.getElementById("game-over-message");


function createPlayer (){
    let name;
    let choosen_move;
    let wins = 0;
    const getName = () => { return name; };
    const setName = (player_name) => { name = player_name;};
    const getMove = () => { return choosen_move;};
    const setMove = (move) => {choosen_move = move;};
    const getWins = () => {return wins;};
    const setWins = () => {wins += 1;}; 
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
            //console.log("The " + winningMove + " win the game, refresh for start a new game");
            if(winningMove === player1.getMove()){
                console.log("Player 1 win the game with " + winningMove + ", refresh for start a new game");
                player1.setWins();
                console.log("Victories = " + player1.getWins());

            }
            else{
                console.log("Player 2 win the game with " + winningMove + ", refresh for start a new game");
                player2.setWins();
                console.log("Victories = " + player2.getWins());
            }
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

    restart = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                 array_cells[i][j].childNodes[0].textContent = "";
                 array_cells[i][j].setAttribute("Listener",true);

            }
        }

        console.log("displayBoard.restart():  erase board");
        //console.log(array_cells[0][0].childNodes[0]);
    }

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
   
    return {render,restart,init,remove_all_events,remove_event};

})();

let player1 = createPlayer();
let player2 = createPlayer();

const display_players = (function(){

    

    let players = [];
    let button_player1;
    let button_player2;
    
    let img_button_moves = [[null,null],[null,null]];

    let player1_displayWins;
    let player2_displayWins;

    let current_player_div;


    const init = () => {

        player1.setName("Player 1");
        player1.setMove("X");
    
        player2.setName("Player 2");
        player2.setMove("O");

        players[0] = player1;
        players[1] = player2;

        button_player1 = document.getElementById("button_player_1_name");
        button_player2 = document.getElementById("button_player_2_name");

        img_button_moves[0][0] = document.getElementById("player_1_move_o");
        img_button_moves[0][1] = document.getElementById("player_1_move_x");
        img_button_moves[1][0] = document.getElementById("player_2_move_o");
        img_button_moves[1][1] = document.getElementById("player_2_move_x");

        img_button_moves[0][1].setAttribute("class","move_selected");
        img_button_moves[1][0].setAttribute("class","move_selected");

        player1_displayWins = document.getElementById("player_1_wins");
        player2_displayWins = document.getElementById("player_2_wins");

        current_player_div = document.getElementById("player_1_div");
        current_player_div.setAttribute("class", "current_player");


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

    const selectMove = (i,j,move_p1,move_p2) => {

        if(img_button_moves[i][j].getAttribute("Listener")  === "true"){

            img_button_moves[0][0].setAttribute("class","move_no_selected");
            img_button_moves[0][1].setAttribute("class","move_no_selected");
            img_button_moves[1][0].setAttribute("class","move_no_selected");
            img_button_moves[1][1].setAttribute("class","move_no_selected");
            let k;
            let l;
            if(i===0){
                k = 1;
                if(j===0)
                    l = 1;
                else
                    l = 0;

            }
            else{
                k = 0;
                if(j===0)
                    l = 1;
                else
                    l = 0;

            }

            players[0].setMove(move_p1);
            players[1].setMove(move_p2);
            img_button_moves[i][j].setAttribute("class","move_selected");
            img_button_moves[k][l].setAttribute("class","move_selected");

            console.log(img_button_moves[i][j].getAttribute("move"));
            current_selection = img_button_moves[i][j].getAttribute("move");
        }

    }

    addEvents = () => {

        //button_player1.addEventListener("click",prevent_Default);
        button_player1.addEventListener("click",function () {change_header(0)});
        //button_player2.addEventListener("click",prevent_Default);
        button_player2.addEventListener("click",function () {change_header(1)});

        img_button_moves[0][0].addEventListener("click",function () {selectMove(0,0,"O","X")});
        img_button_moves[0][0].setAttribute("Listener",true);
        img_button_moves[0][1].addEventListener("click",function () {selectMove(0,1,"X","O")});
        img_button_moves[0][1].setAttribute("Listener",true);
        img_button_moves[1][0].addEventListener("click",function () {selectMove(1,0,"X","O")});
        img_button_moves[1][0].setAttribute("Listener",true);
        img_button_moves[1][1].addEventListener("click",function () {selectMove(1,1,"O","X")});
        img_button_moves[1][1].setAttribute("Listener",true);


    }
    const remove_img_events = () => {

        img_button_moves[0][0].setAttribute("Listener",false);
        img_button_moves[0][1].setAttribute("Listener",false);
        img_button_moves[1][0].setAttribute("Listener",false);
        img_button_moves[1][1].setAttribute("Listener",false);
    }
    const active_img_events = () => {

        img_button_moves[0][0].setAttribute("Listener",true);
        img_button_moves[0][1].setAttribute("Listener",true);
        img_button_moves[1][0].setAttribute("Listener",true);
        img_button_moves[1][1].setAttribute("Listener",true);
    }

    const display_wins = () => {

        player1_displayWins.textContent = "Wins = " + player1.getWins();
        console.log("display_players.display_wins:");
        console.log(player1_displayWins);
        player2_displayWins.textContent = "Wins = " + player2.getWins();

    }

    const showCurrentPlayer = () => {

        if(current_player === 1){
            current_player_div = document.getElementById("player_2_div");
            current_player_div.setAttribute("class", "no_current_player");
            current_player_div = document.getElementById("player_1_div");
            current_player_div.setAttribute("class", "current_player");
        }
        else{
            current_player_div = document.getElementById("player_1_div");
            current_player_div.setAttribute("class", "no_current_player");
            current_player_div = document.getElementById("player_2_div");
            current_player_div.setAttribute("class", "current_player");
        }

    }



    return {init,addEvents,remove_img_events,active_img_events,display_wins,showCurrentPlayer};

})();

let current_player = 1;

function addMove(id){

        display_restart_button.removeEvent();
        let cell_clicked = document.getElementById(id);
        console.log("addMove: listener attribute = " + cell_clicked.getAttribute("Listener") );
        if(cell_clicked.getAttribute("Listener") === "true"){
           
            let next_move = "";

            display_players.remove_img_events();
            

            if(current_player === 1){
                 current_player = 2;
                 next_move = player1.getMove();
            }
            else{
                current_player = 1;
                next_move = player2.getMove();
            }

            display_players.showCurrentPlayer();

            displayBoard.remove_event(id);
            console.log("addMove: trying to render a " + next_move);
            cell_clicked.childNodes[0].textContent = next_move;
            
            let statOfGame = Game.flowOfGame(next_move,+id.charAt(5),+id.charAt(6));
            if(statOfGame[0] || statOfGame[1]){ // someone win the game or ties
                console.log("addMove: the game is over!!!!!!!");
                displayBoard.remove_all_events(); 
                display_restart_button.setActiveEvent();
                display_players.display_wins();
            }
        }
        
}

const display_restart_button = ( function(){

    let restart_button = document.getElementById("restart_game");

    const restartGame = () => {

       // if(restart_button.getAttribute("Listener") === "true"){
            console.log("restartGame: the game will be restart");
            game_over_message.textContent = "";
            Game.startGame();
            displayBoard.restart();
            display_players.active_img_events();
            
            display_players.showCurrentPlayer();
            
       // }
        /*else{
            console.log("restartGame: the game starts already, it can't be restart");
        }*/
    }

    const init = () => {
        restart_button.addEventListener("click",restartGame);
        restart_button.setAttribute("Listener",true);
    }
    const removeEvent = () => {

        restart_button.setAttribute("Listener",false);

    }
    const setActiveEvent = () => {

        restart_button.setAttribute("Listener",true);

    }
    return {restartGame,init,removeEvent,setActiveEvent};


})();


Game.startGame();
displayBoard.render();
display_players.init();
display_players.addEvents();
display_restart_button.init();
