/////////////////// Class Employee  ////////////////////////

class Employee {
    constructor(fisrtName, lastName, jobTitle, manager){
        this.fisrtName = fisrtName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.manager = manager;
    }
    
    //function to get the First name property of the object
    getFisrtName(){
        return this.fisrtName;
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