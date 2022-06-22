
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

alert("Hey Agatha Christie !! Welcome to the Game of the year 😜");// Alert For a friend

function nextSequence() {
    userClickedPattern.length = 0; // Reset the array. 
    var randomNumber = Math.floor(Math.random() * 4); // Choose a random number between 0 and 3.
    var randomChosenColor = buttonColors[randomNumber];// Chose a random color from the array using a random number.
    gamePattern.push(randomChosenColor);// Make a new array of the chosen colors.
    animatePress(randomChosenColor);// Function to animate the chosen color Button.
    level = gamePattern.length;// Change the levels when playing relative to more new colors. 
    $("h1").text("Level " + level);// Change the text of the level.
    playSound(randomChosenColor);// Calling the function of the sound relatively to the color.
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed").delay(100).queue(function () {
        $(this).removeClass("pressed").dequeue();
    });//Add a class and remove it after x time to make kind of flash effect.
    $("#" + currentColor).fadeIn(100).fadeOut(100).fadeIn(100);// different effect for the button. 
}

$(".btn").on("click", function () {
    var userChosenColor = this.id;// Store the name of the clicked button id.
    userClickedPattern.push(userChosenColor);// Save it inside an array for the clicked buttons.
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);// Function to check if the last color is true 
});


$(document).keypress(function () { // Function to start the game(i tried in the beginning the one() function to make it work just once)
    if (!started) {
        $("h1").text("Level " + level);// First change of the text to save the levels.
        nextSequence();// Start the game
        started = true;// Change the variable than it don't work anymore until resetting it again when to game is over.  
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {// If the color randomly chosen and clicked by the player is the same.
        if (gamePattern.length == userClickedPattern.length) { 
            setTimeout(function () { nextSequence(); }, 1000);// Delay before call the function 
        }// If player is succeeding choose the next color.
    } else {
        $("body").addClass("game-over").delay(200).queue(function () {// If wrong change the background.
            $(this).removeClass("game-over").dequeue();// Flash effect by removing the class after a delay.
        });
        playSound ("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");// Change text
        setTimeout(function () { alert("Nice Try Agatha !! Back to work now 😂 "); }, 1000);// Alert For a friend
        startOver ();
    }
}
function startOver (){// reset the game 
    gamePattern.length = 0;// Empty array
    level = 0;
    started = false;// for the  if (!started), now when a key pressed the game start.
}
