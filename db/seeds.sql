INSERT INTO department (name) 
VALUES  ('Sales'),                    /*id = 1*/
        ('Engineering'),              /*id = 2*/
        ('Finance'),                  /*id = 3*/
        ('Legal');                    /*id = 4*/

INSERT INTO role (title, Salary, departmentId) 
VALUES  ('Sales Lead', 6000, 1),                              /*id = 1*/
        ('Lead Engineer', 7500, 2),                           /*id = 2*/
        ('Accountant', 8000, 3),                              /*id = 3*/
        ('Salesperson', 3500, 1),                             /*id = 4*/
        ('Lawyer', 7500, 4),                                  /*id = 5*/
        ('Software Engineer', 6500, 2),                       /*id = 6*/
        ('Legal Team Lead', 7500, 4),                          /*id = 7*/
        ('Finance Team Lead', 5500, 3);                       /*id = 8*/


INSERT INTO employee (firstName, lastName, roleId, managerId)
VALUES  ('John', 'Doe', 1, NULL),                             /*id = 1*/
        ('Mike', 'Chan', 4, 1),                               /*id = 2*/
        ('Micheal', 'Duncan', 8, NULL),                       /*id = 3*/
        ('Ashley', 'Rodriguez', 2, NULL),                     /*id = 4*/
        ('Kevin', 'Tupik', 6, 4),                             /*id = 5*/
        ('Maria', 'Brown', 3, 3),                             /*id = 6*/
        ('Sarah', 'Lourd', 7, NULL),                          /*id = 7*/
        ('Tom', 'Allen', 5, 7),                               /*id = 8*/
        ('Tamer', 'Galal', 6, 4),                             /*id = 9*/
        ('Katherine', 'Mansfield', 4, 1);                     /*id = 10*/