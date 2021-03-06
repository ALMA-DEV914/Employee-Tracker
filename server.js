// call the npm package to parse and validate answers on CLI
const inquirer = require('inquirer');
// call the database of all data
const mysql = require('mysql2');
const cTable = require('console.table');
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
                'Delete Department',
                'Delete Employee',
                'Delete Roles',
                'Update Employee Roles',
                'Update employee manager',
                'View Employee By Manager',
                'View Employee By Department',
                'View Department Utilization',
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

                case "Add Role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Delete Department":
                    deleteDepartment();
                    break;
                case "Delete Employee":
                    deleteEmployee();
                    break;
                case "Delete Role":
                    deleteRole();
                    break;
                case "Update employee manager":
                    updateManager()
                    break;
                case "View Employee By Manager":
                    viewEmployeeByManager()
                    break;
                case "View Employee By Department":
                    viewEmployeeByDepartment()
                    break;
                case "View Department Utilization":
                    viewDepartmentUtilization()
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
    const sql = `Select department.id as Department_id,
     department.name as Department_name from department`;
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
   const sql = `Select role.title as Job_title, role.salary as Salary , role.id as Role_id, dept.name as Department_name from Role left join department as dept on dept.id = role.department_id`;
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
    const sql = `Select employee.id as Employee_id,employee.first_name as First_name, employee.last_name as Last_name, role.title as Job_tittle, role.salary as Salary,dept.name as Department_Name,concat(employee2.first_name,"  ",employee2.last_name) as Manager_name from employee_tracker.employee as employee left join employee_tracker.employee as employee2 on employee2.id=employee.manager_id left join employee_tracker.Role as role on employee.role_id=role.id left join employee_tracker.department as dept on dept.id = role.department_id`;
    
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
function addRole(){
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
                    name: 'role',
                    message: 'Please add a role:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Please enter a salary:'
                },
                {
                    type: 'list',
                    name: 'department',
                    choices: departments,
                    message: 'Please select your department.'
                }
            ]);
        })
        // add the answers into the role table of data
        .then(answer => {
            console.log(answer);
            return connection.promise().query('INSERT INTO role SET ?', { title: answer.role, salary: answer.salary, department_id: answer.department});
        })
        .then(res => {
            console.log('Successfully added a new role!')
            categoryList();

        })
        .catch(err => {
            throw err
        });
};
//create function to select role
function selectRole() {
    return connection.promise().query("SELECT * FROM role")
        .then(res => {
            return res[0].map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            });
        });
};
//create function to select manager
function selectManager() {
    return connection.promise().query("SELECT * FROM employee")
        .then(res => {
            return res[0].map(manager => {
                return {
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id,
                }
            });
        });
    };
// create a function that will select the manager and add employee
async function addEmployee() {
    //declare the managers from select manager function result
    const managers = await selectManager();
    inquirer.prompt([
            {
                name: "firstname",
                type: "input",
                message: "Enter their first name "
            },
            {
                name: "lastname",
                type: "input",
                message: "Enter their last name "
            },
            {
                name: "role",
                type: "list",
                message: "What is their role? ",
                choices: await selectRole()
            },
            {
                name: "manager",
                type: "list",
                message: "Whats their managers name?",
                choices: managers
            }
        ]).then(function (res) {
            let roleId = res.role
            let managerId = res.manager
    
            console.log({managerId});
            connection.query("INSERT INTO Employee SET ?",
                {
                    first_name: res.firstname,
                    last_name: res.lastname,
                    manager_id: managerId,
                    role_id: roleId
                }, 
                function (err) {
                    if (err) throw err
                    console.table(res)
                    categoryList();
                });
            });
    };
    //create function that will update the role of employee
function updateEmployeeRole() {
        connection.promise().query('SELECT * FROM employee')
            .then((res) => {
                return res[0].map(employee => {
                    return {
                        name: employee.first_name,
                        value: employee.id
                    }
                });
            })
            //get all the employee list 
            .then(async (employeeList) => {
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeListId',
                        choices: employeeList,
                        message: 'Please select the employee you want to update a role:.'
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        choices: await selectRole(),
                        message: 'Please select the role.'
                    }
                ]);
            })
            //update the role of employee from user input
            .then(answer => {
                console.log(answer);
                return connection.promise().query("UPDATE employee SET  role_id = ? WHERE id = ?",
                        [
                        answer.roleId,
                        answer.employeeListId,
                        ],
                    );
                })
            .then(res => {
                // console.log(res);
                console.log('Successfully updated the employee role!')
                categoryList();
            })
             .catch(err => {
                throw err
            });
    };
    // create function to delete department by id
    function deleteDepartment() {
        connection.promise().query('SELECT * FROM Department')
            .then((res) => {
                // make the choice from department array
                return res[0].map(dept => {
                    return {
                        name: dept.name,
                        value: dept.id
                    }
                });
            })
            //promt user to select which department to delete from the lists of department
            .then((departments) => {
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'deptId',
                        choices: departments,
                        message: 'Please select the department you want to delete.'
                    }
                ]);
            })
            //return the answer and show the department table of data
            .then(answer => {
                console.log(answer);
                return connection.promise().query('DELETE FROM Department WHERE id = ?', answer.deptId);
            })
            .then(res => {
                // console.log(res);
                console.log('Department deleted successfully')
                categoryList();
            })
    
            .catch(err => {
                throw err
            });
    
    }
    //create function to delete employee
    function deleteEmployee() {
        connection.promise().query('SELECT * FROM employee')
            .then((res) => {
                // make the choices from dept array
                return res[0].map(emp => {
                    return {
                        name: emp.first_name,
                        value: emp.id
                    }
                })
            })
            //call the employee list as choices
            .then((employees) => {
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        choices: employees,
                        message: 'Please select the employee you want to delete.'
                    }
                ])
            })
            //Update the table of employee after deletion
            .then(answer => {
                console.log(answer);
                return connection.promise().query('DELETE FROM Employee WHERE id = ?', answer.employeeId);
    
            })
            .then(res => {
                // console.log(res);
                console.log('Employee deleted successfully')
                categoryList();
            })
    
            .catch(err => {
                throw err
            });
    
    };
