//-------------------------------Setup for Async Function
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//call function to start the game
guessTheNumber();

async function guessTheNumber() {
  //--------------------------------IceBox: The user determines which version of the game is played
  //Ask user if they want to play V1: Computer guesses the number or if they want to play V2: Human guesses the number
  let gameChoice = await ask(
    `\nLet's play a guess-the-number game. First you have to pick which game you want to play:\nIf you (human) want to think of a number and have me (computer) guess, type: v1. If you want me (computer) to pick a number and have you (human) guess, type: v2>_`
  );
  //--------------------------------if user types something else that's not v1 or v2
  while (
    gameChoice.toLowerCase() !== "v1" &&
    gameChoice.toLowerCase() !== "v2"
  ) {
    //User receives message that computer can't understand user's input and recommends they try again
    gameChoice = await ask(
      `I'm sorry, I don't know ${gameChoice}. Please try again.>_`
    );
  }

  //--------------------------------if the user wants to play the 1st version of the game
  if (gameChoice.toLowerCase() === "v1") {
    //run game with startV1() function
    startV1();
  }
  //--------------------------------if the user wants to play the 2nd version of the game
  else if (gameChoice.toLowerCase() === "v2") {
    //run game with startV2 function
    startV2();
  }
}

//--------------------------------Game V1 (computer guesses number)

async function startV1() {
  //--------------------------------FUNCTION: random number generator
  function randomNum() {
    let min = 1; //min is hardcoded at start
    let max = userMax; //userMax is determined by user
    let range = max - min + 1; //determines the range for the equation
    return Math.floor(Math.random() * range) + 1; //returns a randomly generated whole number within set range
  }
  //--------------------------------FUNCTION: updates guess within a dynamically set range
  function updateGuess(min, max) {
    return Math.floor((max - min) / 2) + min;
  }
  //--------------------------------STORY: Pick a number, any number

  //Create variable to store max number set by user
  let userMax = await ask(
    `\n In this game, you (human) will think of a number and have me (computer) guess.\nFirst, What is the maximum number you want to guess?>_`
  );
  //Create variable to store min number set by default
  let userMin = 1;

  //Sanitize -- making sure user is submitting an actual number
  while (isNaN(userMax)) {
    userMax = await ask(
      "Oops! Looks like you didn't enter a number. Please try again :)>_ "
    );
  }

  //Create variable to store user's secret number
  let secretNumber = await ask(
    `Great choice! It looks like you will be picking a number between 1 and ${userMax}.\n Now, it is time to submit your secret number. What is it?\nI won't peek, I promise...\n`
  );
  //Sanitize -- making sure user is submitting an actual number
  while (isNaN(secretNumber)) {
    secretNumber = await ask(
      "Oops! Looks like you didn't enter a number. Please try again :)>_"
    );
  }

  //-------------------------------STORY: Computer guesses incorrectly
  //Keep track of number of guesses
  let guessCount = 1;
  //Assign variable to randomNum function
  let randoGuess = randomNum();
  //Computer asks if randomly generated number matches user's number. Computer stores answer in variable: "response"
  let response = await ask(
    `Ok, now it's time for me to start guessing....\nIs your number ${randoGuess}\nEnter Yes or No>_`
  );

  //-------------------------------STORY: Modify your guess range to make smart guesses

  //while the user says the guess is incorrect, the computer asks if user's number is "higher" or "lower"
  while (response.toLowerCase() !== "yes") {
    //ask if it's higher or lower and store their response in the variable
    response = await ask(`Is it "higher" or "lower"?`);
    //assign that user response a more semantic variable
    let higherOrLower = response;
    //If user's guess is higher, computer generates a new number within that modified range
    if (higherOrLower.toLowerCase() === "higher") {
      //reassigning userMin to randoGuess + 1 for new range
      userMin = randoGuess + 1;
      //passing in userMin and userMax to updating function
      randoGuess = updateGuess(userMin, userMax);
      //reassigning response to bring us back to start of while loop
      response = await ask(`Is it ${randoGuess}?>_`);
      //Cheat Detector: if the max is less than the min (and it shouldn't be), then the user is lying
      if (userMax < userMin) {
        console.log(`You are lying!`);
        process.exit();
      }
      //add one every time computer makes another guess
      guessCount += 1;
    }
    //If user's guess is lower, computer generates a new number within that modified range
    if (higherOrLower.toLowerCase() === "lower") {
      //reassigning userMax to randoGuess - 1 for new range
      userMax = randoGuess - 1;
      //passing in userMin and userMax to updating function
      randoGuess = updateGuess(userMin, userMax);
      //reassigning response to bring us back to start of while loop
      response = await ask(`Is it ${randoGuess}?_>`);
      //cheat detector: if min is greater than the max (and it shouldn't be), then the user is lying
      if (userMin > userMax) {
        console.log(`You are lying!`);
        process.exit();
      }
      //add one every time computer makes another guess
      guessCount += 1;
    }
  }
  //-------------------------------STORY: Let the computer win
  //if user indicates that the computer guessed correctly, they receive a message of V I C T O T Y! along with the number of guesses that were made
  if (response.toLowerCase() === "yes") {
    console.log(
      `V I C T O R Y! I guessed your number after only ${guessCount} guesses!`
    );
    //Ask the user if they want to play again
    let playAgain = await ask(
      `That was F U N! Do you want to play again? Type "Yes" or "No"?>_`
    );
    //If "yes" start the game again
    if (playAgain.toLowerCase() === "yes") {
      return guessTheNumber();
      //If not, exit the program
    } else {
      //exits the program
      process.exit();
    }
  }
}

//--------------------------------Game V2 (human guesses number)
//calling reverse game function
async function startV2() {
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
      "Oops! Looks like you didn't enter a number. Please try again :)>_ "
    );
  }

  //Turn user's guess into a number (because all user input comes in as a string)
  let userGuessInt = parseInt(userGuess);
  console.log(`This is Computer's Secret Number: ${compSecretNum}`); //TESTING WHAT COMPUTER SECRET NUMBER IS

  //While user guess is incorrect
  while (parseInt(userGuessInt) !== compSecretNum) {
    //Sanitize -- making sure user is submitting an actual number
    while (isNaN(userGuessInt)) {
      userGuessInt = await ask(
        "Oops! Looks like you didn't enter a number. Please try again :)>_ "
      );
    }
    //And if user's guess is greater than computer's guess
    if (userGuessInt > compSecretNum) {
      //tell user to guess again, but higher this time
      userGuessInt = await ask(
        `Guess again! I'll give you a hint: my number is lower than ${userGuessInt}>_`
      );
      //keep track of how many guesses have been made
      guessCount += 1;
      //If user's guess is less than computer's guess
    } else if (userGuessInt < compSecretNum) {
      //tell user to guess again, but lower this time
      userGuessInt = await ask(
        `Guess again! I'll give you a hint: my number is higher than ${userGuessInt}>_`
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
      return guessTheNumber();
      //If not, exit the program
    } else {
      //exits the program
      process.exit();
    }
  }
}
