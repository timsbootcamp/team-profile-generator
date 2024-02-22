const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembersArray = []; 

// Test Data for Employee class
const emp = new Employee('Tim Anand', 1, 'timanand@gmail.com');

console.log(emp.getName()); 
console.log(emp.getId()); 
console.log(emp.getEmail()); 
console.log(emp.getRole()); 


// Test Data for Manager class
const manager = new Manager('Sarah', 2, 'sarahsmith@gmail.com', '51');

console.log(manager.getName()); 
console.log(manager.getId()); 
console.log(manager.getEmail()); 
console.log(manager.getOfficeNumber()); 
console.log(manager.getRole()); // 


// Test Data for Engineer class
const engineer = new Engineer('Peter Jones', 3, 'peterjones@gmail.com.com', 'pete');

console.log(engineer.getName()); 
console.log(engineer.getId()); 
console.log(engineer.getEmail()); 
console.log(engineer.getGithub());
console.log(engineer.getRole()); 


// Test Data for Intern class
const intern = new Intern('Tanya', 2, 'tanya@gmail.com', 'edX Online Bootcamp');

console.log(intern.getName());
console.log(intern.getId());
console.log(intern.getEmail());
console.log(intern.getSchool());
console.log(intern.getRole());



// Declare array of questions for Manager
const addManager = () => {

    return inquirer.prompt([
        {
            // Prompt Manager's Name for input
            name: 'name',
            type: 'input',
            message: 'What is the name of manager?',
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Manager's Name") }
        },

        {
            // Prompt Manager's Employee ID for input
            name: 'employeeId',
            type: 'input',
            message: 'Employee ID: ?',
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Employee ID") }
        },

        {
            // Prompt Manager's Email Address for input
            name: 'emailAddress',
            type: 'input',
            message: 'Email Address: ?',
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Email Address") }
        },

        {
            // Prompt Manager's Office Number for input
            name: 'officeNumber',
            type: 'input',
            message: 'Office Number: ?',
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Office Number") }
        },

    ]).then(answers => new Manager(answers.name, answers.employeeId, answers.emailAddress, answers.officeNumber));
};



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
                //console.log(teamMembersArray);
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
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Engineer's Name") }
        },

        {
            // Prompt Engineer's Employee ID for input
            name: 'employeeId',
            type: 'input',
            message: 'Employee ID: ?',
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Employee ID") }
        },

        {
            // Prompt Manager's Email Address for input
            name: 'emailAddress',
            type: 'input',
            message: 'Email Address: ?',
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Email Address") }
        },

        {
            // Prompt Manager's Git Hub for input
            name: 'gitHub',
            type: 'input',
            message: 'Git Hub: ?',
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Git Hub") }
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
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Intern's Name") }
        },

        {
            // Prompt Intern's Employee ID for input
            name: 'employeeId',
            type: 'input',
            message: 'Employee ID: ?',
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Employee ID") }
        },

        {
            // Prompt Intern's Email Address for input
            name: 'emailAddress',
            type: 'input',
            message: 'Email Address: ?',
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Email Address") }
        },

        {
            // Prompt Intern's School for input
            name: 'school',
            type: 'input',
            message: 'School: ?',
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "School") }
        },

    ]).then(answers => new Intern(answers.name, answers.employeeId, answers.emailAddress, answers.school));
};





function validateMandatoryDataInput(inputData, fieldName) {
    if (inputData) {
        return true;
    } else {
        console.log(`FAILED VALIDATION! - ${fieldName} is a mandatory field.`);
        return false;
    }
}


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