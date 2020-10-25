DROP DATABASE IF EXISTS db_company;
CREATE DATABASE db_company;
USE db_company;

 CREATE TABLE department(
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE role(
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  departmentId INTEGER,
  PRIMARY KEY (id),
  CONSTRAINT department_fk FOREIGN KEY (departmentId) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
  id INTEGER AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(30),
  lastName VARCHAR(30),
  roleId INTEGER,
  managerId INTEGER,
  PRIMARY KEY (id),
  CONSTRAINT role_fk FOREIGN KEY (roleId) REFERENCES role(id)  ON DELETE SET NULL,
  CONSTRAINT manager_fk FOREIGN KEY (managerId) REFERENCES employee(id) ON DELETE SET NULL 
);
