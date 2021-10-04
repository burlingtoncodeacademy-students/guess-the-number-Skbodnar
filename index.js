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
  let response = await ask(`Is your number ${randoGuess}\nEnter Yes or No>_`);

  // STORY 4: Modify your guess range

  //If the user says the guess is incorrect, then the computer asks if user's number is "higher" or "lower"
  while (response.toLowerCase() !== "yes") {
    /* I am attempting to sanitize this input to make sure user only is able to move 
    forward if they respond "yes" or "no", But I can't figure out how to 
    write the logic in such a way that they're able to move forward 
    after being prompted to try again. code attempt here:
    (response.toLowerCase() !== "yes" && response.toLowerCase() !== "no"){
      await ask(`Oops! Looks like you didn't enter "yes" or "no".\nPlease try again. Is your number ${randoGuess}\nEnter Yes or No>_`);
    }
    */
    response = await ask(
      `Is your number "higher" or "lower" than ${randoGuess}?>_`
    );

    let newGuess = response; //assigning new variable to keep track of where I am in the code

    // function if user's "secretNumber" is higher than the computer's guess. modHiRange stands for modified high range
    function modHiRange(min, max) {
      // assign variables to the new modified range
      min = randoGuess;
      max = 100;

      range = max - min + 1;
      return Math.floor((max + min) / 2); //use parseInt() to make it a number??
    }

    let hiRange = modHiRange(); //create a variable for modHiRange function to use in while loop

    //While user's guess is higher, computer generates a new number within that modified higher range
    /* Current code only loops through this once. I can't figure out how to keep looping until it guesses correctly */
    while (newGuess.toLowerCase() === "higher") {
      newGuess = await ask(
        `Is your number "higher" or "lower" or "equal" to ${hiRange}?>_`
      );
      if (newGuess.toLowerCase() === "equal") {
        console.log("Fantastic! Let's play again sometime!");
        process.exit();
      }
    }
    if (newGuess.toLowerCase() === "yes") {
      console.log("Fantastic! Let's play again sometime!");
      process.exit();
    }

    // Create function to use if secretNumber is lower than randoGuess. modLoRange stands for modified low range
    function modLoRange(min, max) {
      // reassign variables to min and max
      min = 1;
      max = randoGuess;

      range = max - min + 1;
      return Math.floor((max + min) / 2);
    }

    let loRange = modLoRange(); //create a variable for modLoRange function and use in while loop

    /*I want the while loop below to work in such a way that while user's guess is lower, the
    computer will generate a new number with a lower range. However, same issue as hiRange not looping. As code is written now
    it will stop generating new numbers once it fulfills this check, which it does right after
    user selects "lower". Maybe instead I should create a loop that states: While secretNumber !=== newGuess,
    ask if number is higher or lower. While secretNumber > newGuess  computer modifies guess in high range.
    While secretNumber < newGuess  computer modifies guess in low range
    */
    while (newGuess.toLowerCase() === "lower") {
      newGuess = await ask(
        `Is your number "higher" or "lower" or "equal" to ${loRange}?>_`
      );
      if (newGuess.toLowerCase() === "equal") {
        console.log("Fantastic! Let's play again sometime!");
        process.exit();
      }
    }
  }
  // When user submits "yes" computer responds with message
  if (response.toLowerCase() === "yes") {
    console.log("Great! I hope you play again sometime!");
    process.exit();
  }

  // Story 5: Make it Smarter
  /* Use equation--> math.floor((min + max)/2)


  // Story 6: Extend the Guess Range (User sets the high range so it could be any number greater than 1).
  /* Does that mean that user sets the max? 
  and if so would I set max as follows?:
  let max === secretNumber
  let min === 1 
  */

  // Story 7: Cheat Detector
  /* */

  // Story 8: Reverse the Game (working through the logic)
  // 1.computer generates a random number (using randomNum function and hides that from user)
  // 2.computer asks user to submit a number-guess and stores that variable
  // 3.computer checks to see if the user's number-guess is higher, lower, or equal to the computer's number
  // 4.Depending on the above, the computer informs the user of modifications that might be necessary for their next guess
  // 5.User is asked to modify their guess until they guess the computer's number correctly
  // 6.When the user guesses correctly, the computer offers a congratulatory message and exits the program.
}
