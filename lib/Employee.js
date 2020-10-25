/////////////////// Class Employee  ////////////////////////

class Employee {
    constructor(firstName, lastName, jobTitle, manager){
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.manager = manager;
    }
    
    //function to get the First name property of the object
    getFirstName(){
        return this.firstName;
    }

    //function to get the First name property of the object
    getLastName(){
        return this.lastName;
    }

    //function to get the id property of the object
    getJobTitle(){
        return this.jobTitle;
    }

    //function to get the email property of the object
    getManager(){
        return this.manager;
    }

}

////////////////////////////////////////////////////////////

module.exports = Employee;