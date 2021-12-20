const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2')
//const db = require('./db/connection');

const PORT = process.env.PORT || 3001;

// Creates connection to MySQL database
const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'p',
        database: 'company'
    },
    console.log('Connected to the company database.')
);

// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
// });

// Function to return a list of current department names
function getDepartments() {
    // let depts = [];
    const sql = `SELECT department_name FROM departments`;
    let depts = db.query(sql, (err, rows) => {
        if (err) throw err;
        //console.log(rows);
    })
    //console.log(depts);
    // depts = rows.map(each => each.department_name);
    // return depts;
}



// Function to Show All Departments
function viewDepartments() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
    })
}


// Function to Create and Add a new Department
function addDepartments() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department?',
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
        const sql = `INSERT INTO departments (department_name) VALUE (?)`;
        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log(`${body.department_name} department added!`);
            init();
        });
    })
}

// Function to Generate a list of all current Positions
function getRoles() {
    const sql = `SELECT title FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        return rows;
    })
}

// Function to display Roles
function viewRoles() {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
    })
};

// Function to add a new Role to the database
function addRoles() {
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
            name: 'department_id',
            message: 'What department does the new position belong to?',
            choices: ['1', '2', '3', '4', '5', '6']
        }
    ])
    .then(body => {
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
        const params = [body.title, body.salary, body.department_id];
        db.query(sql, params, (err, results) => {
            if (err) throw err;
            console.log(`${body.title} has been added!`);
            init();
        })    
    })
}

// Function to display Employees from database
function viewEmployees() {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init();
    })
}

// Function to add a new employee to the database
function addEmployees() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
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
            message: "What is the employee's last name?",
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
            name: 'role_id',
            message: "What is the employee's role?",
            choices: ['1', '2', '3', '4', '5', '6', '7']

        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            choices: ['1', '2', '3', '4', '5', '6']
        }
    ])
    .then(body => {
        const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
        const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
        db.query(sql, params, (err, results) => {
            if (err) throw err;
            console.log(`${body.first_name} ${body.last_name} has been added!`);
            init();
        })    
    })
}

// Function to update employee role
function updateEmployeeRole() {
    console.log('Feature under construction. Sorry');
    init();
    // return inquirer.prompt([
    //     {
    //         type: 'list',
    //         name: 'employee',
    //         message: "Which employee's role do you want to update",
    //         choices: []
    //     },
    //     {

    //     }
    // ])
}

// Function to initialized app
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
                    viewRoles();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Department':
                    addDepartments();
                    break;
                case 'Add Role':
                    addRoles();
                    break;
                case 'Add Employee':
                    addEmployees();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    console.log('Press CTRL C to Exit');
                    return;
            }
        })
    }
// }
//console.log(getDepartments());
init();