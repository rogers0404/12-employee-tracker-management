const Employee = require('../lib/Employee.js');


test('Creates an Employee object', () => {
  const employee = new Employee('Dave', 'Duncan', 'SalesPerson', 'Dorian Gray');

  expect(employee.firstName).toEqual(expect.any(String));
  expect(employee.lastName).toEqual(expect.any(String));
  expect(employee.jobTitle).toEqual(expect.any(String));
  expect(employee.manager).toEqual(expect.any(String));

});

test('Check getFirstName method', () => {
  const employee = new Employee('Dave', 'Duncan', 'SalesPerson', 'Dorian Gray');
  
    expect(employee.getFirstName()).toEqual(expect.any(String));
  });

  test('Check getLastName method', () => {
    const employee = new Employee('Dave', 'Duncan', 'SalesPerson', 'Dorian Gray');
    
      expect(employee.getLastName()).toEqual(expect.any(String));
    });
  
    test('Check getJobTitle method', () => {
      const employee = new Employee('Dave', 'Duncan', 'SalesPerson', 'Dorian Gray');
      
        expect(employee.getJobTitle()).toEqual(expect.any(String));
      });
    

      test('Check getManager method', () => {
        const employee = new Employee('Dave', 'Duncan', 'SalesPerson', 'Dorian Gray');
        
          expect(employee.getManager).toEqual(expect.any(String));
        });

