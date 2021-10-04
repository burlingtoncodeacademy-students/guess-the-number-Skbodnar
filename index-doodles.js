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
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  while (isNaN(secretNumber)) {
    //Sanitize -- making sure user is submitting an actual number
    secretNumber = await ask(
      "Oops! Looks like you didn't enter a number. Please try again :) "
    );
  }

  // STORY ONE: Pick a number any number

  // utilize randomNum function
  function randomNum() {
    let min = 1;
    let max = 100;

    let range = max - min + 1;
    return Math.floor(Math.random() * range) + 1;
  }
  // console.log(randomNum(1, 100));

  let randoGuess = randomNum();
  // console.log(randoGuess);

  // Story 2: Let the computer win -->The computer wins when user responds "yes"

  // Story 3: Computer guesses wrong
  // computer asks if randomly generated number matches user's number. Computer stores answer in variable: "response"
  let response = await ask(`Is your number ${randoGuess}\nEnter "yes" or "no">_`);
  if (response.lowerCase() === "no") {
    response = await ask(`Is your number ${randoGuess}\nEnter "yes" or "no">_`);
  }

  // STORY 4: Modify your guess range

  //If the user says the guess is incorrect, then the computer asks if user's number is "higher" or "lower"
  if (response.toLowerCase() !== "yes") {
    response = await ask(
      `Is your number "higher" or "lower" than ${randoGuess}?>_`
    );
  }
}
