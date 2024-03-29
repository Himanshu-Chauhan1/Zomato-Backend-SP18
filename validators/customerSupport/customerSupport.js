const isvalidBirthdate = require("is-valid-birthdate")
const db = require("../../models")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const nodeKey = process.env.NODE_KEY
const { CustomerSupport } = db


////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

//////////////// -FOR EMPTY BODY- ///////////////////////
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

//////////////// -FOR FULLNAME- ///////////////////////
const isValidFullName = (fullName) => {
    return /^[a-zA-Z ]+$/.test(fullName);
};

//////////////// -FOR MOBILE- ///////////////////////
const isValidPhone = (phone) => {
    return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone);
};

//////////////// -FOR GENDER- ///////////////////////
const isValidGender = (gender) => {
    return /^(?:m|M|male|Male|f|F|female|Female|O|Other|other)$/m.test(gender);
};

//////////////// -FOR BLOOD GROUP- ///////////////////////
const isValidBloodGroup = (bloodGroup) => {
    return /^(A|B|AB|O)[+-]?$/m.test(bloodGroup);
};

//////////////// -FOR EMAIL- ///////////////////////
const isValidEmail = (email) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};

//////////////// -FOR EMAIL- ///////////////////////
const isValidWorkEmail = (email) => {
    return /[a-z .]+@[zomato]+\.[a-z zomato-z]{2,3}/gm.test(email);
};

//////////////// -FOR-ISAPPROVED/ISACTIVE-AVAILABLE- ///////////////////////
const isValidBoolean = (isActive) => {
    return /^(true|false|True|False)$/.test(isActive);
};

//////////////// -FOR-JOINING-DATE- ///////////////////////
const validateDate = (joiningDate) => {
    return /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(joiningDate);
};

//==========================================Create-A-CustomerSupport========================================================//

const createCustomerSupport = async function (req, res, next) {
    try {
        const data = req.body

        const { firstName, lastName, gender, dob, email, phone, confirmPassword, password, bloodGroup, joiningDate, departmentName } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(firstName)) {
            return res.status(422).send({ status: 1002, message: "firstName is required" })
        }

        if (!isValidFullName(firstName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid firstName" })
        }

        if (!isValid(lastName)) {
            return res.status(422).send({ status: 1002, message: "lastName is required" })
        }

        if (!isValidFullName(lastName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid lastName" })
        }

        if (!isValid(gender)) {
            return res.status(422).send({ status: 1002, message: "Gender is required" })
        }

        if (!isValidGender(gender)) {
            return res.status(422).send({ status: 1003, message: "Invalid gender" })
        }

        if (!isValid(dob)) {
            return res.status(422).send({ status: 1002, message: "Date of Birth is Required" })
        }

        if (!isvalidBirthdate(dob)) {
            return res.status(422).send({ status: 1003, message: "Please enter date of birth from the past Only, It cannot current year or greater from the current year" })
        }

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "Email-Id is required" })
        }

        if (!isValidEmail(email)) {
            return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
        }

        const isRegisteredRestaurantEmail = await CustomerSupport.findOne({ where: { email: email } });

        if (isRegisteredRestaurantEmail) {
            return res.status(422).send({ status: 1008, message: "This EmailId is already registered" })
        }

        if (!isValid(phone)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!isValidPhone(phone)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
        }

        const isRegisteredRestaurantPhone = await CustomerSupport.findOne({ where: { phone: phone } });

        if (isRegisteredRestaurantPhone) {
            return res.status(422).send({ status: 1008, message: "This Phone No. is already registered" })
        }

        if (!isValid(confirmPassword)) {
            return res.status(422).send({ status: 1002, message: "confirm Password is required" })
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "Password is required" })
        }
        if (confirmPassword !== password) {
            return res.status(422).send({ status: 1002, message: "Passwords does not match" })
        }

        if (password.length < 8) {
            return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
        }

        if (password.length > 15) {
            return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
        }

        if (!isValid(bloodGroup)) {
            return res.status(422).send({ status: 1002, message: "lastName is required" })
        }

        if (!isValidBloodGroup(bloodGroup)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid bloodGroup" })
        }

        if (!isValid(joiningDate)) {
            return res.status(422).send({ status: 1002, message: "Date of Joining is Required" })
        }

        if (!validateDate(joiningDate)) {
            return res.status(422).send({ status: 1003, message: "Invalid Joining Date or Please enter date of joining in the correct format like mm/dd/yyyy or mm-dd-yyyy or mm.dd.yyyy " })
        }

        if (!isValid(departmentName)) {
            return res.status(422).send({ status: 1002, message: "DepartmentName is required" })
        }

        if (!(departmentName == 'Engineering' || departmentName == 'Adminstration' || departmentName == 'Management')) {
            return res.status(422).send({ status: 1003, message: "DepartmentName can be only Engineering, Adminstartion and Management Only" })
        }
        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//=========================================Login-For-A-CustomerSupport=======================================================//

