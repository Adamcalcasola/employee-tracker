const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2')
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;

// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
// });



function getDepartments() {
    let depts = [];
    const sql = `SELECT department_name FROM department`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        depts = rows.map(each => each.department_name);
    })
    return depts;
}



// Function to Show All Departments
function viewDepartments() {
    const sql = `SELECT id, department_name FROM department`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
    })
}


// Function to Create and Add a new Department
function addDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department you would like to add?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a department name!');
                    return false;
                }
            }
        }
    ])
    .then(body => {
        const params = [body.department_name];
        const sql = `INSERT INTO department (department_name) VALUE (?)`;
        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log(`${body.department_name} department added!`);
            init();
        });
    })
}

// Function to Generate a list of all current Positions
function getPositions() {
    const sql = `SELECT title FROM position`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        return rows;
    })
}

function viewPositions() {
    const sql = `SELECT position.*, department.department_name 
                FROM position
                JOIN department ON position.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
    })
};

function addPosition() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the position you would like to add?',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter a position title!');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary for the new position?',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter a salary!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department does the new position belong to?',
            choices: ['Finance', 'Engineering', 'Service', 'Manufacturing', 'Sales']
        }
    ])
    .then(body => {
        const departmentId = `SELECT id FROM department WHERE department_name = '${body.department}'`;
        db.query(departmentId, (err, row) => {
            if (err) throw err;
            console.log(row[0].id);
            const sql = 'INSERT INTO position (title, salary, department_id) VALUES (?,?,?)';
            const params = [body.title, body.salary, row[0].id];
            db.query(sql, params, (err, results) => {
                if (err) throw err;
                console.log(`${body.title} has been added!`);
                init();
            })
        })
    })
}

function viewEmployees() {
    const sql = `SELECT first_name, last_name FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
    })
}

function addEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: `What is the employee's first name?`,
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter a name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: `What is the employee's last name?`,
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter a name!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'position',
            message: `What position does the employee have?`,
            choices: ['Finance', 'Engineering', 'Service', 'Manufacturing', 'Sales']

        },
    ])
    .then(body => {

    })
}

function updateEmployeeRole() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: `Which employee's role would you like to update`,
            choices: []
        }
    ])
}

// class Company {
    function init() {
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
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewPositions();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addPosition();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    console.log('Good Bye!');
                    return;
            }
        })
    }
// }
console.log(getDepartments());
init();
