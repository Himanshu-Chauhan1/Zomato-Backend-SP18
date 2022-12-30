const db = require("../../models")
const bcrypt = require("bcrypt")
const { Customer } = db


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

//////////////// -FOR EMAIL- ///////////////////////
const isValidEmail = (email) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};


//========================================Create-A-Customer==========================================================//

const createCustomer = async function (req, res, next) {
    try {
        const data = req.body

        const { fullName, email, phone, confirmPassword, password } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(fullName)) {
            return res.status(422).send({ status: 1002, message: "FullName is required" })
        }

        if (!isValidFullName(fullName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid fullName" })
        }

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "Email is required" })
        }

        if (!isValidEmail(email)) {
            return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
        }

        const isRegisteredEmail = await Customer.findOne({ where: { email: email } });

        if (isRegisteredEmail) {
            return res.status(422).send({ status: 1008, message: "This Email-Id is already registered" })
        }

        if (!isValid(phone)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!isValidPhone(phone)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
        }

        const isRegisteredPhone = await Customer.findOne({ where: { phone: phone } });

        if (isRegisteredPhone) {
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

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Login-For-A-(Customer)==========================================================//

let login = async (req, res, next) => {
    try {
        const data = req.body;
        let { email, phone, password } = data

        const dataObject = {};

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!(email || phone)) {
            return res.status(422).send({ status: 1002, message: "At least provide one field to proceed further either phone no. or a email address" })
        }

        if ("email" in data) {

            if (!isValid(email)) {
                return res.status(422).send({ status: 1002, message: "Email is required" })
            }

            if (!isValidEmail(email)) {
                return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
            }

            const isRegisteredEmail = await Customer.findOne({ where: { email: email } });

            if (!isRegisteredEmail) {
                return res.status(422).send({ status: 1008, message: "This Email-Id is not registered, please enter a registered email address" })
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
            const isRegisteredPhone = await Customer.findOne({ where: { phone: phone } });

            if (!isRegisteredPhone) {
                return res.status(422).send({ status: 1008, message: "This Phone No. is not registered" })
            }

            dataObject['phone'] = phone
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "Password is required" })
        }

        dataObject['password'] = password

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Customer==========================================================//

const updateCustomer = async function (req, res, next) {
    try {

        const enteredId = req.params.customerId;

        let checkCustomerId = enteredId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let customerId = enteredId

        const enteredCustomerId = await Customer.findOne({ where: { id: customerId } })

        if (!enteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Provided Customer-ID does not exists" })
        }

        const data = req.body

        const { fullName, email, phone, oldPassword, newPassword, password } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("fullName" in data) {

            if (!isValid(fullName)) {
                return res.status(422).send({ status: 1002, message: "FullName is required" })
            }

            if (!isValidFullName(fullName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid fullName" })
            }

            dataObject['fullName'] = fullName
        }

        if ("email" in data) {

            if (!isValid(email)) {
                return res.status(422).send({ status: 1002, message: "Email is required" })
            }

            if (!isValidEmail(email)) {
                return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
            }

            const isRegisteredEmail = await Customer.findOne({ where: { email: email } });

            if (isRegisteredEmail) {
                return res.status(422).send({ status: 1008, message: "This Email-Id is already registered" })
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

            const isRegisteredPhone = await Customer.findOne({ where: { phone: phone } });

            if (isRegisteredPhone) {
                return res.status(422).send({ status: 1008, message: "This Phone No. is already registered" })
            }

            dataObject['phone'] = phone
        }

        if ("oldPassword" in data) {

            if (!isValid(oldPassword)) {
                return res.status(422).send({ status: 1002, message: "oldPassword is required" })
            }

            if (!isValid(newPassword)) {
                return res.status(422).send({ status: 1002, message: "newPassword is required" })
            }
            let customer = await Customer.findOne({ where: { id: customerId } })

            let checkPassword = await bcrypt.compare(oldPassword, customer.password)
            if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })
        }

        if ("oldPassword" && "newPassword" in data) {

            if (newPassword.length < 8) {
                return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
            }
            if (newPassword.length > 15) {
                return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
            }
            let customer = await Customer.findOne({ where: { id: customerId } })
            let checkOldPassword = await bcrypt.compare(newPassword, customer.password)
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

//========================================Delete-A-Customer==========================================================//

const deleteCustomer = async function (req, res, next) {
    try {

        const enteredId = req.params.customerId

        let checkCustomerId = enteredId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let customerId = enteredId

        const enteredCustomerId = await Customer.findOne({ where: { id: customerId } })

        if (!enteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Provided Customer-ID does not exists" })
        }

        next()
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};


module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer,
    login
}







