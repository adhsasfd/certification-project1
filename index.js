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


// Creates a new quiz and sets it as the current quiz.

function createQuiz() {
  // Prompts the user to enter a quiz name.
  const quizName = prompt("Create a Quiz name: ");
  // Creates a new quiz object with the given name and an empty questions array.
  const newQuiz = { 
    name: quizName,
    questions: [],
  };
  // Adds the new quiz to the list of quizzes.
  quizList.push(newQuiz);
  // Sets the current quiz to the newly created quiz.
  currentQuiz = newQuiz;
  // Logs a message indicating that the quiz was created.
  console.log(`Quiz "${quizName}" is created.`);
  // Opens the question editor for the newly created quiz.
  editQuestions();
}



// Edits an existing quiz with the given name.
function editQuiz() {
  // Prompts the user to enter the name of the quiz they want to edit.
      const quizName = prompt("Put the Quiz name that you want to edit: ");

  // Iterates through the list of quizzes to find the quiz with the given name.
  let foundQuiz = null;
  for (let i = 0; i < quizList.length; i++) {
     if (quizList[i].name === quizName) {
      foundQuiz = quizList[i];
        break;
    }
  }

  // If no quiz with the given name is found, displays an error message and returns.
    if (!foundQuiz) {
    console.log(`Quiz "${quizName}" does not exist.`);
       return;
  }
// Sets the current quiz to the found quiz.
      currentQuiz = foundQuiz;
  // Opens the question editor for the found quiz.
  editQuestions();

}
// This function allows users to manage questions in a quiz or similar application
function editQuestions() {
  // Loop continuously until the user exits
        while (true) {
      // Display a menu with options for adding, editing, deleting questions, or finishing
    
      console.log(`  
      1. Add question
      2. Edit question
      3. Delete question
      4. Finish editing question (or press 'q' to quit)
    `);

    // Prompt the user to enter an option and convert it to lowercase for case-insensitive matching. Explains that the user's input is stored in the option variable and converted to lowercase.
       const option = prompt().toLowerCase();

  // Use a switch statement to handle different user choices
          switch (option) { //Introduces the switch statement that executes different code blocks based on the user's choice.
         case "1": // Call the addQuestion function (implementation not shown here) to add a new question
          addQuestion(); 
          break;//Explains the purpose of the break statement, which exits the current case block.

            case "2": // Call the editQuestion function (implementation not shown here) to edit an existing question
          editQuestion();
          break;

           case "3":// Call the deleteQuestion function (implementation not shown here) to remove a question
          deleteQuestion();
          break;

            case "4":// Exit the editing loop and return to the main menu (implementation not shown in this code)
          console.log("Finish editing Question.");//the message displayed when the user finishes editing.
          mainMenu();//Indicates that the code calls another function for the main menu.
            return; //Explains that the return statement exits the editQuestions function.

           case "q":// Terminate the program gracefully if the user enters 'q'
          console.log("**Game Ended**");
          process.exit(0); // Terminate the process gracefully.this line terminates the program with an exit code of 0.

             default:// Handle invalid input by displaying an error message and looping back to the menu.
          console.log("Invalid Input. Please try again.");//Explains the error message displayed for invalid input.
          editQuestions();// In the default case, the function calls itself recursively to restart the menu and prompt for a valid option.
         }
    }
  }
  
  
// This function adds a new question to the quiz. describes the overall purpose of the addQuestion function.
function addQuestion() {
  // Prompt the user to enter the question text. Explains that the user's input for the question text is stored in the questionText variable.
    const questionText = prompt("Write a question: ");
       const answerOptions = [];//Initializes an empty array to store answer options.
     let answerCount = parseInt(prompt("Write the numbers of answers: "));// Prompt the user to enter the number of answers (between 1 and 4). Prompts the user for the number of answers and stores it in the answerCount variable after parsing it to an integer.
   while (answerCount < 1 || answerCount > 4) {
      answerCount = parseInt(prompt("The numbers of answers are between one and four. Please try again: "));
         }//A loop that ensures the number of answers is between 1 and 4.

// Loop through each answer and prompt the user to enter the text. A loop that iterates through the number of answers and prompts the user to enter each one.
   for (let i = 0; i < answerCount; i++) {
     answerOptions.push(prompt(`Write the answer number ${i + 1}: `));
       }
// Prompts the user for the number of the correct answer and stores it in the correctAnswer variable after adjusting for the 0-based index.In JavaScript, arrays are indexed from 0.This means the first element is at index 0, the second at index 1, and so on.
const correctAnswer = parseInt(prompt("Put the number of correct answer: ")) - 1;

//Prompts the user for the point value of the question and stores it in the point variable
   const point = parseInt(prompt("Put the point of this question: "));

//Creates a new question object using the collected information.
const question = {
text: questionText,
answerOptions,
correctAnswer,
point, 
};

// Find the index of the current quiz in the quizList.It is to find the current quiz index
    const currentQuizIndex = findQuizIndex(currentQuiz.name);

// Add the new question to the questions array of the current quiz in quizList (explains that the code to add the question to the quiz list)
        quizList[currentQuizIndex].questions.push(question);


// Display a message indicating that the question was added
    console.log("Question added successfully."); 
}





