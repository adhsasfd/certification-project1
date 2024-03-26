// Imports
const prompt = require('prompt-sync')(); // Import prompt-sync module for user input
const fs = require('fs'); // Import fs module for file system operations

// Variable Declarations
const quizList = []; // Array to store the list of quizzes
let currentQuiz = null; // Variable to track the current quiz (null if no quiz is in progress)
let score = 0; // Variable to track the player's score
let highScore = 0; // Variable to track the player's highest score

// Functions
function start() {
  // Display a message indicating the start of the game
  console.log("Game starts.");

  // Display the main menu
  mainMenu();
}


function mainMenu() { //Defines a function named mainMenu with no parameters. This function handles displaying the main menu options to the user and processing their selection.
  console.log("**Main Menu**");//Prints the main menu title "Main Menu" to the console.
  console.log(` 
  1. Create Quiz 
  2. Edit Quiz 
  3. Delete Quiz
  4. Play Quiz
  5. Save Quiz to JSON file
  6. Load Quiz from JSON file
  7. End Game (when the input is "q")
  `); // Uses template literals (backticks) to create a multi-line string containing the menu options.
      //Option 1 allows the user to create a new quiz.Option 2 allows the user to edit an existing quiz.Option 3 allows the user to delete a quiz.
      //Option 4 allows the user to play a quiz.Option 5 allows the user to save the quiz list to a JSON file.Option 6 allows the user to load quizzes from a JSON file.Option 7 allows the user to end the game by entering "q".
  const option = prompt().toLowerCase();//Prompts the user to enter an option from the menu.//.toLowerCase(): Converts the user's input to lowercase for case-insensitive matching in the switch statement.
//Initiates a switch statement that evaluates the user's input (option) and executes the corresponding code block based on the selected option.
  switch (option) {
    case "1": //If the user entered "1", the createQuiz() function is called to initiate the quiz creation process.
      createQuiz();
      break;//Exits the current case block after executing createQuiz()
    case "2":
      editQuiz();//If the user entered "2", the editQuiz() function is called to handle editing an existing quiz.
      break;//Exits the current case block after executing editQuiz().
    case "3"://If the user entered "3", additional user input is prompted using prompt().
      deleteQuizFromFile(prompt("Write the name of Quiz you want to delete:"));// Calls the deleteQuizFromFile() function, passing the user-provided quiz name for deletion.
      break;//Exits the current case block after executing deleteQuizFromFile().
    case "4"://If the user entered "4", the playQuiz() function is called to start playing a quiz.
      playQuiz();
      break;// Exits the current case block after executing playQuiz().
    case "5"://If the user entered "5", the saveQuizToFile() function is called to save the quiz list to a JSON file.
    saveQuizToFile();
      break;//Exits the current case block after executing saveQuizToFile().
    case "6"://If the user entered "6", the loadQuizFromFile() function is called to load quizzes from a JSON file.
    loadQuizFromFile()
      break;//Exits the current case block after executing loadQuizFromFile().
    case "q"://If the user entered "q", the game ends.
      console.log("**End Game**");//Prints "End Game" message to the console.
      return;//Exits the mainMenu function, effectively ending the program loop.
    default://If the user's input doesn't match any valid option, an error message is displayed.
      console.log("Invalid Input. Please try again.");//Prints an error message prompting the user to re-enter a valid option.
      mainMenu();//Calls the mainMenu function again to re-display the menu options. This creates a loop that continues until the user enters a valid option or "q" to quit.
  }
}
