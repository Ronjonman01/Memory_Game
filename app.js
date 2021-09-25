
    const rules = document.querySelector("#ruleDiv")
    const form = document.querySelector("#formDiv")
    const game = document.querySelector("#gameDiv")
    let firstSelectedChicken =99
    let secondSelectedChicken =98
    let chickensSelected = 0
    let currentScore = parseInt(localStorage.currentScore)
    if(currentScore===undefined){currentScore=0}
//New Game Form




document.addEventListener('click',function(e){
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
            currentScore = 0
            localStorage.setItem('currentScore',currentScore)
            createGame()

        }
    }

    if(e.target.id === "sureButton") {
        document.querySelector('#warning').remove()
        document.querySelector('#sureButton').remove()
        document.querySelector('#cancelButton').remove()

        currentScore = 0
        localStorage.setItem('currentScore',currentScore)
        createGame()
    }

    if(e.target.id === "cancelButton") {
        clearForm()
        game.classList.remove("invisible")
        form.classList.add("invisible")
        document.querySelector('#warning').remove()
        document.querySelector('#sureButton').remove()
        document.querySelector('#cancelButton').remove()
    }

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

function createGame() {
    //Get rid of form div and pull up game div, let browser know game is started, and clear form
    game.classList.remove("invisible")
    form.classList.add("invisible")
    localStorage.setItem("gameInProgress", "true")
    
    //Store game data
    const name = document.querySelector("#userName")
    localStorage.setItem("userName",name.value)
    const types = document.getElementsByName("gameType")
    for(i=0;i<types.length;i++){
        if(types[i].checked === true) {
                        localStorage.setItem("gameType",types[i].value)
        }
    }
    clearForm()
    setScore()
    buildBoard()
    populateGameDiv()
}

function clearForm() {
    const name = document.querySelector("#userName")
    localStorage.setItem("userName",name.value)
    const types = document.getElementsByName("gameType")
    for(i=0;i<types.length;i++){
        if(types[i].checked === true) {
            types[i].checked = false
        }
    }
    name.value=""
}

