//A creative take on a memory game.
//When time allows I will change code to handle data management and UI changes in seperate functions. 



//This prevents reloading of the page for submits
document.addEventListener('submit',function(e){
    e.preventDefault
    
})

//This event listener manages the clicking of buttons to start and continue games as well as looking at the rules
document.addEventListener('click',function(e){
    
    //Defines handles to refer to the three main divs of the html file. These are toggled to be visible or not as needed
    const rules = document.querySelector("#ruleDiv")
    const form = document.querySelector("#formDiv")
    const game = document.querySelector("#gameDiv")
    
    //Rule Button Click
    if(e.target.id === "ruleButton"){
        rules.classList.remove("invisible")
        if(form.classList.contains("invisible") === false) {
            form.classList.add("invisible")
            clearForm()
        }
        if(game.classList.contains("invisible") === false) {
            game.classList.add("invisible")
            depopulateGameDiv()
        }

    }

    //New Game Button Click
    if(e.target.id === "newGameButton"){
        form.classList.remove("invisible")
        if(rules.classList.contains("invisible") === false) {
            rules.classList.add("invisible")
        }
        if(game.classList.contains("invisible") === false) {
            game.classList.add("invisible")
            depopulateGameDiv()
        }
    }

    //Button for new game creation form
    if(e.target.id === "startNewGameButton"){
        //If Game is currently going, check to make sure user wants to start a new game.
        if(localStorage.gameInProgress==="true") {
            const warning = document.createElement('p')
            warning.innerText = "Are you sure? Starting a new game will cancel your old game, losing all your progress."
            warning.id = "warning"
            const sureButton = document.createElement('button')
            sureButton.innerText = "I'm Sure"
            sureButton.id = "sureButton"
            const cancelButton = document.createElement('button')
            cancelButton.innerText = "Cancel"
            cancelButton.id = "cancelButton"
            form.appendChild(warning)
            form.appendChild(sureButton)
            form.appendChild(cancelButton)
        }

        //Get data from form, clear form, and start the new game
        else{
            localStorage.setItem('currentScore',0)
            createGame()

        }
    }

    //Start Game button that appears if trying to start new game while game is in progress
    if(e.target.id === "sureButton") {
        document.querySelector('#warning').remove()
        document.querySelector('#sureButton').remove()
        document.querySelector('#cancelButton').remove()

        
        localStorage.setItem('currentScore',0)
        createGame()
    }

    //Button to cancel new game creation that appears if trying to start new game while game is in progress
    if(e.target.id === "cancelButton") {
        clearForm()
        game.classList.remove("invisible")
        form.classList.add("invisible")
        document.querySelector('#warning').remove()
        document.querySelector('#sureButton').remove()
        document.querySelector('#cancelButton').remove()
    }

    //Button that brings up the current game in case page has been refreshed or user has navigated away from current game
    if(e.target.id ==="continueGameButton") {
        game.classList.remove("invisible")
        form.classList.add("invisible")
        if(rules.classList.contains("invisible")=== false) {
        rules.classList.add("invisible")
        }
        clearForm()
        populateGameDiv()
    }
})