// This function edits an existing question in the quiz
function editQuestion() {
  // Prompt the user to enter the index of the question they want to edit (starting from 1). Prompts the user for the index of the question to edit and stores it in the questionIndex variable after adjusting for the 0-based index.
    const questionIndex = parseInt(prompt("Enter the number of question you want to edit: ")) - 1;
  
    // Checks if the entered index is valid and displays an error message if it's not.
    if (questionIndex < 0 || questionIndex >= currentQuiz.questions.length) {
      console.log("Invalid question number. Please try again.");
      return;
    }
  
    // Get the question at the specified index
    const question = currentQuiz.questions[questionIndex];

    // Prompts the user to edit the question text and updates the object property.
       question.text = prompt("Edit the question text: ", question.text);

  // Loop through each answer option and prompt the user to edit it
    for (let i = 0; i < question.answerOptions.length; i++) {
      question.answerOptions[i] = prompt(`Edit answer number ${i + 1}: `, question.answerOptions[i]);
    }
  

       // Prompt the user to edit the number of the correct answer (index starts from 0). Prompts the user to edit the number of the correct answer and updates the object property after adjusting for the 0-based index.
    question.correctAnswer = parseInt(prompt("Edit the number of the correct answer: ", question.correctAnswer)) - 1;
  
  
// Find the index of the current quiz in the quizList
    const currentQuizIndex = findQuizIndex(currentQuiz.name);

// Update the question object in the questions array of the current quiz in quizList
    quizList[currentQuizIndex].questions[questionIndex] = question;

// Display a message indicating that the question was edited
     console.log("Question edited successfully!"); 
        }


        // This function deletes a question from the quiz
  function deleteQuestion() {
    //// Prompt the user to enter the index of the question to delete (starting from 1).Prompts the user for the index of the question to delete and stores it in the questionIndex variable after adjusting for the 0-based index.
    const questionIndex = parseInt(prompt("Enter the number of the question to delete: ")) - 1;
    if (questionIndex < 0 || questionIndex >= currentQuiz.questions.length) {
      console.log("Invalid question number. Please try again.");
      return;
    }//Checks if the entered index is valid and displays an error message if it's not.
  
    // Prompt the user for confirmation before deleting the question
    const confirmation = prompt("Are you sure you want to delete this question? (y/n): ");
    // Delete the question if the user confirms
    if (confirmation === "y") {
      // Find the index of the current quiz in the quizList 
      const currentQuizIndex = findQuizIndex(currentQuiz.name);
  
      // Delete the question from the questions array of the current quiz in quizList
      quizList[currentQuizIndex].questions.splice(questionIndex, 1);

  // Display a message indicating that the question was deleted
      console.log("Question deleted successfully!"); 
    } else {
      console.log("Question deletion cancelled.");
    }
  } 
//The .splice(questionIndex, 1) part applies the splice method to the questions array within the current quiz object.
//splice is a built-in JavaScript function that modifies an array by removing elements.
//The first argument (questionIndex) specifies the starting index at which to delete elements.
//The second argument (1) indicates the number of elements to remove. In this case, it only removes one element.


// This function finds the index of a quiz in the quizList by its name 
function findQuizIndex(quizName) {
  // Find the index of the quiz with the matching name in quizList. Uses the findIndex method to find the index of the quiz with the matching name in the quizList array.
  return quizList.findIndex((quiz) => quiz.name === quizName);
}

//(quiz) => quiz.name === quizName: This part defines an anonymous callback function (also called an arrow function) that findIndex uses to evaluate each element (quiz) in the quizList array.
//quiz: This parameter represents each element (quiz object) that findIndex iterates through in the quizList array.
//quiz.name === quizName: This is the test condition within the callback function. It checks if the name property of the current quiz object (quiz) matches the value of the quizName argument passed to the findQuizIndex function.
//4. Returning the Index://return ...: This line returns the value obtained from the findIndex method.
//If a quiz is found that matches the quizName, findIndex returns the index of that quiz within the quizList array.
//If no matching quiz is found, findIndex returns -1.

