// call the npm package to parse and validate answers on CLI
const inquirer = require('inquirer');
// call the database of all data
const mysql = require('mysql2');
//call the query for localhost PoRT connection
const connection = require('./db/connection');

// Create function for promts of category list
function categoryList() {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'option',
            choices: [
                'View all departments',
                'View all Roles',
                'View all employees',
                'Add department',
                'Add Roles',
                'Add Employees',
                'Delete Departments',
                'Delete Employee',
                'Delete Roles',
                'Update Employee Roles',
                'Update employee manager',
                'View Employee By Manager',
                'Exit'
            ]

        }).then(answer => {
         // call the function that matches the user options or selections
            switch (answer.option) {
                case "View all departments":
                    viewAllDepartments();
                    break;

                case "View all Roles":
                    viewAllRoles();
                    break;

                case "View all employees":
                    viewAllEmployees();
                    break;

                case "Add department":
                    addDepartment();
                    break;

                case "Add Roles":
                    addRoles();
                    break;

                case "Add Employees":
                    addEmployee();
                    break;

                case "Update Employee Roles":
                    updateEmployeeRole();
                    break;

                case "Delete Departments":
                    deleteDepartment();
                    break;
                case "Delete Employee":
                    deleteEmployee();
                    break;
                case "Delete Roles":
                    deleteRole();
                    break;
                case "Update employee manager":
                    updateManager()
                    break;
                case "View Employee By Manager":
                    viewEmployeeByManager()
                    break;
                case "Exit":
                    connection.end();
                    console.log('Have a good day');
                    break;
            }
        });
};
// Create function to view or print the table for all department
function viewAllDepartments() {
    // select the data of table department
    const sql = 'SELECT * FROM Department';
    connection.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
            //show the table of department
            console.table(res)
            //return the run lists
            categoryList();
        }
    );
};
//Create function to view the table roles
function viewAllRoles() {
   const sql = `Select role.title as Role_title, role.salary as Salary , dept.name as DepartmentName from Role role left join department as dept on dept.id = role.department_id`; 
 connection.query(sql, (err, res) => {
    if (err) {
        throw err;
          }
          //show the table Roles
        console.table(res)
        // return the run lists
        categoryList();
        }
    );
};
// Create function to view table of employees
function viewAllEmployees(){
    //Assign the next employee as the manager of the current employee
    const sql = `Select employee.id as EmployeeID, concat(employee.first_name,"  ",employee.last_name ) as EmployeeName , role.title as Job_tittle, role.salary as Salary,dept.name as Department_Name,concat(employee2.first_name,"  ",employee2.last_name) as ManagerName from employee_tracker.employee as employee left join employee_tracker.employee as employee2 on employee2.id=employee.manager_id left join employee_tracker.Role as role on employee.role_id=role.id left join employee_tracker.department as dept on dept.id = role.department_id`;
    connection.query(
        sql, 
        (err, res) => {
            if (err) {
                throw err;
            }
            //show the table of employees
            console.table(res)
            //return the category lists
            categoryList();
        }
    );
};
// create a function to add a department
function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Please add a department name:'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the department id?'
        }

    ]).then(answer => {
        console.log(answer);
        connection.query('INSERT INTO department SET?', {id: answer.id, name: answer.department}, (err, res) => {
            if (err) throw err;
            console.log('Successfully added a new department')
            categoryList();
        });
    });
};
// Craete function to add role
function addRoles(){
    // query the department data
    connection.promise().query("SELECT * FROM Department")
        .then((res) => {
            // create a department array
            return res[0].map(department => {
                return {
                    name: department.name,
                    value: department.id
                }
            });
        })
        // promts the user for role information 
        .then((departments) => {
              return inquirer.prompt([
                {
                    type: 'input',
                    name: 'roles',
                    message: 'Please add a role:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Please enter a salary:'
                },
                {
                    type: 'list',
                    name: 'depts',
                    choices: departments,
                    message: 'Please select your department.'
                }
            ]);
        })
        // add the answers into the role table of data
        .then(answer => {
            console.log(answer);
            return connection.promise().query('INSERT INTO role SET ?', { title: answer.roles, salary: answer.salary, department_id: answer.departments});
        })
        .then(res => {
            console.log('Successfully added a new role!')
            categoryList();

        })
        .catch(err => {
            throw err
        });
};

function addEmployee(){}
function updateEmployeeRole(){}
function deleteDepartment(){}
function deleteEmployee(){}
function deleteRole(){}
function updateManager(){}
function viewEmployeeByManager(){}

categoryList();

