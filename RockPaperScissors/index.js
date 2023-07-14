//Lets Create the Rock Paper Scissors Game.

function getPlayerSelection(){
    const choices = ["rock","paper","scissors"];
    var selection = prompt("Please write your selection: rock ,paper or scissors..");
    return selection;
}

function getComputerSelection(){
    const choices = ["rock","paper","scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function GameRound(playerSelection,computerSelection){
    if ((playerSelection ==="rock" && computerSelection==="scissors")  || 
        (playerSelection ==="paper" && computerSelection==="rock")  ||
        (playerSelection ==="scissors" && computerSelection==="paper") ){
            return 1;
    }else if (playerSelection === computerSelection){
            return 3;
    }else{
            return 2;
    }
    
}

function Game(){
    let computer_wins = 0;
    let player_wins = 0;

    while(computer_wins< 3 && player_wins < 3){
        let playerSelection = getPlayerSelection(); 
        let computerSelection = getComputerSelection();
        console.log(`Player Selection : ${playerSelection}`);
        console.log(`Computer Selection : ${computerSelection}`);
        let outcome = GameRound(playerSelection,computerSelection);
        if(outcome===1){
            player_wins = player_wins + 1 ;
            console.log("Player Wins , Current Score: " + player_wins+"-" +computer_wins)
        }else if (outcome===2){
            computer_wins = computer_wins + 1;
            console.log("Computer Wins , Current Score: " + player_wins+"-" + computer_wins)
        }else{
            console.log("It'sa tie, Current Score: " + player_wins+"-" + computer_wins)
        }
        
    }

    if ( player_wins >=3){
        console.log("Congratulations you won!!")
    }else{
        console.log("Game Over.You lost!")
    }
}


 
Game();