
/*Query #1 All Employees. . Acceptance Criteria 4*/
SELECT employee.id, firstName, lastName, title, salary, name as department FROM role 
    LEFT JOIN department ON department.id = role.departmentId 
    RIGHT JOIN employee ON employee.roleId = role.id;
/*************************************************************************************/

/*Query #2 All Employees by Department. Bonus #1*/
SELECT employee.id, firstName, lastName, title, salary, name as department FROM role 
    LEFT JOIN department ON department.id = role.departmentId 
    RIGHT JOIN employee ON employee.roleId = role.id
    WHERE department.name = 'Sales'; /*every kind of department*/
/*************************************************************************************/

/*Query #3 All Departments. Acceptance Criteria 2*/
SELECT * FROM department;
/*************************************************************************************/

/*Query #4 All Roles. Acceptance Criteria 3*/
SELECT role.id, title, salary, name as department FROM role 
    LEFT JOIN department ON department.id = role.departmentId;
/*************************************************************************************/

/*Query #5 add a department. Acceptance Criteria 5*/
INSERT INTO department 
    SET name = 'Marketing';     /*Whatever department. Inquirer from prompt*/
/*************************************************************************************/

/*Query #6 add a role. Acceptance Criteria 6*/
INSERT INTO role 
    SET title = 'Lead Marketing', 
        salary = 5000, 
        departmentId = 5;      /*Whatever department. Inquirer from prompt and list*/
/*************************************************************************************/

/*Query #7 add a employee. Acceptance Criteria 7*/
INSERT INTO employee 
    SET firstName = 'Rogers', 
        lastName = 'Ramirez', 
        roleId = 3,       /*Whatever department. Inquirer from prompt and list*/
        managerId = 8;    /*Whatever department. Inquirer from prompt and list*/
/*************************************************************************************/

/*Query #8 update an employee role. Acceptance Criteria 8*/
UPDATE employee 
    SET roleId = 6       /*Whatever department. Inquirer from prompt and list*/
    WHERE id = 9;

    /*we need to search first for role and then get the id role and store it in employee*/
/*************************************************************************************/

/*Query #9 update an employee manager. Bonus #2*/
UPDATE employee 
    SET managerId = 4       /*Whatever department. Inquirer from prompt and list*/
    WHERE id = 8;

    /*we need to search first for role and then get the id role and store it in employee*/
/*************************************************************************************/

/*Query #10 See all employees by manager. Bonus #3*/

SELECT * FROM employee WHERE managerId = 4;

    /*we need to search first for managerId and then get the id employee and store it in employee*/
/*************************************************************************************/







