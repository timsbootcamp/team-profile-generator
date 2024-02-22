const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//const inquirer = require("inquirer");
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


