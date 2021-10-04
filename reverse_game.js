

// Story 8: Role Reversal

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
start();

async function start() {
  console.log(
    "Let's play a game where I (computer) make up a number between 1 and 50 and you (human) try to guess it."
  );
  let userGuess = await ask(
    "What is your first guess\n"
  );
  
  // computer generates a random number (using randomNum function and hides that from user)
  
  // computer asks user to submit a number-guess and stores that variable

  // computer checks to see if the user's number-guess is higher, lower, or equal to the computer's number

  // Depending on the above, the computer informs the user to modify their guess

  // User is asked to modify their guess until they guess the computer's number correctly

  // When the user guesses correctly, the computer offers a congratulatory message and exits the program

}