//This function runs at the setup a new game
function createGame() {

    //Declaring some variables we will use to ensure form was filled out correctly.
    const name = document.querySelector("#userName")
    let gameType = "invalid"
    const radioBoxes = document.getElementsByName("gameType")
    
    //Changes gameType to valid if one of the boxes was checked
    for(i=0;i<radioBoxes.length;i++){
        if(radioBoxes[i].checked === true) {
                        gameType = "valid"
        }
    }
    //Makes sure user name was entered, if not throws alert
    if(name.value === "") {
        throw alert("Please make sure you enter a Player Name")
    }

    //Makes sure game type was selected, if not throws alert
    if(gameType==="invalid") {
        throw alert("Please make sure you have selected how many eggs you would like to collect.")
    }

    //Stores user name
    localStorage.setItem("userName",name.value)

    //Gets info from form radio boxes and stores selected game type
    for(i=0;i<radioBoxes.length;i++){
        if(radioBoxes[i].checked === true) {
                        localStorage.setItem("gameType",radioBoxes[i].value)
        }
    }

    //Clear the create game form 
    clearForm()
    
    //Get rid of form div and pull up game div, let browser know game is started, and clear form
    document.querySelector("#gameDiv").classList.remove("invisible")
    document.querySelector("#formDiv").classList.add("invisible")
    localStorage.setItem("gameInProgress", "true")
        
    //We will use the item 'chickensSelected' in click events to make sure too many chickens aren't selected
    localStorage.setItem('chickensSelected',0)

    //The item 'hiddenDivs' is used to manage matching pairs that have previously been found during a game. This step makes sure our newly created game doesnt hide chickens thinking they have already been found.
    if(localStorage.hiddenDivs!=undefined){
        localStorage.removeItem('hiddenDivs')
    }

    //Gets data in local storage for memory game items
    arrangeChickensAndEggs()
    //Makes all UI changes
    populateGameDiv()
}


//This function clears the form used to create a new game
function clearForm() {
    const types = document.getElementsByName("gameType")
    for(i=0;i<types.length;i++){
        if(types[i].checked === true) {
            types[i].checked = false
        }
    }
    document.querySelector('#userName').value=""
}



//This function uptdates the score section
function setScore() {

    //Updates UserName
    document.querySelector('#currentPlayer').innerText = localStorage.userName

    //Updates Current Score
    currentScoreSpan.innerText = localStorage.getItem('currentScore')

    //This whole spammy section retrieves data from local storage to update the game type and high score
    if(localStorage.gameType==="4"){
        document.querySelector('#currentGameType').innerText = " (4 Chicken Game)"
        document.querySelector('#highScoreGameType').innerText = " (4 Chicken Game)"
        if(localStorage.fourGameHighScoreUser===undefined){
            document.querySelector("#highScorePlayer").innerText = "No High Score For"
            document.querySelector("#highScoreSpan").innerText = ""
        }
        else {
            document.querySelector("#highScorePlayer").innerText = localStorage.fourGameHighScoreUser + " "
            document.querySelector("#highScoreSpan").innerText = localStorage.fourGameHighScore
        }
    } 
    if(localStorage.gameType==="8"){
        document.querySelector('#currentGameType').innerText = " (8 Chicken Game)"
        document.querySelector('#highScoreGameType').innerText = " (8 Chicken Game)"
        if(localStorage.eightGameHighScoreUser===undefined){
            document.querySelector("#highScorePlayer").innerText = "No High Score For"
            document.querySelector("#highScoreSpan").innerText = ""
        }
        else {
            document.querySelector("#highScorePlayer").innerText = localStorage.eightGameHighScoreUser + " "
            document.querySelector("#highScoreSpan").innerText = localStorage.eightGameHighScore
        }
    } 
    if(localStorage.gameType==="16"){
        document.querySelector('#currentGameType').innerText = " (16 Chicken Game)"
        document.querySelector('#highScoreGameType').innerText = " (16 Chicken Game)"
        if(localStorage.sixteenGameHighScoreUser===undefined){
            document.querySelector("#highScorePlayer").innerText = "No High Score For"
            document.querySelector("#highScoreSpan").innerText = ""
        }
        else {
            document.querySelector("#highScorePlayer").innerText = localStorage.sixteenGameHighScoreUser + " "
            document.querySelector("#highScoreSpan").innerText = localStorage.sixteenGameHighScore
        }
    }
    if(localStorage.gameType==="32"){
        document.querySelector('#currentGameType').innerText = " (32 Chicken Game)"
        document.querySelector('#highScoreGameType').innerText = " (32 Chicken Game)"
        if(localStorage.thirtyTwoGameHighScoreUser===undefined){
            document.querySelector("#highScorePlayer").innerText = "No High Score For"
            document.querySelector("#highScoreSpan").innerText = ""
        }
        else {
            document.querySelector("#highScorePlayer").innerText = localStorage.thirtyTwoGameHighScoreUser + " "
            document.querySelector("#highScoreSpan").innerText = localStorage.thirtyTwoGameHighScore
        }
    }
}


