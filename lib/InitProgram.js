const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable  = require('console.table');
const Employee = require('./Employee');
const Department = require('./Department');
const { clear } = require('console');
//const {connectDB, viewAllEmployees, finishConnection, viewAllDepartments, viewAllRoles, addDepartment, findIndex, addRole, getDepartments, getDepartments1, arr} = require('../util/querySQL.js');

//global variable for connection
connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'Alejandro1210',
    database: 'db_company'
    });

let arrEmpl = [];
let arrRole = [];
let arrEmplMan = [];
let arrDep = [];


/////////////////// Class InitProgram  ////////////////////////

class InitProgram {

    connectDB(){
        connection.connect(err => {
            if (err) throw err;
          });
    };

    finishConnection() {
        connection.end();
    }

    viewAllQuery(str){
        const query =  connection.promise()
                        .query(str)
                        .then(([rows,fields]) => {
                            //console.log(rows);
                            console.log('\n');
                            console.table(rows);
                        })
                        .catch((err) =>  console.log(err));        
    };

    deleteQuery(str){
        const query =  connection.promise()
                        .query(str)
                        .then(([rows,fields]) => {
                            //console.log(rows);
                            console.log('\n');
                            console.log(' Register Deleted!\n');
                        })
                        .catch((err) =>  console.log(err));        
    };

    addDepartment(deptName) {
        const query = connection.query(
            'INSERT INTO department SET ?;',
            {
            name: deptName
            },
            function(err, res) {
            if (err) throw err;
            console.log(' Department Added!\n');
            //console.table(res);
            });
    };

    addRole(titleJob, salaryJob, deptId){
        const query = connection.query(
            'INSERT INTO role SET ?;',
            {
              title: titleJob,
              salary: salaryJob,
              departmentId: deptId
            },
            function(err, res) {
              if (err) throw err;
              console.log(' Role Added!\n');
            });
    };

    addEmployee(firstNameEmp, lastNameEmp, manager, role){
        //console.log(firstNameEmp+lastNameEmp+manager+role);
        if(manager)
        {
            const query =  connection.promise()
                        .query('INSERT INTO employee SET ?',
                        {
                            firstName: firstNameEmp,
                            lastName: lastNameEmp,
                            roleId: role,
                            managerId: manager
                        })
                        .then(([rows,fields]) => {
                            console.log(' Employee Added!\n');
                        })
                        .catch((err) =>  console.log(err));
        }
        else
        {
            const query =  connection.promise()
                        .query('INSERT INTO employee SET ?',
                        {
                            firstName: firstNameEmp,
                            lastName: lastNameEmp,
                            roleId: role,
                        })
                        .then(([rows,fields]) => {
                            console.log(' Employee Added!\n');
                        })
                        .catch((err) =>  console.log(err));
        }
        
    };

    updateEmployeeRole(idEmp, roleIdEmpl){

        const query =  connection.promise()
                        .query('UPDATE employee SET ? WHERE ?',
                        [{
                            roleId: roleIdEmpl
                        },
                        {
                            id: idEmp
                        }])
                        .then(([rows,fields]) => {
                            console.log(' Employee Role Updated!\n');
                        })
                        .catch((err) =>  console.log(err));
    };

    updateEmployeeManager(idEmp, managerIdEmp){

        if(managerIdEmp)
        {
            const query =  connection.promise()
                        .query('UPDATE employee SET ? WHERE ?',
                        [{
                            managerId: managerIdEmp
                        },
                        {
                            id: idEmp
                        }])
                        .then(([rows,fields]) => {
                            console.log(' Employee Role Updated!\n');
                        })
                        .catch((err) =>  console.log(err));
        }
            else{
                const query =  connection.promise()
                        .query('UPDATE employee SET ? WHERE ?',
                        [{
                            managerId: null
                        },
                        {
                            id: idEmp
                        }])
                        .then(([rows,fields]) => {
                            console.log(' Employee Role Updated!\n');
                        })
                        .catch((err) =>  console.log(err));
                    }
    };

    
    getArray(arr) {
        let result =[];
        //console.log(arr.length);
        for(let i=0; i < arr.length; i++)
            result.push(arr[i].name);
        return result;
    };

    findIndex(arr, str){
        for(let i=0; i<arr.length; i++)
            if(arr[i]===str)
                return (i+1);
    }

    getEmployDetail(){

        const query =  connection.promise().query('SELECT CONCAT(firstName, \' \', lastName) as name FROM employee;')
                        .then(([rows,fields]) => {
                            //console.log(rows);
                            arrEmpl = this.getArray(rows);
                            //console.log(arrEmpl);
                            return arrEmpl;
                        })
                        .catch((err) =>  console.log(err));
    };

