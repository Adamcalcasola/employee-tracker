const inquirer = require('inquirer');
const Department = require('/Department');
const Employee = require('./Employee');
const Role = require('/Role');

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
                    'Update Employee Role'
                ]
            }
        ])
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