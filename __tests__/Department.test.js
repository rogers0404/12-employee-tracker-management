const Department = require('../lib/Department.js');

test('Creates an Department object', () => {
  const dept = new Department('Engineering');

  expect(dept.name).toEqual(expect.any(String));
});

test('Check getFirstName method', () => {
    const dept = new Department('Engineering');
    
      expect(dept.getName()).toEqual(expect.any(String));
});  