    getDepartmentDetail(){

        const query =  connection.promise().query('SELECT name FROM department;')
                        .then(([rows,fields]) => {
                            //console.log(rows);
                            arrDep = this.getArray(rows);
                            //console.log(arrDep);
                            return arrDep;
                        })
                        .catch((err) =>  console.log(err));
    };

    getEmployDetailByManager(){

        const query =  connection.promise().query('SELECT CONCAT(firstName, \' \', lastName) as name FROM employee INNER JOIN (SELECT DISTINCT managerId FROM employee WHERE managerId IS NOT NULL) as  managers ON managers.managerId = employee.id;')
                        .then(([rows,fields]) => {
                            //console.log(rows);
                            arrEmplMan = this.getArray(rows);
                            //console.log(arrEmplMan);
                            return arrEmplMan;
                        })
                        .catch((err) =>  console.log(err));
    };


    getRoleDetail(){

        const query =  connection.promise().query('SELECT title as name FROM role;')
                        .then(([rows,fields]) => {
                            //console.log(rows);
                            arrRole = this.getArray(rows);
                            //console.log(arrRole);
                            return arrRole;
                        })
                        .catch((err) =>  console.log(err));
    };

    getPrintPresentation(){
        
        //console.clear()
        console.log(
            `
            =============================================
                    Employee tracker management App
            =============================================

            `
    );

    }

    
    //function to get manage the logic of the program
    getStart(){

        
        //connect to BD
        this.connectDB();

        //arr = this.getDepartments1();
        arrEmpl = this.getEmployDetail();
        arrRole = this.getRoleDetail();
        arrEmplMan = this.getEmployDetailByManager();
        arrDep = this.getDepartmentDetail();
        
        console.log(
            `
            *********************************************
                        Initializing Program
            *********************************************

            `);


        this.getPromptMenu();
      
    }