// create function to delete role by title and id
    function deleteRole() {
        connection.promise().query('SELECT title, id FROM role')
            .then((res) => {
                // make the choice dept arr
                return res[0].map(roles => {
                    return {
                        name: roles.title,
                        value: roles.id
                    }
                });
            })
            //promt the role list by title and id 
            .then((employeeRoles) => {
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        choices: employeeRoles,
                        message: 'Please select the employee you want to delete.'
                    }
                ]);
            })
            //update the role table after deletion
            .then(answer => {
                console.log(answer);
                return connection.promise().query('DELETE FROM Role WHERE id = ?', answer.roleId);
            })
            .then(res => {
                // console.log(res);
                console.log('Role deleted successfully')
                categoryList();
            })
    
            .catch(err => {
                throw err
            });
    };
   // create function to update the manager 
    function updateManager() {
        connection.promise().query('SELECT *  FROM employee')
            .then((res) => {
                // make the choices from  dept array
                return res[0].map(employee => {
                    return {
                        name: employee.first_name,
                        value: employee.id
                    }
                });
            })
            //call the employee list and promt user which employee-manager they want to update
            .then(async (employeeList) => {
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeListId',
                        choices: employeeList,
                        message: 'Please select the employee you want to assign manager to:.'
                    },
                    {
                        type: 'list',
                        name: 'managerId',
                        choices: await selectManager(),
                        message: 'Please select the employee you want to make manager.'
                    }
                ]);
            })
            // Update the role of employee being assigned as manager
            .then(answer => {
                console.log(answer);
                return connection.promise().query("UPDATE employee SET  manager_id = ? WHERE id = ?",
                        [
                            answer.managerId,
                            answer.employeeListId,
                        ],
                    );
            })
            .then(res => {
                // console.log(res);
                console.log('Updated manager successfully')
                categoryList();
            })
    
            .catch(err => {
                throw err
            });
 };
    
 // create function to view employee by manager   
function viewEmployeeByManager() {
    connection.promise().query('SELECT *  FROM employee')
        .then((res) => {
            // make the choices from dept array
            return res[0].map(employee => {
                return {
                    name: employee.first_name,
                    value: employee.id
                }
            })
        })
        // sync all the employee that have the same manager
        .then(async (managerList) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'managerId',
                    choices: managerList,
                    message: 'Please select the manager you want to view employee by.'
                }
            ])
        })
        //return the table employees with the same manager id
        .then(answer => {
            console.log(answer);
            return connection.promise().query('SELECT * from Employee where manager_id=?',answer.managerId);

        })
        //return table of employee
        .then(res => {
            console.table(res[0])
            //call the category list function 
            categoryList();
        })

        .catch(err => {
            throw err
        });
}

// create function to view employee by department   
function viewEmployeeByDepartment() {
    connection.promise().query('SELECT *  FROM employee')
        .then((res) => {
            // make the choices from dept array
            return res[0].map(employee => {
                return {
                    name: employee.first_name,
                    value: employee.id
                }
            })
        })
        // sync all the employee that have the same department
        .then(async (departmentList) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'deptId',
                    choices: departmentList,
                    message: 'Please select the employee you want to view by department.'
                }
            ])
        })
        //return the table employees with the same dept id
        .then(answer => {
            console.log(answer);
            return connection.promise().query(`SELECT employee.id AS Employee_id, employee.first_name AS First_name, employee.last_name AS Last_name, manager_id as Manager_id, role_id AS Department_id FROM Employee where role_id =?`, answer.deptId);
           })
        //return table of employee
        .then(res => {
            console.table(res[0])
            //call the category list function 
            categoryList();
        })

        .catch(err => {
            throw err
        });
}

function viewDepartmentUtilization(){
    connection.promise().query('SELECT *  FROM department')
        .then((res) => {
            // make the choices from dept array
            return res[0].map(department => {
                return {
                    name: department.name,
                    value: department.id
                }
            })
       })
    // sync all the employee that have the same department
    .then(async (departmentList) => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'departmentId',
                choices: departmentList,
                message: 'View each department cost.'
            }
        ])
    })
    //return the table employees with the same dept id
    .then(answer => {
        console.log(answer);
        return connection.promise().query(`SELECT department.id AS Department_id, department.name As Department_name, SUM(role.salary) AS Utilization FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        GROUP BY department.id, department.name`, answer.departmentId);
       })
    //return table of employee
    .then(res => {
        console.table(res[0])
        //call the category list function 
        categoryList();
    })

    .catch(err => {
        throw err
    });
}

categoryList();

