let header  = document.querySelector(".header");
let scoreBoard = document.querySelector(".scoreBoard");
let clicks = 0 ;
let symbols = document.getElementsByTagName("input");
let selectedSymbol = null ; 
let oppositeSymbol= null ;
let userScore =0;
let computerScore = 0;
let winner = null ;  // using it as a sign that the game is still going or a draw
// bcs if we added null as a return value it will iterate in an infinite loop
 
// modal variables
let modal =  document.querySelector(".result"); 
let resultStatement = document.getElementById("resultStatement")
let modalUserScore = document.getElementById("card-userScore");
let modalComputerScore = document.getElementById("card-computerScore");


let StartBtn = document.getElementById("start");
StartBtn.onclick = ()=> {
     
    // two separate loops to define the selected & opposite symbols
    for (let i = 0; i < symbols.length; i++) {
        if (symbols[i].checked) {
            selectedSymbol = symbols[i].value;
            header.style.display = "none";
            scoreBoard.style.display = "flex";
            console.log("Your symbol is " + selectedSymbol);
            }
            // if you try to do else statement to define opposite loop it will be overwritten 
        }
       
        
        // Determine the opposite symbol after the loop
        // check if the selectedSymbol is already set 
        if (selectedSymbol !== null) {
            for (let i = 0; i < symbols.length; i++) {
                if (!symbols[i].checked) {
                    oppositeSymbol = symbols[i].value;
                    console.log("Your opposite symbol is " + oppositeSymbol);
                     
                }
            }
       
            
            } else {
                alert("No symbol selected.");
            }    
}
// identifying places / cells to fill with values (x,o) later 
let places = document.querySelectorAll(".place"); 
  function Check(div){
    if(clicks % 2 !== 0  ){
        // to not interrupt computer turn
        return ;
    }
    else if (selectedSymbol == null){
        //interrupting the play if the user didn't select a symbol
        return ;
    }
    else if(winner  == null ){
        // checking if there's no winner yet  
        if(div.querySelector(".empty")){
            let childDiv = div.querySelector(".empty"); 
            childDiv.classList.remove("empty");
            childDiv.classList.add(selectedSymbol);
            let iTag = childDiv.querySelector("i"); 
            iTag.classList.add(`fa-${selectedSymbol}`);
            clicks++;  
            if(CheckWinner()){
             // checking if the user won     
                userScore++;  
                resultStatement.textContent = "YOU WON !";
                resultStatement.style.color = "green";
                modalUserScore.style.color = "green";
                modalUserScore.textContent = userScore;
                // delatying the modal appearance 
                setTimeout(()=>{modal.style.display = "flex";}, 500)  
                return;
            }
        } 
        else {
            // return if user choosed a used place 
            return ; 
        }
    }
  }
     
      
function  ComputerTurn(){    
      if (winner){
        //to interrupt computer from playing after the user wins 
        return
        } 
        else if(winner == null){
            if(clicks % 2 !== 0  ){
                // checking if it's the computer's turn
                let index = Math.floor(Math.random()*9)
                let place =  places[index].querySelector(".empty");
                if(place == null){
                // replaying if the place is not empty
                    ComputerTurn();
                }
                else { 
                // do this when the place is empty
                    let iTag = place.querySelector("i");
                    place.classList.remove("empty");
                    place.classList.add(oppositeSymbol);
                    iTag.classList.add(`fa-${oppositeSymbol}`); 
                    clicks++;
                    if(CheckWinner() == false){
                        // check if computer won
                        computerScore++;
                        resultStatement.style.color = "red";
                        resultStatement.textContent = "YOU LOST !";
                        modalComputerScore.style.color = "red";
                        modalComputerScore.textContent = computerScore;
                        // delatying the modal appearance 
                        setTimeout(()=>{modal.style.display = "flex";}, 500)
                            return;
                    }
                }   

            }
            else {
                // to not interrupt user turn
                 return; 
            }
        }
    }
