const mysql = require('mysql2');
const cTable  = require('console.table');

connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'Alejandro1210',
    database: 'db_company'
    });


connectDB = () => {
    connection.connect(err => {
        if (err) throw err;
      });
};

viewAllEmployees = () => {
    const query = connection.query(
        'SELECT employee.id, firstName, lastName, title, salary, name as department FROM role LEFT JOIN department ON department.id = role.departmentId RIGHT JOIN employee ON employee.roleId = role.id;',
        function(err, res) {
          if (err) throw err;
          console.log('\n');
          console.table(res);
        });
};

viewAllDepartments = () => {
    const query = connection.query(
        'SELECT * FROM department;',
        function(err, res) {
          if (err) throw err;
          console.log('\n');
          console.table(res);
        });
};

viewAllRoles = () => {
    const query = connection.query(
        'SELECT role.id, title, salary, name as department FROM role LEFT JOIN department ON department.id = role.departmentId;',
        function(err, res) {
          if (err) throw err;
          console.log('\n');
          console.table(res);
        });
};


finishConnection = () => {
    connection.end();
}


module.exports = {connectDB, viewAllEmployees, finishConnection, viewAllDepartments, viewAllRoles};

/* 

createProduct = () => {
  console.log('Inserting a new product...\n');
  const query = connection.query(
    'INSERT INTO products SET ?',
    {
      flavor: 'Rocky Road',
      price: 3.0,
      quantity: 50
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' product inserted!\n');
      // Call updateProduct() AFTER the INSERT completes
      updateProduct();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

updateProduct = () => {
  console.log('Updating all Rocky Road quantities...\n');
  // Update the quantity for 'Rocky Road' to 100
  //
  // YOUR CODE HERE
  //
  const query = connection.query(
    'UPDATE FROM products SET ? WHERE ?',
    [{
      quantity: 100
    },
    {
      flavor: 'Rocky Road'
    }],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' product inserted!\n');
      // Call updateProduct() AFTER the INSERT completes
      readProducts();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
  // Include the callback function to catch any errors,
  // log how many products were updated,
  // and call deleteProduct() AFTER the UPDATE completes
  //
  // YOUR CODE HERE
  //
  deleteProduct();

  // logs the actual query being run
  console.log(query.sql);
};

deleteProduct = () => {
  console.log('Deleting all strawberry ice cream...\n');
  // Delete the flavor 'strawberry'
  //
  // YOUR CODE HERE
  //
  const query = connection.query(
    'DELETE FROM products WHERE ?',
    {
      flavor: 'strawberry',
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' product inserted!\n');
      // Call updateProduct() AFTER the INSERT completes
      readProducts();
    }
  );
  // Include the callback function to catch any errors,
  // log how many products were deleted,
  // and call the readProducts() AFTER the DELETE completes
  //
  // YOUR CODE HERE
  //

  // logs the actual query being run
  console.log(query.sql);
};

readProducts = () => {
  console.log('Selecting all products...\n');
  // Select all of the data from the 'products' table
  //
  // YOUR CODE HERE
  //
  // Include the callback function to catch any errors,
  // log all results of the SELECT statement,
  // and end the connection
  //
  // YOUR CODE HERE
  //

  const query = connection.query(
    'SELECT * FROM products',
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' product inserted!\n');
      
    }
  );
  connection.end();
}; */