//This function automatically shuffles any array. It will be called by the 'arrangeChickensAndEggs' function to randomize placement of colored eggs.
function shuffleArray(array) {
    for (i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


//Function to create chicken and egg data in local storage. This information will be read by the 'populateGameDiv' function to create the divs and add images to get our chickens and eggs into the DOM.
function arrangeChickensAndEggs() {
    let chickenNumber=parseInt(localStorage.gameType)
    let chickenArray= []

    for(i=1;i<=chickenNumber;i++){
        chickenArray[i-1] = Math.ceil(i/2)
    }
    shuffleArray(chickenArray)

    for(i=0;i<chickenArray.length;i++){
        let chickenName = i+1
        let chickenType = chickenArray[i]
        localStorage.setItem(chickenName,chickenType)
    }
}


//This function calls data from local storage to set up the UI for the game
function populateGameDiv() {
    
    //Removes anything left in the DOM from previous games just in case.
    depopulateGameDiv()

    //Updates current score.
    setScore()

    //Gets all our chickens out of storage and places them into the game div
    for(i=1;i<=localStorage.gameType;i++) {
        let eggDiv = document.createElement('div')
        eggDiv.id = `eggDiv${i}`
        eggDiv.classList.add('eggDiv')
        if(localStorage.hiddenDivs != undefined &&localStorage.hiddenDivs.includes(`${i}`)){
            eggDiv.classList.add('hidden')
        }
        document.querySelector("#gameDiv").appendChild(eggDiv)
        let nest = document.createElement('img')
        nest.id = `nest${i}`
        nest.src = "nest.png"
        nest.classList.add("nest")
        eggDiv.appendChild(nest)
        let egg = document.createElement('img')
        egg.id = `egg${i}`
        egg.classList.add("egg")
        egg.classList.add("hidden")
        let fileName = localStorage.getItem(`${i}`) + ".png"
        egg.src = fileName
        eggDiv.appendChild(egg)
        let chicken2 = document.createElement('img')
        chicken2.id = `chicken2-${i}`
        chicken2.src = "chicken2.gif"
        chicken2.classList.add('chicken2')
        eggDiv.appendChild(chicken2)
        let chicken = document.createElement('img')
        chicken.id = `chicken${i}`
        chicken.src = "chicken.jpg"
        chicken.classList.add('chicken')
        eggDiv.appendChild(chicken)
        

    }

}


//This function removes everything from the game UI
function depopulateGameDiv() {
    const game = document.querySelector("#gameDiv")
    while(game.firstChild) {
        game.removeChild(game.firstChild)
    }
}






//This event listener briefly hides a still image of a chicken which has been placed on top of an identically sized gif of that same chicken flapping. The intent is to make it look like your mouse has disturbed the chicken.
document.addEventListener('mouseover',function(e) {
    if(e.target.classList.contains('chicken')){
    e.target.classList.toggle('hidden')
    setTimeout(function(){e.target.classList.toggle('hidden')},1800)
    }
})




//This event listener manages the clicking of chickens. This event listener and its supporting functions effectively manage all gameplay
document.addEventListener('click',function(e) {
    if(e.target.classList.contains('chicken') || e.target.classList.contains('chicken2')){
        if(parseInt(localStorage.getItem('chickensSelected'))===0){
            //adjusts score
            let currentScore = parseInt(localStorage.getItem('currentScore')) + 1
            localStorage.setItem('currentScore',currentScore)
            currentScoreSpan.innerText = localStorage.getItem('currentScore')

            //tells us we have selected the first chicken and lets us know which one it is. Uses if statement to detect if the number is double or single digit and captures it
            localStorage.setItem('chickensSelected',1)
            if(e.target.id[e.target.id.length-2]==='1' || e.target.id[e.target.id.length-2]==='2' || e.target.id[e.target.id.length-2]==='3'){
                let firstSelectedChicken = e.target.id[e.target.id.length-2] + e.target.id[e.target.id.length-1]
                localStorage.setItem('firstSelectedChicken',firstSelectedChicken)
            }
            else{
                let firstSelectedChicken = e.target.id[e.target.id.length-1]
                localStorage.setItem('firstSelectedChicken',firstSelectedChicken)
            }
            //drop egg action
            dropEgg(localStorage.getItem('firstSelectedChicken'))
        }
        else if(parseInt(localStorage.getItem('chickensSelected'))===1 && localStorage.getItem('firstSelectedChicken') != e.target.id[e.target.id.length-1]){
            
            //tells us we have selected the first chicken and lets us know which one it is.
            localStorage.setItem('chickensSelected',99)
            if(e.target.id[e.target.id.length-2]==='1' || e.target.id[e.target.id.length-2]==='2' || e.target.id[e.target.id.length-2]==='3'){
                let secondSelectedChicken = e.target.id[e.target.id.length-2] + e.target.id[e.target.id.length-1]
                localStorage.setItem('secondSelectedChicken',secondSelectedChicken)
            }
            else{
                let secondSelectedChicken = e.target.id[e.target.id.length-1]
                localStorage.setItem('secondSelectedChicken',secondSelectedChicken)
            }
            
            //drop egg action
            dropEgg(localStorage.getItem('secondSelectedChicken'))


            //Makes chickens and eggs hidden if correctly paired
            if(localStorage.getItem(localStorage.getItem('firstSelectedChicken'))===localStorage.getItem(localStorage.getItem('secondSelectedChicken'))) {
               
                //specifies eggDivs and then sends them to the removal function
                setTimeout(removeEggDiv,2000,localStorage.getItem('firstSelectedChicken'))
                setTimeout(removeEggDiv,2000,localStorage.getItem('secondSelectedChicken'))

                //Checks to see if all pairs have been found.
                setTimeout(checkEndGame,2001)
                
                //resets the selected chickens, set to take just a little longer than the removal function so that those are all gone befor the user can select the next chicken
                setTimeout(function() {localStorage.setItem('chickensSelected',0)},2002)
            }
            //restores both eggd to original position
            else {
                setTimeout(function(){
                    returnEgg(localStorage.getItem('firstSelectedChicken'))
                    returnEgg(localStorage.getItem('secondSelectedChicken'))
                    localStorage.setItem('chickensSelected',0)
                    localStorage.setItem('firstSelectedChicken',98)
                    localStorage.setItem('secondSelectedChicken',99)
                    },2000)
                   

            }
                    
            

        }
    }
})

//This function is called when the user selects a chicken. It gives the appearance of the chicken laying the egg and it falling into the nest below.
function dropEgg(selectedChicken) {
    document.querySelector("#egg"+selectedChicken).classList.toggle("hidden")
    document.querySelector("#egg"+selectedChicken).style.transitionDuration = "1s";
    document.querySelector("#egg"+selectedChicken).style.marginTop = '120%'
    document.querySelector("#egg"+selectedChicken).style.zIndex = '40'
}


//This egg essentially resets the values changes by the 'dropEgg' function. It intentionally does this in a way that makes the egg disappear from the nest instead of rising back to the chicken.
function returnEgg(selectedChicken) {
    document.querySelector("#egg"+selectedChicken).style.transitionDuration = "0s";
    document.querySelector("#egg"+selectedChicken).classList.toggle("hidden")
    document.querySelector("#egg"+selectedChicken).style.marginTop = '20%'
    document.querySelector("#egg"+selectedChicken).style.zIndex = '1'
  
}


//This function hides matched pairs from UI
function removeEggDiv(selectedChicken) {
    //makes sure the egg doesnt linger 
    document.querySelector("#egg"+selectedChicken).style.transitionDuration = "0s";

    //hides entire eggDiv until game is ended
    let removalDiv = document.querySelector('#eggDiv'+ selectedChicken)
    removalDiv.classList.add("hidden")

    //Tells local storage this pair was found so we can hide them if we 'continue game' or refresh the page
    if(localStorage.hiddenDivs===undefined) {
        localStorage.hiddenDivs = ''
        localStorage.hiddenDivs = localStorage.hiddenDivs + `${selectedChicken}`
    }
    else {
        localStorage.hiddenDivs = localStorage.hiddenDivs + `${selectedChicken}`
    }
}

//This function checks to see if all pairs have been found. If they have, it calls the 'endgame' function.
function checkEndGame() {
    console.log('here')
    if(localStorage.gameType === '8' || localStorage.gameType === '4' ){
        if(localStorage.hiddenDivs.length === parseInt(localStorage.gameType)){
            endGame()
        }
    }
    if(localStorage.gameType === '16') {
        console.log('here')
        if(localStorage.hiddenDivs.length === 23){
            console.log('here too')
            endGame()
        }
    }
    if (localStorage.gameType === '32') {
        if(localStorage.hiddenDivs.length === 55){
            endGame()
        }
    }
}

//This function clears localstorage of everything but high score information and leaves a cute note to the victorious user.
function endGame() {
//Store High Score if necessary
    const type = localStorage.gameType
    let score = localStorage.getItem('currentScore')
    if(type==='4' && (localStorage.fourGameHighScoreUser===undefined ||     parseInt(score) < parseInt(localStorage.fourGameHighScore))) {
        localStorage.setItem('fourGameHighScore',score)
        localStorage.setItem('fourGameHighScoreUser',localStorage.userName)
    }
    if(type==='8' && (localStorage.eightGameHighScoreUser===undefined ||    parseInt(score) < parseInt(localStorage.eightGameHighScore))) {
        localStorage.setItem('eightGameHighScore',score)
        localStorage.setItem('eightGameHighScoreUser',localStorage.userName)
    }
    if(type==='16' && (localStorage.sixteenGameHighScoreUser===undefined || parseInt(score) < parseInt(localStorage.sixteenGameHighScore))) {
        localStorage.setItem('sixteenGameHighScore',score)
        localStorage.setItem('sixteenGameHighScoreUser',localStorage.userName)
    }
    if(type==='32' && (localStorage.thirtyTwoGameHighScoreUser===undefined  || parseInt(score) < parseInt(localStorage.thirtyTwoGameHighScore))) {
        localStorage.setItem('thirtyTwoGameHighScore',score)
        localStorage.setItem('thirtyTwoGameHighScoreUser',localStorage.userName)
    }
    
    //Updates score section, specifically giving the user the opportunity to see their high score reflected if they achieved it
    setScore()
    //Gets rid of all hidden egg divs
    depopulateGameDiv()
    //Leaves a happy note for the victor
    congratsMessage()

    //Clears out all game specific information from local storage
    for(i=1;i<=parseInt(localStorage.gameType);i++) {
        localStorage.removeItem(`${i}`)
    }

    setTimeout(function() {
        localStorage.removeItem('chickensSelected')
        localStorage.removeItem('currentScore')
        localStorage.removeItem('gameType')
        localStorage.removeItem('userName')
        localStorage.removeItem('gameInProgress')
        localStorage.removeItem('hiddenDivs')
        localStorage.removeItem('firstSelectedChicken')
        localStorage.removeItem('secondSelectedChicken')
    },2010)
}

//This function puts a message and gif in the emptied game div to congratulate the user
function congratsMessage() {
    const congrats = document.createElement('h3')
    congrats.innerText = "Congratulations, now make me an omelette!"
    congrats.style.width = "100%"
    congrats.style.color = "white"
    congrats.style.textAlign = "center"
    document.querySelector("#gameDiv").appendChild(congrats)
    const omelette = document.createElement('img')
    omelette.src = "omelette.gif"
    omelette.classList.add("omelette")
    document.querySelector("#gameDiv").appendChild(omelette)
}