// returns true if the user won , false if computer won , null if it's a tie
function CheckWinner(){
        let row = []; 
    //  getting places and their values 
    for (let i = 0 ; i < places.length ; i++){
        if(places[i].querySelector(".x")){
             row.push("x");
         }
        else if ( places[i].querySelector(".o")){
              row.push("o");
        } 
        else {
            row.push("empty");
        }
    } 
     
   
// user winning possibilities 
    if (row[0] == selectedSymbol && row[1] == selectedSymbol && row[2] == selectedSymbol){
        console.log("possibility no1"); 
          
        winner = true ;
         
    }
    else if (row[3] == selectedSymbol && row[4] == selectedSymbol && row[5] == selectedSymbol){
                console.log("possibility no2");
               
                winner = true ; 
            }
    else if (row[6] == selectedSymbol && row[7] == selectedSymbol && row[8] == selectedSymbol){
                console.log("possibility no3");
               
                winner = true ; 
    }
    else if(row[0] == selectedSymbol && row[3] == selectedSymbol && row[6] == selectedSymbol){
        console.log("possibility no4");
          
        winner = true ; 
    }
    else if(row[1] == selectedSymbol && row[4] == selectedSymbol && row[7] == selectedSymbol){
        console.log("possibility no5");
          
        winner = true ;  
    }
    else if(row[2] == selectedSymbol && row[5] == selectedSymbol && row[8] == selectedSymbol){
        console.log("possibility no6");
        
        winner = true ; 
    }
    else if(row[0] == selectedSymbol && row[4] == selectedSymbol && row[8] == selectedSymbol){
        console.log("possibility no7");
        
        winner = true ;

    
    }
    else if(row[2] == selectedSymbol && row[4] == selectedSymbol && row[6] == selectedSymbol){
        console.log("possibility no8");
        
        winner = true ;
    }
      
        
    
// user losing possibilities
    else if(row[0] == oppositeSymbol && row[1] == oppositeSymbol && row[2] == oppositeSymbol){
        console.log("possibility no9");
          
        winner = false;  
    }
    else if(row[3] == oppositeSymbol && row[4] == oppositeSymbol && row[5] == oppositeSymbol){
        console.log("possibility no11");
        
        winner = false;  
    }
    else if(row[6] == oppositeSymbol && row[7] == oppositeSymbol && row[8] == oppositeSymbol){
        console.log("possibility no11");
       
        winner = false;  
    } 
    else if(row[0] == oppositeSymbol && row[3] == oppositeSymbol && row[6] == oppositeSymbol){
        console.log("possibility no12");
       
        winner = false; 
    }
    else if(row[1] == oppositeSymbol && row[4] == oppositeSymbol && row[7] == oppositeSymbol){
        console.log("possibility no13");
        
        winner = false; 
    }
    else if(row[2] == oppositeSymbol && row[5] == oppositeSymbol && row[8] == oppositeSymbol){
        console.log("possibility no14");
       
        winner = false; 
    }
    else if(row[0] == oppositeSymbol && row[4] == oppositeSymbol && row[8] == oppositeSymbol){
        console.log("possibility no15");
      
        winner = false; 
    }
    else if(row[2] == oppositeSymbol && row[4] == oppositeSymbol && row[6] == oppositeSymbol){
        console.log("possibility no16"); 
      
        winner = false; 
    }
// draw possibility
   
    else if (clicks == 9 && winner == null){
            
        resultStatement.textContent = "I'S A DRAW !";
                resultStatement.style.color = "gray";
                modal.style.display ="flex";
                
        

          
    }  
       
    
    else {
         setTimeout(ComputerTurn, 500);  

    }
   
   return winner ; 
}



let playAgainBtn = document.getElementById("play-again");
playAgainBtn.onclick = () => {
    // setting the clicks to 0 and the winner to null because it's a new game
    clicks = 0 ; 
    winner = null;
    modal.style.display = "none" ;
    // adding score to the main page 
    document.getElementById("computerScore").textContent = computerScore;
    document.getElementById("userScore").textContent = userScore;
    // selecting each place for emptying them , so the user play another game
    places.forEach((place)=>{
        let ChildDiv = place.querySelector("div") ; 
        // selecting    the places that are not empty 
      if (!ChildDiv.classList.contains("empty")){
        // a loop to delete all the classes from the places
        for (let i = 0 ; i < ChildDiv.classList.length; i++){
           ChildDiv.classList.remove(ChildDiv.classList[i]) ;
        };
        // adding the empty class to the places
        ChildDiv.classList.add("empty");
        // now a loop to remove the icons of x and o inside the child div
        let iTag = ChildDiv.querySelector("i");
        // we will keep (fa-solid) & remove (fa-x and fa-o)
        iTag.classList.remove(iTag.classList[1]);

        
    }
})

}
// quitting and closing the modal and restarting the game
let quitBtn = document.getElementById("quit");
quitBtn.onclick = () => {
    // setting all the values to default (same as in the begining)
    modal.style.display = "none";
    header.style.display = "block" ;
    scoreBoard.style.display = "none";
   
    places.forEach((place)=>{
        let ChildDiv = place.querySelector("div") ; 
        // selecting    the places that are not empty 
      if (!ChildDiv.classList.contains("empty")){
        // a loop to delete all the classes from the places
        for (let i = 0 ; i < ChildDiv.classList.length; i++){
           ChildDiv.classList.remove(ChildDiv.classList[i]) ;
        };
        // adding the empty class to the places
        ChildDiv.classList.add("empty");
        // now a loop to remove the icons of x and o inside the child div
        let iTag = ChildDiv.querySelector("i");
        // we will keep (fa-solid) & remove (fa-x and fa-o)
        iTag.classList.remove(iTag.classList[1]);
      }
    });
    // variables to default
    selectedSymbol = null ; 
    oppositeSymbol= null ;
    clicks = 0 ; 
    userScore =0;
    computerScore = 0;
    winner = null ;
    // scoreBoard & score in the modal to default 
    document.getElementById("userScore").textContent = userScore;
    document.getElementById("computerScore").textContent = computerScore;
    modalUserScore.textContent = userScore;
    modalComputerScore.textContent =  computerScore;
    };