function deleteQuizFromFile(quizName) {
  // **Reads the JSON file containing the quizzes** This line reads the "quiz.json" file and stores its contents in the data variable.
   fs.readFile("quiz.json", (err, data) => {
     // **Checks for errors while reading the file**:This line checks if there were any errors during the file read operation and displays an error message if necessary.
     if (err) {
       console.error(`Error reading file: ${err.message}`);
       return;// Exit the function if an error occurs
     }
 
   // **Parses the JSON string into a JavaScript object**This line converts the JSON string from the file into a JavaScript object named jsonData.
     const jsonData = JSON.parse(data);
 
     // **Finds the index of the quiz with the matching name**This line uses the findIndex method to find the index of the quiz with the matching quizName in the jsonData array.
     const quizIndex = jsonData.findIndex((quiz) => quiz.name === quizName);
 
     // **Checks if the quiz was found**This line checks if the quiz was found and displays an error message if it wasn't.
     if (quizIndex === -1) {
       console.error(`Quiz "${quizName}" does not exist.`);
       return;// Exit the function if the quiz was not found
     }
 
     // **Deletes the quiz from the jsonData array at the specified index**This line removes the quiz from the jsonData array at the specified index.
     jsonData.splice(quizIndex, 1);

     // **Creates a new array containing only the name and questions properties of each quiz object**Creates a new array: This line creates a new array named updatedQuizList containing only the name and questions properties of each quiz object in jsonData.
   const updatedQuizList = jsonData.map((quizData) => ({
     name: quizData.name,
     questions: quizData.questions,
   }));

   // **Writes the updated quiz list to the JSON file**This line writes the updated quiz list back to the "quiz.json" file.
     fs.writeFile("quiz.json", JSON.stringify(jsonData, null, 2), (err) => {
       if (err) {
         console.error(`Error writing file: ${err.message}`);//This line checks for any errors during the file write operation and displays an error message if necessary.
         return;// Exit the function if an error occurs
       
       }
       
 // **Displays a message indicating that the quiz was deleted**//This line displays a message indicating that the quiz was deleted successfully.
       console.log(`Quiz "${quizName}" deleted from JSON file.`);
       mainMenu(); // **Calls the mainMenu function to return to the main menu.This line calls the mainMenu function to return the user to the main menu of the application.
     });
   });
 } 




 function playQuiz() {
  // **Gets the quiz name from the user**Prompts the user to enter the name of the quiz they want to play.
  const quizName = prompt("Write the quiz name you want to play: ");

  // **Finds the quiz with the matching name**Finds the quiz with the matching name in the quizList array.
const selectedQuiz = quizList.find((quiz) => quiz.name === quizName);

  // **Displays an error message if the quiz was not found**Displays an error message if the quiz was not found.
  if (!selectedQuiz) {
    console.log(`Quiz "${quizName}"does not exist.`);
    return;
  }

 // **Initializes the score** Initializes the score variable to 0.
 let score = 0;
 // **Iterates through each question in the selected quiz**Iterates through each question in the selected quiz.
for (const question of selectedQuiz.questions) {

 // **Initializes the answer**Initializes the answer variable to an empty string.
 let answer = "";


// **Loops until the user enters a valid answer**Loops until the user enters a valid answer number (1-4).
while (!answer) {
  //**Displays the question and answer options**Displays the question text and answer options for the current question.
  console.log(question.text);

  for (let i = 0; i < question.answerOptions.length; i++) {
    console.log(`${i + 1}. ${question.answerOptions[i]}`);
  }

// **Gets the user's answer**Prompts the user to enter the number of their answer.
  const input = prompt("put the number of your answer: ");

// **Validates the user's answer**Validates the user's answer and stores it in the answer variable.
  if (/[1-4]/.test(input)) {
    answer = question.answerOptions[parseInt(input) - 1];
  } else {
    console.log("The number does not exist. Please try agian.");
  }
}////****This code snippet ensures the user enters a valid answer number (1-4) for the current question. It displays the question and answer options, prompts for user input, validates the input, and stores the chosen answer if valid. If the input is invalid, it displays an error message and repeats the loop until a valid answer is provided


// **Displays the user's answer**Displays the user's answer to the console.
console.log(`\n**User's answer:** ${answer}`); 

// **Checks if the answer is correct**Checks if the user's answer is correct and updates the score accordingly.
if (answer === question.answerOptions[question.correctAnswer]) {
  score += question.point; 
  console.log(`**Correct answer! (Earned points: ${question.point})**`);
} else {
  console.log("**It's wrong answer.**");
}
}

// **Updates the quiz score**Updates the score property of the selected quiz object.
selectedQuiz.score = score;

// **Updates the highest score**Updates the highestScore property of the selected quiz object.
if (!selectedQuiz.highestScore || score > selectedQuiz.highestScore) {
selectedQuiz.highestScore = score;
}
// **Displays the quiz result and highest score**Displays the quiz result and highest score to the console.
console.log(`Quiz "${quizName}" Result: ${score} / ${selectedQuiz.questions.length}`);
console.log(`Highest score: ${selectedQuiz.highestScore}`);

// **Returns to the main menu** Calls the mainMenu function
mainMenu();


}

