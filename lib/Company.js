const inquirer = require('inquirer');
const Department = require('/Department');
const Employee = require('./Employee');
const Role = require('/Role');

class Db {
    constructor(connection) {
        this.connection
    }
}

class Company {
    options() {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments', 
                    'View All Roles', 
                    'View All Employees', 
                    'Add Department', 
                    'Add Role', 
                    'Add Employee', 
                    'Update Employee Role',
                    'Exit'
                ]
            }
        ])
        .then(option => {
            switch(option.options) {
                case 'View All Departments':
                    console.log('A');
                case 'View All Roles':
                    console.log('B');
                case 'View All Employees':
                    console.log('C');
                case 'Add Department':
                    console.log('D');
                case 'Add Role':
                    console.log('E');
                case 'Add Employee':
                    console.log('F');
                case 'Update Employee Role':
                    console.log('G');
                case 'Exit':
                    console.log('H');
            }
        })
    }
    getDepartments() {

    }
    getRoles() {
        
    }
    getEmployees() {
        
    }
    addDepartment() {
        Department.addDepartment();

    }
    addRole() {

    }
    addEmployee() {

    }
    updateRole() {
        
    }
}