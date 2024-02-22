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
const createManager = () => {

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


// Declare array of questions for Engineer
const createEngineer = () => {

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
            // Prompt Manager's Office Number for input
            name: 'gitHub',
            type: 'input',
            message: 'Git Hub: ?',
            validate: inputTitle => { return validateMandatoryDataInput(inputTitle, "Git Hub") }
        },

    ]).then(answers => new Engineer(answers.name, answers.employeeId, answers.emailAddress, answers.gitHub));
};



function validateMandatoryDataInput(inputData, fieldName) {
    if (inputData) {
        return true;
    } else {
        console.log(`FAILED VALIDATION! - ${fieldName} is a mandatory field.`);
        return false;
    }
}




// entry function that will be called first. See below call.
function main() {
    //questions()

    // createManager().then(manager => {
    //     console.log("Manager Object:", manager);
    // });
    
    createEngineer().then(engineer => {
        console.log("Engineer Object:", engineer);
    });

}


// entry function call.
main();