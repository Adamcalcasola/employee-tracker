const inquirer = require('inquirer');

class Department {
    addDepartment() {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
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
    }

}
