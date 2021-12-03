const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes/departmentRoutes');

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

function viewAllDepartments() {
    const sql = 'SELECT * FROM Department';
    connection.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
            console.table(res)
            categoryList();
        }
    );
};

function viewAllRoles() {
   const sql = `Select role.title as Role_title, role.salary as Salary , dept.name as DepartmentName from Role role left join department as dept on dept.id = role.department_id`; 
 connection.query(sql, (err, res) => {
    if (err) {
        throw err;
          }
        console.table(res)
        categoryList();
        }
    );
};

function viewAllEmployees(){
    const sql = `Select employee.id as EmployeeID, concat(employee.first_name,"  ",employee.last_name ) as EmployeeName , role.title as Job_tittle, role.salary as Salary,dept.name as Department_Name,concat(employee2.first_name,"  ",employee2.last_name) as ManagerName from employee_tracker.employee as employee left join employee_tracker.employee as employee2 on employee2.id=employee.manager_id left join employee_tracker.Role as role on employee.role_id=role.id left join employee_tracker.department as dept on dept.id = role.department_id`;
    connection.query(
        sql, 
        (err, res) => {
            if (err) {
                throw err;
            }
            console.table(res)
            categoryList();
        }
        
    );
};




function addDepartment(){}
function addRoles(){}
function addEmployee(){}
function updateEmployeeRole(){}
function deleteDepartment(){}
function deleteEmployee(){}
function deleteRole(){}
function updateManager(){}
function viewEmployeeByManager(){}

categoryList();

