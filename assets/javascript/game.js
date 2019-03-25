window.onload = function () {
    // game hasn't started yet
    var gameStarted = false; 
    // define a starting score of 0
    var gamesWonCounter = 0;
    // define a starting number of guesses at 8
    var remainingGuessCounter = 8;
    // list of words to choose from
    var treesToChooseFrom = {
        "madrone": "assets/images/CoastLiveOak.jpg",
        "magnolia": "assets/images/CoastLiveOak.jpg",
        "maple": "assets/images/CoastLiveOak.jpg",
        "willow": "assets/images/CoastLiveOak.jpg",
        "locust": "assets/images/CoastLiveOak.jpg",
        "pine": "assets/images/CoastLiveOak.jpg",
        "jacaranda": "assets/images/CoastLiveOak.jpg",
        "oak": "assets/images/CoastLiveOak.jpg",
        "elm": "assets/images/CoastLiveOak.jpg",
        "ash": "assets/images/CoastLiveOak.jpg",
    };
    // when someone starts a game, the stash of guessed letters is empty
    var guessedWrongLetters = []; 

    var chosenWord = "";

    var underscorePlaceholders = [];

    // grab #chosen-word div
    var chosenWordElement = document.getElementById("chosen-word");

    // grab the score-element
    var gamesWonElement = document.getElementById("games-won");

    // grab the remamaining-guesses-element
    var remainingGuessesElement = document.getElementById("remaining-guesses");

    // grab the guessed-wrong-letters-element
    var guessedWrongLettersElement = document.getElementById("guessed-wrong-letters");

    // make some functions reusable
    function resetGame() {
        // choose a random word and define the word that is guessed
        chosenWord = Object.keys(treesToChooseFrom)[Math.floor(Math.random() * Object.keys(treesToChooseFrom).length)];

        // for each letter in the chosen word, create a new array and fill it with a corresponding underscore
        underscorePlaceholders = new Array(chosenWord.length).fill("_");

        // display the underscore version of the chosen word
        chosenWordElement.innerHTML = underscorePlaceholders.join(" ");
        
        // display the number of wins
        gamesWonElement.innerHTML = gamesWonCounter;

        remainingGuessCounter = 8;

        // display the number of remaining guesses 
        remainingGuessesElement.innerHTML = remainingGuessCounter

        guessedWrongLetters = [];

        // display the guessedWrongLetters 
        guessedWrongLettersElement.innerHTML = guessedWrongLetters;   
    }

    // any key starts the game 
    window.addEventListener("keydown", function (eventData) {
        // when someone types a key, know if game has started already
        if (gameStarted == false) {
            gameStarted = true;
            // make "start game" disappear and replace it with "chosen-word"
            // grab #get-started div and hide #get-started div
            var getStartedElement = document.getElementById("get-started");
            getStartedElement.style.display = "none";

            // grab the various headers and show them

            var scoreContainer = document.getElementById("score-container");
        
            scoreContainer.style.display = "block";

            var chosenWordHeader = document.getElementById("chosen-word-header");
            chosenWordHeader.style.display = "block";

            var remainingGuessesHeader = document.getElementById("remaining-guesses-header");
            remainingGuessesHeader.style.display = "block";

            var guessedWrongLettersHeader = document.getElementById ("guessed-wrong-letters-header");

            guessedWrongLettersHeader.style.display = "block";
            
            resetGame();

        } else {             
            // compare the typed letter with the letters of the chosen word 
            // check if string has eventData.key
            if (!chosenWord.includes(eventData.key)) {
                guessedWrongLetters.push(eventData.key);
                // decrease the number of guesses by 1
                remainingGuessCounter --;

                // display the number of remaining guesses 
                remainingGuessesElement.innerHTML = remainingGuessCounter

                // display the guessedWrongLetters
                guessedWrongLettersElement.innerHTML = guessedWrongLetters;
                
            } else {
                var i;
                for (i = 0; i < chosenWord.length; i++) {
                    if (eventData.key === chosenWord.charAt(i)) {
                    // replace the underscore with the eventData.key at the correct index
                        underscorePlaceholders[i] = eventData.key;
                    // display the eventData.key at the correct index 
                        chosenWordElement.innerHTML = underscorePlaceholders.join(" ");    
                    }
                }
            }
        }
        // determine if winning
        // check the number of "_" in the underscorePlaceholder, if there are no more, winning! increase score by one
        if (!underscorePlaceholders.includes("_")) {           
            // we need to increase the score by 1
            gamesWonCounter ++;
            // display winning tree

            //grab the html element
            document.getElementById("guessed-tree-name").innerHTML=(`${chosenWord} is correct!`);

            document.getElementById("tree-photo").src=treesToChooseFrom[chosenWord];
            
            // reset the game - as in choose a new word, show the new underscore placeholders
            resetGame();
        }  else if (guessedWrongLetters.length >= 8) { // reset game when someone uses all their turns
            resetGame();
        }    
    })
}