function shuffleArray(array) {
    for (i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
document.addEventListener('submit',function(e){
    e.preventDefault
    
})

function setScore() {
    document.querySelector('#currentPlayer').innerText = localStorage.userName
    currentScoreSpan.innerText = localStorage.getItem('currentScore')
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


function buildBoard() {
    let chickenNumber=parseInt(localStorage.gameType)
    for(i=1;i<=chickenNumber;i++){
        localStorage.removeItem(`${i}`)
    }
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

function populateGameDiv() {
    depopulateGameDiv()

    //Gets all our chickens out of storage and places them into the game div
    for(i=1;i<=localStorage.gameType;i++) {
        let eggDiv = document.createElement('div')
        eggDiv.id = `eggDiv${i}`
        eggDiv.classList.add('eggDiv')
        game.appendChild(eggDiv)
        let nest = document.createElement('img')
        nest.id = `nest${i}`
        nest.src = "nest.png"
        nest.classList.add("nest")
        let egg = document.createElement('img')
        egg.id = `egg${i}`
        egg.classList.add("egg")
        eggDiv.appendChild(nest)
        let fileName = localStorage.getItem(`${i}`) + ".png"
        egg.src = fileName
        eggDiv.appendChild(egg)
        let chicken2 = document.createElement('img')
        chicken2.id = `chicken2-${i}`
        chicken2.src = "chicken2.jpg"
        chicken2.classList.add('chicken2')
        eggDiv.appendChild(chicken2)
        let chicken = document.createElement('img')
        chicken.id = `chicken${i}`
        chicken.src = "chicken.jpg"
        chicken.classList.add('chicken')
        eggDiv.appendChild(chicken)

    }

}

function depopulateGameDiv() {
    while(game.firstChild) {
        game.removeChild(game.firstChild)
    }
}

function removeMatchedPair(removalDiv) {
    setTimeout(function(){
    removalDiv.classList.add("hidden")
    },1000)

    //Checks to see if all eggs have been found
    setTimeout(function(){
    let hiddenNum = 0
    let thisEgg= ""
    for(i=1;i<=parseInt(localStorage.gameType);i++){
        thisEgg = "#eggDiv" + `${i}`
        if(document.querySelector(thisEgg).classList.contains("hidden")===true){
            hiddenNum++
        }
    }
    if(hiddenNum===parseInt(localStorage.gameType)){
        endGame()
    }
    },1200)
}


document.addEventListener('mouseover',function(e) {
    if(e.target.classList.contains('chicken')){
    e.target.classList.toggle('hidden')
    setTimeout(function(){e.target.classList.toggle('hidden')},1000)
    }
})

document.addEventListener('click',function(e) {
    if(e.target.classList.contains('chicken') || e.target.classList.contains('chicken2')){
        if(chickensSelected===0){
            //adjusts score
            currentScore++
            localStorage.setItem('currentScore',currentScore)
            currentScoreSpan.innerText = localStorage.getItem('currentScore')
            //tells us we have selected the first chicken and lets us know which one it is. Uses if statement to detect if the number is double or single digit and captures it
            chickensSelected++
            if(e.target.id[e.target.id.length-2]==='1'){
            firstSelectedChicken = e.target.id[e.target.id.length-2] + e.target.id[e.target.id.length-1]
            }
            else{
                firstSelectedChicken = e.target.id[e.target.id.length-1]
            }
            //drop egg action
            document.querySelector("#egg"+firstSelectedChicken).style.marginTop = '120%'
            document.querySelector("#egg"+firstSelectedChicken).style.zIndex = '40'
        }
        else if(chickensSelected===1 && firstSelectedChicken != e.target.id[e.target.id.length-1]){
            
            //tells us we have selected the first chicken and lets us know which one it is.
            chickensSelected++
            if(e.target.id[e.target.id.length-2]==='1'){
                secondSelectedChicken = e.target.id[e.target.id.length-2] + e.target.id[e.target.id.length-1]
            }
            else{
                secondSelectedChicken = e.target.id[e.target.id.length-1]
            }
            
            //drop egg action
            document.querySelector("#egg"+secondSelectedChicken).style.marginTop = '120%'
            document.querySelector("#egg"+secondSelectedChicken).style.zIndex = '40'


            //Makes chickens and eggs hidden if correctly paired
            if(localStorage.getItem(firstSelectedChicken)===localStorage.getItem(secondSelectedChicken)) {
                
                let firstDivId = '#eggDiv'+ firstSelectedChicken
                let removeThisDiv = document.querySelector(firstDivId)
                removeMatchedPair(removeThisDiv)
                let secondDivId = '#eggDiv' + secondSelectedChicken
                removeThisDiv = document.querySelector(secondDivId)
                removeMatchedPair(removeThisDiv)
                setTimeout(function() {
                chickensSelected=0
                firstSelectedChicken=99
                secondSelectedChicken=98
                },1100)
            }
            //or restores both chickens to original position
            else {
            setTimeout(function(){
                document.querySelector("#egg"+firstSelectedChicken).style.marginTop = '20%'
                document.querySelector("#egg"+firstSelectedChicken).style.zIndex = '1'
                document.querySelector("#egg"+secondSelectedChicken).style.marginTop = '20%'
                document.querySelector("#egg"+secondSelectedChicken).style.zIndex = '1'
                chickensSelected=0
                firstSelectedChicken=99
                secondSelectedChicken=98
                        },1000)
            }
                    
            

        }
    }
})

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
        localStorage.setItem('eightGameHighScoreUser',localStorage. userName)
    }
    if(type==='16' && (localStorage.sixteenGameHighScoreUser===undefined || parseInt(score) < parseInt(localStorage.sixteenGameHighScore))) {
        localStorage.setItem('sixteenGameHighScore',score)
        localStorage.setItem('sixteenGameHighScoreUser',localStorage.   userName)
    }
    if(type==='32' && (localStorage.thirtyTwoGameHighScoreUser===undefined  || parseInt(score) < parseInt(localStorage.thirtyTwoGameHighScore))) {
        localStorage.setItem('thirtyTwoGameHighScore',score)
        localStorage.setItem('thirtyTwoGameHighScoreUser',localStorage. userName)
    }
    //Gets rid of all the hidden eggDivs
    depopulateGameDiv()

    //Leaves a congrats message and puts a picture of an omelette
    const congrats = document.createElement('p')
    congrats.innerText = "Congratulations, now make me an omelette!"
    game.appendChild(congrats)
    const omelette = document.createElement('img')
    omelette.src = "omelette.gif"
    omelette.classList.add("omelette")
    game.appendChild(omelette)

    for(i=1;i<=parseInt(localStorage.gameType);i++) {
        localStorage.removeItem(`${i}`)
    }
        localStorage.removeItem('currentScore')
        localStorage.removeItem('gameType')
        localStorage.removeItem('userName')
        localStorage.removeItem('gameInProgress')
}