function saveQuizToFile() {
  // **Gets the file name from the user**Prompts the user to enter the file name for saving the quiz data. The default filename is "quiz.json" if the user leaves it blank.
  const fileName = prompt("Write the file name (example: myQuiz.json): ") || "quiz.json";

  // **Converts the quiz list to a JSON string**Uses the JSON.stringify function to convert the quizList object (containing all quizzes) into a JSON string. The null parameter indicates that no replacer function is used, and the 2 parameter specifies 2 spaces for indentation to improve readability of the generated JSON.
  const jsonData = JSON.stringify(quizList, null, 2);  // jsonData holds the string representation of the quiz list converted to JSON format.

  // **Writes the JSON string to a file**Uses the fs.writeFile function to write the generated JSON string to a file with the specified name (fileName).

  fs.writeFile(fileName, jsonData, (err) => {
    if (err) { //Checks for any errors during the file writing process. If an error occurs, an error message is displayed to the console.


      console.error("Saving is not successful:", err.message);
      return;
    }

    console.log(`The quiz is successfully saved in file "${fileName}".`);//Success message: If the file is saved successfully, a message is displayed to the console indicating the file name and location.
    mainMenu();// Calls the mainMenu function to return to the main menu of the application.
  });
}



function loadQuizFromFile() {
  //**Gets the file name from the user** Prompts the user to enter the file name from which the quiz data should be loaded. The default filename is "quiz.json" if the user leaves it blank.
  const fileName = prompt("Write the file name you want to read from (example: myQuiz.json): ") || "quiz.json";

  //**Reads the file contents**Uses the fs.readFile function to read the contents of the specified file (fileName).


  fs.readFile(fileName, (err, data) => {
    if (err) {
      console.error(`File was not read: ${err.message}`);
      return; //Checks for any errors during the file reading process. If an error occurs, an error message is displayed to the console.
    }

//This code block uses a try-catch statement to handle potential errors during JSON parsing://Overall, this code snippet attempts to parse the loaded file as JSON. If successful, it adds the quizzes to the list and displays a success message. If an error occurs during parsing, it logs informative error messages and suggests checking the file format before continuing.
  // **Parses the JSON string**Uses the JSON.parse function to parse the loaded JSON data into a JavaScript object.
  try {//This line starts a try block. The code within this block will be executed first.
    const jsonData = JSON.parse(data);//This line attempts to parse the content of the data variable (which presumably holds the file contents) into a JavaScript object using JSON.parse.jsonData holds the parsed JavaScript object representing the loaded quiz data from the file.
    quizList.push(...jsonData);// **Adds the loaded quizzes to the quiz list**Uses the push method to add the parsed quiz objects to the existing quizList array.This line assumes jsonData is an array of quiz objects. It uses the spread operator (...) to unpack the array and add each individual quiz object to the quizList array. Essentially, it adds the loaded quizzes to the existing quiz list.
    console.log(`The quiz was successfully loaded from file "${fileName}".`);//Success message: If the file is loaded successfully, a success message is displayed. It executes only if the JSON parsing is successful. It prints a success message to the console indicating the loaded file name.


  } catch (error) {//This line starts a catch block. This block will only execute if an error occurs during the try block (during JSON parsing).
    console.error("JSON parsing failed:", error.message); // **Added error message**//This line, within the catch block, logs an error message to the console. It includes the generic message "JSON parsing failed" followed by the specific error message provided by the error.message property.
  console.log("Check the form of file.");//This line, within the catch block, suggests to the user that the error might be due to the file format being incorrect. It prompts them to check the file content to ensure it's valid JSON.
  return;//This line, within the catch block, stops the function execution after encountering the error and the messages are logged. The return statement exits the function.
  }

  mainMenu();//Returns to the main menu: Calls the mainMenu function to return to the main menu of the application.

         
});


}


start();//The start(); function plays a crucial role in establishing a clear entry point for your program, thereby enhancing its organization and execution flow. Here's how it contributes:





