//-------------------------------Setup for Async Function
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//calling reverseStart function
reverseStart();

async function reverseStart() {
  //--------------------------------FUNCTION: random number generator
  function randomNum() {
    let min = 1; //min is hardcoded at start
    let max = 100; //userMax is hardcoded at start
    let range = max - min + 1; //determines the range for the equation
    return Math.floor(Math.random() * range) + 1; //returns a randomly generated whole number within set range
  }

  console.log(
    `\nLet's play a game where I (computer) pick a number between 1 and 100 and you (human) try and guess it`
  );

  //Assign variable to store computer's secret number
  let compSecretNum = randomNum();

  //Keep track of number of guesses
  let guessCount = 1;

  //Ask user to guess the correct number
  let userGuess = await ask(
    `Ok, I am ready for you to make your first guess...>_`
  );
  //Sanitize -- making sure user is submitting an actual number
  while (isNaN(userGuess)) {
    userGuess = await ask(
      "Oops! Looks like you didn't enter a number. Please try again :) "
    );
  }

  //Turn user's guess into a number (because all user input comes in as a string)
  let userGuessInt = parseInt(userGuess);
  console.log(`This is Computer's Secret Number: ${compSecretNum}`); //TESTING WHAT COMPUTER SECRET NUMBER IS

  //While user guess is incorrect
  while (userGuessInt !== compSecretNum) {
    //And if user's guess is greater than computer's guess
    if (userGuessInt > compSecretNum) {
      //tell user to guess again, but higher this time
      userGuessInt = await ask(
        `Guess again! I'll give you a hint: my number is lower than ${userGuessInt}.>_`
      );
      //keep track of how many guesses have been made
      guessCount += 1;
      //If user's guess is lesser than computer's guess
    } else if (userGuessInt < compSecretNum) {
      //tell user to guess again, but lower this time
      userGuessInt = await ask(
        `Guess again! I'll give you a hint: my number is higher than ${userGuessInt}.>_`
      );
      //keep track of how many guesses have been made
      guessCount += 1;
    }
  }

  //if user's guess is correct
  if (parseInt(userGuessInt) === compSecretNum) {
    //send a congratulatory message and info about how many guesses it took
    console.log(
      `C O N G R A T U L A T I O N S! You guessed my number after only ${guessCount} guesses!`
    );
    //Ask the user if they want to play again
    let playAgain = await ask(
      `That was F U N! Do you want to play again? Type "Yes" or "No"?>_`
    );
    //If "yes" start the game again
    if (playAgain.toLowerCase() === "yes") {
      return start();
      //If not, exit the program
    } else {
      //exits the program
      process.exit();
    }
  }
}
