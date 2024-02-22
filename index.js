// require declarations - BEGIN
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// require declarations - END


// Constants for output - BEGIN
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
// Constants for output - BEGIN


// Array that holds manager, engineer(s), intern(s) after user input
let teamMembersArray = []; 


// Declare array of questions for Manager
const addManager = () => {

    return inquirer.prompt([
        {
            // Prompt Manager's Name for input
            name: 'name',
            type: 'input',
            message: 'What is the name of Manager?',
            validate: input => { 
                if (!input) {
                    return "Please enter the name of Manager.";
                }  
                return true;
            }
        },

        {
            // Prompt Manager's Employee ID for input
            name: 'employeeId',
            type: 'input',
            message: 'Employee ID:?',
            validate: input => { 
                if (!input) {
                    return "Please enter the Manager's Employee ID.";
                } 
                return true;
            }
        },

        {
            // Prompt Manager's Email Address for input
            name: 'emailAddress',
            type: 'input',
            message: 'Email Address:?',
            validate: input => { 
                if (!input) {
                    return "Please enter the Manager's email address.";
                }
                return validateEmail(input);
            }
        },

        {
            // Prompt Manager's Office Number for input
            name: 'officeNumber',
            type: 'input',
            message: 'Office Number:?',
            validate: input => { 
                if (!input) {
                    return "Please enter the Manager's Office Number.";
                }
                return true;
            }
        },

    ]).then(answers => new Manager(answers.name, answers.employeeId, answers.emailAddress, answers.officeNumber));
};



// Display menu for user to add one or more Engineer / Intern
function showMenu() {
    console.log("\nWelcome to the Command Prompt Menu:");
    inquirer.prompt([
        {
            name: 'option',
            type: 'list',
            message: 'Select an option:',
            choices: [
                'Add Engineer',
                'Add Intern',
                'Exit'
            ]
        }
    ]).then(({ option }) => {
        switch (option) {
            case 'Add Engineer':
                    addEngineer().then(engineer => {
                    console.log("Engineer Object:", engineer);
                    teamMembersArray.push(engineer);
                    showMenu();
                });
                break;

            case 'Add Intern':
                    addIntern().then(intern => {
                    console.log("Intern Object:", intern);
                    teamMembersArray.push(intern);
                    showMenu();
                });
                break;

            case 'Exit':
                // Pass array to render function
                let outputHTML=render(teamMembersArray);

                // If output path does not exist then create it
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
                }

                // Write output HTML file
                writeToFile(outputPath, outputHTML);    
                console.log("Exiting...");
                break;
        }
    });
}


// Declare array of questions for Engineer
const addEngineer = () => {

    return inquirer.prompt([
        {
            // Prompt Engineer's Name for input
            name: 'name',
            type: 'input',
            message: 'What is the name of Engineer?',
            validate: input => { 
                if (!input) {
                    return "Please enter the name of Engineer.";
                }  
                return true;
            }
        },

        {
            // Prompt Engineer's Employee ID for input
            name: 'employeeId',
            type: 'input',
            message: 'Employee ID:?',
            validate: input => { 
                if (!input) {
                    return "Please enter Engineer's Employee ID.";
                }  
                return true;
            }
        },

        {
            // Prompt Engineer's Email Address for input
            name: 'emailAddress',
            type: 'input',
            message: 'Email Address:?',
            validate: input => { 
                if (!input) {
                    return "Please enter the Engineer's email address.";
                }
                return validateEmail(input);
            }
        },

        {
            // Prompt Engineer's Git Hub for input
            name: 'gitHub',
            type: 'input',
            message: 'Git Hub:?',
            validate: input => { 
                if (!input) {
                    return "Please enter the Engineer's GitHub.";
                }  
                return true;
            }
        },

    ]).then(answers => new Engineer(answers.name, answers.employeeId, answers.emailAddress, answers.gitHub));
};


// Declare array of questions for Intern
const addIntern = () => {

    return inquirer.prompt([
        {
            // Prompt Intern's Name for input
            name: 'name',
            type: 'input',
            message: 'What is the name of Intern?',
            validate: input => { 
                if (!input) {
                    return "Please enter the name of Intern.";
                }  
                return true;
            }
        },

        {
            // Prompt Intern's Employee ID for input
            name: 'employeeId',
            type: 'input',
            message: 'Employee ID:?',
            validate: input => { 
                if (!input) {
                    return "Please enter the Intern's Employee ID.";
                }  
                return true;
            }
        },

        {
            // Prompt Intern's Email Address for input
            name: 'emailAddress',
            type: 'input',
            message: 'Email Address:?',
            validate: input => { 
                if (!input) {
                    return "Please enter the Intern's email address.";
                }
                return validateEmail(input);
            }
        },

        {
            // Prompt Intern's School for input
            name: 'school',
            type: 'input',
            message: 'School:?',
            validate: input => { 
                if (!input) {
                    return "Please enter the Intern's School.";
                }  
                return true;
            }
        },

    ]).then(answers => new Intern(answers.name, answers.employeeId, answers.emailAddress, answers.school));
};



// Function to validate email addresses
function validateEmail(emailAddress) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
        return 'Please enter a valid email address.';
    }
    return true;
}


// Function to write output to file
function writeToFile(fileName, data) {

    // Output file
    fs.writeFile(fileName, data, err => {

        // log any errors
        if (err) {
            console.error(err);
        } else {
            console.log(`'${fileName}' has been created successfully`)
        }
    });
}




// entry function that will be called first. See below call.
function main() {

    addManager().then(manager => {
         console.log("Manager Object:", manager);
         teamMembersArray.push(manager);
         showMenu();
    });
}


// entry function call.
main();