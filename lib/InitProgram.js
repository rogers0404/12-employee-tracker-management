const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable  = require('console.table');
const Employee = require('./Employee');
const Department = require('./Department');
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

let arr = [];


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

    viewAllEmployees(){
        const query = connection.query(
            'SELECT employee.id, firstName, lastName, title, salary, name as department FROM role LEFT JOIN department ON department.id = role.departmentId RIGHT JOIN employee ON employee.roleId = role.id;',
            function(err, res) {
              if (err) throw err;
              console.log('\n');
              console.table(res);
            });
    };

    
    viewAllDepartments() {
        const query = connection.query(
            'SELECT * FROM department;',
            function(err, res) {
            if (err) throw err;
            console.log('\n');
            console.table(res);
            });
    };

    viewAllRoles() {
        const query = connection.query(
            'SELECT role.id, title, salary, name as department FROM role LEFT JOIN department ON department.id = role.departmentId;',
            function(err, res) {
              if (err) throw err;
              console.log('\n');
              console.table(res);
            });
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

    getDepartments(){
        let arr = [];
        const query =  connection.query(
            'SELECT name FROM department;',
            function(err, res) {
            if (err) throw err;
            arr = this.getArray(res);
            return arr;
            });
            
    };

    getDepartments1(){

        const query =  connection.promise().query('SELECT name FROM department;')
                        .then(([rows,fields]) => {
                            //console.log(rows);
                            arr = this.getArray(rows);
                            //console.log(arr);
                            return arr;
                        })
                        .catch((err) =>  console.log(err));
    };


    getPrintPresentation(){
        
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
                      'Exit'                    
                    ]
        })
        .then(({ confirmMenu }) => {

            //Acceptance Criteria #4.
            if(confirmMenu === 'View all Employees')
            {
                this.viewAllEmployees();
                this.getPromptMenu();
            }

             //Acceptance Criteria #2.
             if(confirmMenu === 'View all Departments')
             {
                 this.viewAllDepartments();
                 this.getPromptMenu();
             }

              //Acceptance Criteria #3.
              if(confirmMenu === 'View all Roles')
              {
                  this.viewAllRoles();
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
                                this.getPromptMenu();                              
                            }); 
              }

              //Acceptance Criteria #6.
              if(confirmMenu === 'Add Role')
              {

                arr = this.getDepartments1();
                  
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
                                choices: arr
                            }
                        ])
                            .then( ({title, salary, confirmDept}) => {

                                //console.log(arr);
                                const indexDept = this.findIndex(arr, confirmDept);
                    
                                //calling the function to get prompt from Employees Data
                                this.addRole(title, salary, indexDept);  
                                this.getPromptMenu();                              
                            }); 
              }


            if(confirmMenu === 'Exit')
            {
                this.finishConnection();
            }
        });

    }

  

}

////////////////////////////////////////////////////////////

module.exports = InitProgram;