    //Method to get the information from user
    getPromptMenu(){

        this.getPrintPresentation();
        
        //Acceptance Criteria #1. Menu
        inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'confirmMenu',
            choices: ['View all Employees', 
                      'View all Employees by Department',               //Bonus #1
                      'View all Employees by Manager',                  //Bonus #2
                      'View all Departments',
                      'View all Roles',
                      'Add Department',
                      'Add Role',
                      'Add Employee',
                      'Update Employee Role',
                      'Update Employee Manager',                        //Bonus #3
                      'Delete Role',                                    //Bonus #4
                      'Delete Department',                              //Bonus #5
                      'Delete Employee',                                //Bonus #6
                      'Total Budget by Department',                           //Bonus #7
                      'Exit'                    
                    ]
        })
        .then(({ confirmMenu }) => {

            //Acceptance Criteria #4.
            if(confirmMenu === 'View all Employees')
            {
                const query = 'SELECT employee.id, firstName, lastName, title, salary, name as department FROM role LEFT JOIN department ON department.id = role.departmentId RIGHT JOIN employee ON employee.roleId = role.id;';
                this.viewAllQuery(query);
                this.getPromptMenu();
            }

             //Acceptance Criteria. Bonus #1
            if(confirmMenu === 'View all Employees by Department')
            {
                inquirer
                    .prompt(
                            {
                                type: 'list',
                                message: 'Select the Department',
                                name: 'confirmSearch',
                                choices: arrDep
                            })
                            .then(({confirmSearch}) => {
                                //getting the index of the pre-existing employees
                                const indexDept = this.findIndex(arrDep, confirmSearch);
                                const query = 'SELECT employee.id, firstName, lastName, title, salary, result1.name as department FROM role INNER JOIN (SELECT * FROM department WHERE id = '+indexDept+') as result1 ON result1.id = role.departmentId INNER JOIN employee ON employee.roleId = role.id;';
                                this.viewAllQuery(query);
                                this.getPromptMenu();
                            });
            }

            //Acceptance Criteria. Bonus #7
            if(confirmMenu === 'Total Budget by Department')
            {
                inquirer
                    .prompt(
                            {
                                type: 'list',
                                message: 'Select the Department',
                                name: 'confirmSearch',
                                choices: arrDep
                            })
                            .then(({confirmSearch}) => {
                                //getting the index of the pre-existing employees
                                const indexDept = this.findIndex(arrDep, confirmSearch);
                                const query = 'SELECT SUM(salary) AS '+confirmSearch+'_Total_Budget FROM role INNER JOIN (SELECT * FROM department WHERE id = '+indexDept+') as result1 ON result1.id = role.departmentId INNER JOIN employee ON employee.roleId = role.id;';
                                this.viewAllQuery(query);
                                this.getPromptMenu();
                            });
            }

            //Acceptance Criteria Bonus #2.
            if(confirmMenu === 'View all Employees by Manager')
            {
                //console.log('estoy pasando por aqui');
                    inquirer
                    .prompt(
                            {
                                type: 'list',
                                message: 'Select the Employee\'s Manager ',
                                name: 'confirmSearch',
                                choices: arrEmplMan
                            })
                            .then(({confirmSearch}) => {
                                //getting the index of the pre-existing employees
                                const indexEmployee = this.findIndex(arrEmpl, confirmSearch);
                                const query = 'SELECT result.id, firstName, lastName, title, salary, name as department FROM role LEFT JOIN department ON department.id = role.departmentId RIGHT JOIN (SELECT * FROM employee WHERE managerId = '+indexEmployee + ' ) as result ON result.roleId = role.id;';
                                this.viewAllQuery(query);
                                this.getPromptMenu();
                            });                
            } 

             //Acceptance Criteria #2.
             if(confirmMenu === 'View all Departments')
             {
                 const query = 'SELECT * FROM department';
                 this.viewAllQuery(query);
                 this.getPromptMenu();
             }

              //Acceptance Criteria #3.
              if(confirmMenu === 'View all Roles')
              {
                const query = 'SELECT role.id, title, salary, name as department FROM role LEFT JOIN department ON department.id = role.departmentId;';
                this.viewAllQuery(query);
                  this.getPromptMenu();
              }

              //Acceptance Criteria #5.
              if(confirmMenu === 'Add Department')
              {
                  //getting information from user
                  inquirer
                    .prompt(
                            {
                                type: 'input',
                                name: 'dept',
                                message: 'What is the Department\'s name? ',
                                validate: deptInput => {
                                    if (deptInput) {
                                        return true;
                                    } else {
                                        console.log('Please you must give the Department\'s Name! ');
                                        return false;
                                    }
                                }
                            })
                            .then(({dept}) => {
                                const department = new Department(dept);
                    
                                //calling the function to get prompt from Employees Data
                                this.addDepartment(department.getName());
                                arrDep = this.getDepartmentDetail();
                                this.getPromptMenu();                              
                            }); 
              }

              //Acceptance Criteria #6.
              if(confirmMenu === 'Add Role')
              {
                  
                  //getting information from user
                  inquirer
                    .prompt([
                            {
                                type: 'input',
                                name: 'title',
                                message: 'What is the Job Title\'s name? ',
                                validate: titletInput => {
                                    if (titletInput) {
                                        return true;
                                    } else {
                                        console.log('Please you must give the Job Title\'s Name! ');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'number',
                                name: 'salary',
                                message: 'What is the Salary for this Job? ',
                                validate: salarytInput => {
                                    if (salarytInput) {
                                        return true;
                                    } else {
                                        console.log('Please you must give the Salary for this Job ! ');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'list',
                                message: 'What department does belong to?',
                                name: 'confirmDept',
                                choices: arrDep
                            }
                        ])
                            .then( ({title, salary, confirmDept}) => {

                                //console.log(arr);
                                const indexDept = this.findIndex(arrDep, confirmDept);
                    
                                //calling the function to get prompt from Employees Data
                                this.addRole(title, salary, indexDept);
                                arrRole = this.getRoleDetail();
                                this.getPromptMenu();                              
                            }); 
              }

              //Acceptance Criteria #7.
              if(confirmMenu === 'Add Employee')
              {
                  
                  //getting information from user
                  inquirer
                    .prompt([
                            {
                                type: 'input',
                                name: 'firstName',
                                message: 'What is the Employee\'s First name? ',
                                validate: firstNameInput => {
                                    if (firstNameInput) {
                                        return true;
                                    } else {
                                        console.log('Please you must give the Employee\'s First name! ');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'input',
                                name: 'lastName',
                                message: 'What is the Employee\'s Last name? ',
                                validate: lastNametInput => {
                                    if (lastNametInput) {
                                        return true;
                                    } else {
                                        console.log('Please you must give the Employee\'s Last name! ');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'list',
                                message: 'Select the Employee\'s Role ',
                                name: 'confirmRole',
                                choices: arrRole
                            },
                            {
                                type: 'list',
                                message: 'Select the Employee\'s Manager ',
                                name: 'confirmEmployee',
                                choices: ['None', ...arrEmpl]
                            }
                        ])
                            .then( ({firstName, lastName, confirmRole, confirmEmployee}) => {

                                const employee = new Employee(firstName, lastName, confirmRole, confirmEmployee);
                                console.log(employee);
                                let indexEmployee = '';
                                if(employee.getManager() !== 'None')
                                    indexEmployee = this.findIndex(arrEmpl, employee.getManager());

                                const indexRole = this.findIndex(arrRole, employee.getJobTitle());
                    
                                //calling the function to add Employees Data
                                this.addEmployee(employee.getFirstName(), employee.getLastName(), indexEmployee, indexRole);  
                                arrEmpl = this.getEmployDetail();
                                arrEmplMan = this.getEmployDetailByManager();
                                this.getPromptMenu();                                                  
                            }); 
              }


              //Acceptance Criteria #8.
              if(confirmMenu === 'Update Employee Role')
              {
                  //getting information from user
                  inquirer
                    .prompt([
                            {
                                type: 'list',
                                message: 'What Employee would you like to change the Role?',
                                name: 'confirmEmployee',
                                choices: arrEmpl
                            },
                            {
                                type: 'list',
                                message: 'Select the Role to Assign?',
                                name: 'confirmRole',
                                choices: arrRole
                            }])
                            .then(({confirmEmployee, confirmRole}) => {
                                
                                //console.log(arr);
                                const indexEmployee = this.findIndex(arrEmpl, confirmEmployee);
                                const indexRole = this.findIndex(arrRole, confirmRole);
                    
                                //calling the function to get prompt from Employees Data
                                this.updateEmployeeRole(indexEmployee, indexRole);  
                                this.getPromptMenu();                                         
                            }); 
              }

              //Acceptance Criteria. Bonus #3
              if(confirmMenu === 'Update Employee Manager')
              {
                  //getting information from user
                  inquirer
                    .prompt([
                            {
                                type: 'list',
                                message: 'What Employee would you like to change the Manager?',
                                name: 'confirmEmployee',
                                choices: arrEmpl
                            },
                            {
                                type: 'list',
                                message: 'Select the new Manager?',
                                name: 'confirmManager',
                                choices: ['None', ...arrEmpl]
                            }])
                            .then(({confirmEmployee, confirmManager}) => {
                                
                                let indexManager = '';
                                if(confirmManager !== 'None')
                                    indexManager = this.findIndex(arrEmpl, confirmManager);

                                const indexEmployee = this.findIndex(arrEmpl, confirmEmployee);
                    
                                //calling the function to get prompt from Employees Data
                                this.updateEmployeeManager(indexEmployee, indexManager);  
                                this.getPromptMenu();                                         
                            }); 
              }

            //Acceptance Criteria. Bonus #6
            if(confirmMenu === 'Delete Employee')
            {
                //getting information from user
                inquirer
                  .prompt(
                          {
                              type: 'list',
                              message: 'What Employee would you like to Delete?',
                              name: 'confirmEmployee',
                              choices: arrEmpl
                          })
                          .then(({confirmEmployee}) => {
                              
                              const indexEmployee = this.findIndex(arrEmpl, confirmEmployee);
                              const query = 'DELETE FROM employee WHERE id ='+indexEmployee;
                              //calling the function to get prompt from Employees Data
                              this.deleteQuery(query);
                              arrRole = this.getRoleDetail();
                              arrEmpl = this.getEmployDetail();
                              arrDep = this.getDepartmentDetail();
                              arrEmplMan = this.getEmployDetailByManager();
                              this.getPromptMenu();                                         
                          }); 
            }

            //Acceptance Criteria. Bonus #4
            if(confirmMenu === 'Delete Role')
            {
                //getting information from user
                inquirer
                  .prompt(
                          {
                              type: 'list',
                              message: 'What Role would you like to Delete?',
                              name: 'confirmRole',
                              choices: arrRole
                          })
                          .then(({confirmRole}) => {
                              
                              const index = this.findIndex(arrRole, confirmRole);
                              const query = 'DELETE FROM role WHERE id ='+index;
                              //calling the function to get prompt from Employees Data
                              this.deleteQuery(query);
                              arrRole = this.getRoleDetail();
                              arrEmpl = this.getEmployDetail();
                              arrDep = this.getDepartmentDetail();
                              arrEmplMan = this.getEmployDetailByManager();  
                              this.getPromptMenu();                                         
                          }); 
            }

            //Acceptance Criteria. Bonus #5
            if(confirmMenu === 'Delete Department')
            {
                //getting information from user
                inquirer
                  .prompt(
                          {
                              type: 'list',
                              message: 'What Department would you like to Delete?',
                              name: 'confirmDept',
                              choices: arrDep
                          })
                          .then(({confirmDept}) => {
                              
                              const index = this.findIndex(arrDep, confirmDept);
                              const query = 'DELETE role, department FROM department INNER JOIN role ON department.id = role.departmentId WHERE department.id = '+index+';';
                              //calling the function to get prompt from Employees Data
                              this.deleteQuery(query);
                              arrRole = this.getRoleDetail();
                              arrEmpl = this.getEmployDetail();
                              arrDep = this.getDepartmentDetail();
                              arrEmplMan = this.getEmployDetailByManager();
                              this.getPromptMenu();                                         
                          }); 
            }

            if(confirmMenu === 'Exit')
            {
                this.finishConnection();
                //return;
            }

            //this.getPromptMenu();

        });

    }
}
////////////////////////////////////////////////////////////

module.exports = InitProgram;