let login = async (req, res, next) => {
    try {
        const data = req.body;
        let { email, password } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "EmailId is required" })
        }

        // if (!isValidWorkEmail(email)) {
        //     return res.status(422).send({ status: 1003, message: "Email should be a valid work email address like ....@zomato.com" })
        // }

        const isRegisteredCustomerSupportEmail = await CustomerSupport.findOne({ where: { email: email } });

        if (!isRegisteredCustomerSupportEmail) {
            return res.status(422).send({ status: 1008, message: "This CustomerSupport-EmailId is not registered" })
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "Password is required" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//==========================================Update-A-CustomerSupport=========================================================//

const updateCustomerSupport = async function (req, res, next) {
    try {

        const enteredId = req.params.id;

        let checkCustomerSupportId = enteredId.split('').length

        if (checkCustomerSupportId != 36) {
            return res.status(422).send({ status: 1003, message: "CustomerSupport-Id is not valid" })
        }

        let customerSupportId = enteredId

        const enteredCustomerSupportId = await CustomerSupport.findOne({ where: { id: customerSupportId } })

        if (!enteredCustomerSupportId) {
            return res.status(422).send({ status: 1006, message: "Provided Customer-Support-ID does not exists" })
        }

        const data = req.body

        const { firstName, lastName, gender, dob, email, phone, bloodGroup, joiningDate, departmentName, oldPassword, newPassword } = req.body

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("firstName" in data) {
            if (!isValid(firstName)) {
                return res.status(422).send({ status: 1002, message: "firstName is required" })
            }

            if (!isValidFullName(firstName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid firstName" })
            }


            dataObject['firstName'] = firstName
        }

        if ("lastName" in data) {


            if (!isValid(lastName)) {
                return res.status(422).send({ status: 1002, message: "lastName is required" })
            }

            if (!isValidFullName(lastName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid lastName" })
            }

            dataObject['lastName'] = lastName
        }

        if ("gender" in data) {
            if (!isValid(gender)) {
                return res.status(422).send({ status: 1002, message: "Gender is required" })
            }

            if (!isValidGender(gender)) {
                return res.status(422).send({ status: 1003, message: "Invalid gender" })
            }

            dataObject['gender'] = gender
        }

        if ("dob" in data) {
            if (!isValid(dob)) {
                return res.status(422).send({ status: 1002, message: "Date of birth is required" })
            }

            if (!isvalidBirthdate(dob)) {
                return res.status(422).send({ status: 1003, message: "Please enter date of birth from the past Only, It cannot current year or greater from the current year" })
            }

            dataObject['dob'] = dob
        }
        if ("email" in data) {

            if (!isValid(email)) {
                return res.status(422).send({ status: 1002, message: "Work-Email is required" })
            }

            if (!isValidWorkEmail(email)) {
                return res.status(422).send({ status: 1003, message: "Email should be a valid work email address like ....@zomato.com" })
            }

            const isRegisteredEmail = await CustomerSupport.findOne({ where: { email: email } });

            if (isRegisteredEmail) {
                return res.status(422).send({ status: 1008, message: "This Work-Email-Id is already registered" })
            }

            dataObject['email'] = email
        }


        if ("phone" in data) {

            if (!isValid(phone)) {
                return res.status(422).send({ status: 1002, message: "Phone No. is required" })
            }

            if (!isValidPhone(phone)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
            }

            const isRegisteredPhone = await CustomerSupport.findOne({ where: { phone: phone } });

            if (isRegisteredPhone) {
                return res.status(422).send({ status: 1008, message: "This Phone No. is already registered" })
            }

            dataObject['phone'] = phone
        }

        if ("bloodGroup" in data) {

            if (!isValid(bloodGroup)) {
                return res.status(422).send({ status: 1002, message: "lastName is required" })
            }

            if (!isValidBloodGroup(bloodGroup)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid bloodGroup" })
            }

            dataObject['bloodGroup'] = bloodGroup
        }
        if ("joiningDate" in data) {

            if (!isValid(joiningDate)) {
                return res.status(422).send({ status: 1002, Message: "joiningDate is required" })
            }

            if (!validateDate(joiningDate)) {
                return res.status(422).send({ status: 1003, message: "Invalid Joining Date or Please enter date of joining in the correct format" })
            }

            dataObject['joiningDate'] = joiningDate
        }


        if ("departmentName" in data) {
            if
                (!isValid(departmentName)) {
                return res.status(422).send({ status: 1002, message: "departmentName is required" })
            }

            if (!isValidFullName(departmentName)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid departmentName" })
            }

            dataObject['departmentName'] = departmentName
        }

        if ("oldPassword" in data) {

            if (!isValid(oldPassword)) {
                return res.status(422).send({ status: 1002, message: "oldPassword is required" })
            }

            if (!isValid(newPassword)) {
                return res.status(422).send({ status: 1002, message: "newPassword is required" })
            }
            let customerSupport = await CustomerSupport.findOne({ where: { id: customerSupportId } })

            let checkPassword = await bcrypt.compare(oldPassword, customerSupport.password)
            if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Old Password" })
        }

        if ("oldPassword" && "newPassword" in data) {

            if (newPassword.length < 8) {
                return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
            }
            if (newPassword.length > 15) {
                return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
            }
            let customerSupport = await CustomerSupport.findOne({ where: { id: customerSupportId } })

            let checkOldPassword = await bcrypt.compare(newPassword, customerSupport.password)
            if (checkOldPassword) {
                return res.status(422).send({ status: 1003, msg: "oldPassword and newPassword cannot be same" })
            }

            dataObject['password'] = newPassword
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//===========================================Get-A-CustomerSupport===========================================================//

const getCustomerSupport = async function (req, res, next) {
    try {

        const verifiedtoken = req.verifiedtoken
        let userRoleFromToken = verifiedtoken.userRole

        if (!(userRoleFromToken == "admin" || userRoleFromToken == "superadmin")) {
            return res.status(401).send({ Status: 1010, message: "Unauthorized Access! You dont have correct privilege to perform this operation" });
        }

        let data = req.query

        const { customerSupportId, firstName, lastName, email, phone, joiningDate, departmentName, isApproved, isActive } = data

        if ("customerSupportId" in data) {

            if (!isValid(customerSupportId)) {
                return res.status(422).send({ status: 1002, message: "customerSupportId is required" })
            }

            let checkCustomerSupportId = customerSupportId.split('').length

            if (checkCustomerSupportId != 36) {
                return res.status(422).send({ status: 1003, message: "Please enter customerSupportId in a valid format" })
            }

        }

        if ("firstName" in data) {

            if (!isValid(firstName)) {
                return res.status(422).send({ status: 1002, message: "firstName is required" })
            }

            if (!isValidFullName(firstName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid firstName" })
            }

        }

        if ("lastName" in data) {

            if (!isValid(lastName)) {
                return res.status(422).send({ status: 1002, message: "lastName is required" })
            }

            if (!isValidFullName(lastName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid lastName" })
            }

        }

        if ("email" in data) {

            if (!isValid(email)) {
                return res.status(422).send({ status: 1002, message: "Email is required" })
            }

            if (!isValidEmail(email)) {
                return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
            }

        }

        if ("phone" in data) {

            if (!isValid(phone)) {
                return res.status(422).send({ status: 1002, message: "Phone No. is required" })
            }

            if (!isValidPhone(phone)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
            }

        }

        if ("joiningDate" in data) {

            if (!isValid(joiningDate)) {
                return res.status(422).send({ status: 1002, message: "Date of Joining is Required" })
            }

            if (!validateDate(joiningDate)) {
                return res.status(422).send({ status: 1003, message: "Invalid Joining Date or Please enter date of joining in the correct format" })
            }

        }

        if ("departmentName" in data) {

            if (!isValid(departmentName)) {
                return res.status(422).send({ status: 1002, message: "departmentName is required" })
            }

            if (!isValidFullName(departmentName)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid departmentName" })
            }

        }

        if ("isApproved" in data) {


            if (!isValid(isApproved)) {
                return res.status(422).send({ status: 1002, message: "isApproved is required" })
            }

            if (!isValidBoolean(isApproved)) {
                return res.status(422).send({ status: 1003, message: "Please provide isApproved like True or false etc" })
            }

        }

        if ("isActive" in data) {


            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isRequest is required" })
            }

            if (!isValidBoolean(isActive)) {
                return res.status(422).send({ status: 1003, message: "Please provide isActive like True or false etc" })
            }

        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//===========================================Delete-A-CustomerSupport========================================================//

const deleteCustomerSupport = async function (req, res, next) {
    try {


        const enteredId = req.params.id;

        let checkCustomerSupportId = enteredId.split('').length

        if (checkCustomerSupportId != 36) {
            return res.status(422).send({ status: 1003, message: "CustomerSupport-Id is not valid" })
        }

        let customerSupportId = enteredId

        const enteredCustomerSupportId = await CustomerSupport.findOne({ where: { id: customerSupportId } })

        if (!enteredCustomerSupportId) {
            return res.status(422).send({ status: 1006, message: "Provided Customer-Support-ID does not exists" })
        }

        next()
    }
    catch (err) {

        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================Change-password-for-A-CustomerSupport==============================================//

const changePassword = async function (req, res, next) {
    try {

        const enteredId = req.params.id;

        let checkCustomerSupportId = enteredId.split('').length

        if (checkCustomerSupportId != 36) {
            return res.status(422).send({ status: 1003, message: "CustomerSupport-Id is not valid" })
        }

        let customerSupportId = enteredId

        const enteredCustomerSupportId = await CustomerSupport.findOne({ where: { id: customerSupportId } })

        if (!enteredCustomerSupportId) {
            return res.status(422).send({ status: 1006, message: "Provided Customer-Support-ID does not exists" })
        }

        let data = req.body

        let { oldPassword, password, confirmPassword } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(oldPassword)) {
            return res.status(422).send({ status: 1002, message: "oldPassword is required" })
        }

        let customerSupport = await CustomerSupport.findOne({ where: { id: customerSupportId } })

        let checkPassword = await bcrypt.compare(oldPassword + nodeKey, customerSupport.password)
        if (!checkPassword) {
            return res.status(422).send({ status: 1008, message: "OldPassword is not correct please enter a correct password" })
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "Password is required" })
        }

        if (!isValid(confirmPassword)) {
            return res.status(422).send({ status: 1002, message: "confirm Password is required" })
        }

        if (confirmPassword !== password) {
            return res.status(422).send({ status: 1002, message: "Passwords does not match" })
        }

        if (password.length < 8) {
            return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
        }

        if (password.length > 15) {
            return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
        }

        let changeNewPassword = await bcrypt.hashSync(((password + nodeKey)), 10)

        next()
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//======================================Reset-password-for-A-CustomerSupport=================================================//

const resetPassword = async function (req, res, next) {
    try {

        let data = req.body

        let { email } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "Email is required" })
        }

        if (!isValidEmail(email)) {
            return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
        }

        const isRegisteredEmail = await CustomerSupport.findOne({ where: { email: email } });

        if (!isRegisteredEmail) {
            return res.status(422).send({ status: 1008, message: "This Email-Id is not registered" })
        }

        next()
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//=========================================Verify-password-for-A-CustomerSupport=============================================//

const verifyPassword = async function (req, res, next) {
    try {

        let userToken = req.params.token

        JWT.verify(userToken, process.env.RESET_PASSWORD_KEY, async (err) => {
            if (err) {
                return res.status(401).send({ status: 1003, message: 'InValid Token or session expired' })
            }
        });

        let findUserToken = await CustomerSupport.findOne({ where: { resetLink: userToken } })

        if (!findUserToken) {
            return res.status(404).send({ status: 1006, message: "CustomerSupport with this token does not exists" });
        }

        let data = req.body

        let { resetLink, password, confirmPassword } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide some details" })
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "Password is required" })
        }

        if (!isValid(confirmPassword)) {
            return res.status(422).send({ status: 1002, message: "confirm Password is required" })
        }

        if (confirmPassword !== password) {
            return res.status(422).send({ status: 1002, message: "Passwords does not match" })
        }

        if (password.length < 8) {
            return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
        }

        if (password.length > 15) {
            return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
        }

        let changeNewPassword = await bcrypt.hashSync(((password + nodeKey)), 10)

        //once password changed resetLink will be a emptyString
        data.resetLink = ''

        next()

    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

module.exports = {
    createCustomerSupport,
    updateCustomerSupport,
    getCustomerSupport,
    deleteCustomerSupport,
    login,
    changePassword,
    resetPassword,
    verifyPassword
}







