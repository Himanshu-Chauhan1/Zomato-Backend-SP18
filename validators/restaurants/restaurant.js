const db = require("../../models")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const nodeKey = process.env.NODE_KEY
const { Restaurant } = db


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

//////////////// -FOR RESTAURANTNAME- ///////////////////////
const isValidRestaurantName = (name) => {
    return /^[A-Za-z\s.\(\)0-9]{3,}$/.test(name);
};

//////////////// -FOR MOBILE- ///////////////////////
const isValidPhone = (phone) => {
    return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone);
};

//////////////// -FOR MOBILE- ///////////////////////
const isValidLandline = (landline) => {
    return /^[0-9]\d{2,4}-\d{6,8}$/.test(landline);
};

//////////////// -FOR EMAIL- ///////////////////////
const isValidEmail = (email) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};

////////////////////////// -GLOBAL- //////////////////////
const isValidNumber = function (value) {
    if (!value || typeof value != "number")
        return false;
    return true;
};

//========================================Create-A-Restaurant=============================================================//

const createRestaurant = async function (req, res, next) {
    try {
        const data = req.body

        const { name, email, phone, landline, ownerFullName, ownerEmail, confirmPassword, password, longitude, latitude, restaurantAddress } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(name)) {
            return res.status(422).send({ status: 1002, message: "restaurantName is required" })
        }

        if (!isValidRestaurantName(name)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid restaurantName" })
        }

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "Restaurant EmailId is required" })
        }

        if (!isValidEmail(email)) {
            return res.status(422).send({ status: 1003, message: "Resturant Email should be a valid email address" })
        }

        const isRegisteredRestaurantEmail = await Restaurant.findOne({ where: { email: email } });

        if (isRegisteredRestaurantEmail) {
            return res.status(422).send({ status: 1008, message: "This Restaurant-EmailId is already registered" })
        }

        if (!isValid(phone)) {
            return res.status(422).send({ status: 1002, message: "Restaurant-Phone No. is required" })
        }

        if (!isValidPhone(phone)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Restautrant-Phone no" })
        }

        const isRegisteredRestaurantPhone = await Restaurant.findOne({ where: { phone: phone } });

        if (isRegisteredRestaurantPhone) {
            return res.status(422).send({ status: 1008, message: "This Restaurant-Phone No. is already registered" })
        }

        if (!isValid(landline)) {
            return res.status(422).send({ status: 1002, message: "Restaurant-Landline No. is required" })
        }

        if (!isValidLandline(landline)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Restautrant-Landline no" })
        }

        const isRegisteredRestaurantLandline = await Restaurant.findOne({ where: { landline: landline } });

        if (isRegisteredRestaurantLandline) {
            return res.status(422).send({ status: 1008, message: "This Restaurant-Landline No. is already registered" })
        }

        if (!isValid(ownerFullName)) {
            return res.status(422).send({ status: 1002, message: "owner-FullName is required" })
        }

        if (!isValidFullName(ownerFullName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid owner-fullName" })
        }

        if (!isValid(ownerEmail)) {
            return res.status(422).send({ status: 1002, message: "owner-Email is required" })
        }

        if (!isValidEmail(ownerEmail)) {
            return res.status(422).send({ status: 1003, message: "owner-Email should be a valid email address" })
        }

        const isRegisteredOwnerEmail = await Restaurant.findOne({ where: { email: email } });

        if (isRegisteredOwnerEmail) {
            return res.status(422).send({ status: 1008, message: "This owner-Email-Id is already registered" })
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

        if (!isValidNumber(longitude)) {
            return res.status(422).send({ status: 1002, message: "longitude is required" })
        }

        if ((longitude < -180 || longitude > 180)) {
            return res.status(422).send({ status: 1002, message: "Invalid longitude!, Longitude must be between -180 and 180 degrees inclusive" })
        }

        if (!isValidNumber(latitude)) {
            return res.status(422).send({ status: 1002, message: "latitude is required" })
        }

        if ((latitude < -90 || latitude > 90)) {
            return res.status(422).send({ status: 1002, message: "Invalid latitude!, Latitude must be between -90 and 90 degrees inclusive" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Login-For-A-Restaurant==========================================================//

let login = async (req, res, next) => {
    try {
        const data = req.body;
        let { email, phone, password } = data

        const dataObject = {};

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(email || phone)) {
            return res.status(422).send({ status: 1002, message: "At least provide one either phone no. or a email address" })
        }

        if ("email" in data) {


            if (!isValid(email)) {
                return res.status(422).send({ status: 1002, message: "Restaurant EmailId is required" })
            }

            if (!isValidEmail(email)) {
                return res.status(422).send({ status: 1003, message: "Resturant Email should be a valid email address" })
            }

            dataObject['email'] = email
        }
        if ("phone" in data) {

            if (!isValid(phone)) {
                return res.status(422).send({ status: 1002, message: "Restaurant-Phone No. is required" })
            }

            if (!isValidPhone(phone)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid Restautrant-Phone no" })
            }

            const isRegisteredRestaurantPhone = await Restaurant.findOne({ where: { phone: phone } });

            if (!isRegisteredRestaurantPhone) {
                return res.status(422).send({ status: 1008, message: "This Restaurant-Phone No. is already registered" })
            }

            dataObject['phone'] = phone
        }

        dataObject['password'] = password

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Restaurant============================================================//

const updateRestaurant = async function (req, res, next) {
    try {

        const enteredId = req.params.id

        let checkRestaurantId = enteredId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let restaurantId = enteredId

        const enteredRestaurantId = await Restaurant.findOne({ where: { id: restaurantId } })

        if (!enteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "Provided Restaurant-ID does not exists" })
        }

        const data = req.body

        const { name, email, phone, landline, ownerFullName, ownerEmail, oldPassword, newPassword } = req.body

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("name" in data) {

            if (!isValid(name)) {
                return res.status(422).send({ status: 1002, message: "restaurantName is required" })
            }

            if (!isValidRestaurantName(name)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid restaurantName" })
            }

            dataObject['email'] = email
        }

        if ("email" in data) {


            if (!isValid(email)) {
                return res.status(422).send({ status: 1002, message: "Restaurant EmailId is required" })
            }

            if (!isValidEmail(email)) {
                return res.status(422).send({ status: 1003, message: "Resturant Email should be a valid email address" })
            }

            const isRegisteredRestaurantEmail = await Restaurant.findOne({ where: { email: email } });

            if (isRegisteredRestaurantEmail) {
                return res.status(422).send({ status: 1008, message: "This Restaurant-EmailId is already registered" })
            }

            dataObject['email'] = email
        }

        if ("phone" in data) {

            if (!isValid(phone)) {
                return res.status(422).send({ status: 1002, message: "Restaurant-Phone No. is required" })
            }

            if (!isValidPhone(phone)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid Restautrant-Phone no" })
            }

            const isRegisteredRestaurantPhone = await Restaurant.findOne({ where: { phone: phone } });

            if (isRegisteredRestaurantPhone) {
                return res.status(422).send({ status: 1008, message: "This Restaurant-Phone No. is already registered" })
            }

            dataObject['phone'] = phone
        }

        if ("landline" in data) {


            if (!isValid(landline)) {
                return res.status(422).send({ status: 1002, message: "Restaurant-Landline No. is required" })
            }

            if (!isValidLandline(landline)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid Restautrant-Landline no" })
            }

            const isRegisteredRestaurantLandline = await Restaurant.findOne({ where: { landline: landline } });

            if (isRegisteredRestaurantLandline) {
                return res.status(422).send({ status: 1008, message: "This Restaurant-Landline No. is already registered" })
            }

            dataObject['landline'] = landline
        }


        if ("ownerFullName" in data) {

            if (!isValid(ownerFullName)) {
                return res.status(422).send({ status: 1002, message: "owner-FullName is required" })
            }

            if (!isValidFullName(ownerFullName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid owner-fullName" })
            }

            dataObject['email'] = email
        }

        if ("oldPassword" in data) {

            if (!isValid(oldPassword)) {
                return res.status(422).send({ status: 1002, message: "oldPassword is required" })
            }

            if (!isValid(newPassword)) {
                return res.status(422).send({ status: 1002, message: "newPassword is required" })
            }
            let restaurant = await Restaurant.findOne({ where: { id: restaurantId } })

            let checkPassword = await bcrypt.compare(oldPassword, restaurant.password)
            if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Old Password" })
        }

        if ("ownerEmail" in data) {

            if (!isValid(ownerEmail)) {
                return res.status(422).send({ status: 1002, message: "owner-Email is required" })
            }

            if (!isValidEmail(ownerEmail)) {
                return res.status(422).send({ status: 1003, message: "owner-Email should be a valid email address" })
            }

            const isRegisteredOwnerEmail = await Restaurant.findOne({ where: { email: email } });

            if (isRegisteredOwnerEmail) {
                return res.status(422).send({ status: 1008, message: "This owner-Email-Id is already registered" })
            }

            dataObject['ownerEmail'] = ownerEmail
        }

        if ("oldPassword" && "newPassword" in data) {

            if (newPassword.length < 8) {
                return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
            }
            if (newPassword.length > 15) {
                return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
            }
            let restaurant = await Restaurant.findOne({ where: { id: restaurantId } })

            let checkOldPassword = await bcrypt.compare(newPassword, restaurant.password)
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

//========================================Get-A-Restaurant==============================================================//

const getRestaurant = async function (req, res) {
    try {

        const verifiedtoken = req.verifiedtoken
        let userRoleFromToken = verifiedtoken.userRole

        if (!(userRoleFromToken == "admin" || userRoleFromToken == "superadmin" || userRoleFromToken == "customersupport")) {
            return res.status(401).send({ Status: 1010, message: "Unauthorized Access! You dont have correct privilege to perform this operation" });
        }

        const data = req.query

        const { restaurantId, name, email, phone, landline, ownerFullName, ownerEmail, isApproved, isActive } = data

        if ("restaurantId" in data) {

            if (!isValid(restaurantId)) {
                return res.status(422).send({ status: 1002, message: "restaurantId is required" })
            }

            let checkRestaurantId = restaurantId.split('').length

            if (checkRestaurantId != 36) {
                return res.status(422).send({ status: 1003, message: "restaurant-Id is not valid please enter in a valid format" })
            }
        }

        if ("name" in data) {

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

        if ("landline" in data) {


            if (!isValid(landline)) {
                return res.status(422).send({ status: 1002, message: "Restaurant-Landline No. is required" })
            }

            if (!isValidLandline(landline)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid Restautrant-Landline no" })
            }

        }

        if ("ownerFullName" in data) {

            if (!isValid(ownerFullName)) {
                return res.status(422).send({ status: 1002, message: "ownerFullName is required" })
            }

            if (!isValidFullName(ownerFullName)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid ownerFullName" })
            }

        }


        if ("ownerEmail" in data) {

            if (!isValid(ownerEmail)) {
                return res.status(422).send({ status: 1002, message: "owner-Email is required" })
            }

            if (!isValidEmail(ownerEmail)) {
                return res.status(422).send({ status: 1003, message: "owner-Email should be a valid email address" })
            }

        }

        if ("isApproved" in data) {

            if (!isValid(isApproved)) {
                return res.status(422).send({ status: 1002, message: "isApproved is required" })
            }

            if (!isActiveRequest(isApproved)) {
                return res.status(422).send({ status: 1003, message: "Please provide isApproved like True or false etc" })
            }

        }

        if ("isActive" in data) {

            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isRequest is required" })
            }

            if (!isActiveRequest(isActive)) {
                return res.status(422).send({ status: 1003, message: "Please provide isActive like True or false etc" })
            }

        }

        next()
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================Delete-A-Restaurant===========================================================//

const deleteRestaurant = async function (req, res, next) {
    try {


        const enteredId = req.params.id

        let checkRestaurantId = enteredId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let restaurantId = enteredId

        const enteredRestaurantId = await Restaurant.findOne({ where: { id: restaurantId } })

        if (!enteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "Provided Restaurant-ID does not exists" })
        }


        next()
    }
    catch (err) {

        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//============================================Change-password-for-A-Restaurant=================================================//

const changePassword = async function (req, res, next) {
    try {

        const enteredId = req.params.id

        let checkRestaurantId = enteredId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let restaurantId = enteredId

        const enteredRestaurantId = await Restaurant.findOne({ where: { id: restaurantId } })

        if (!enteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "Provided Restaurant-ID does not exists" })
        }

        let data = req.body

        let { oldPassword, password, confirmPassword } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(oldPassword)) {
            return res.status(422).send({ status: 1002, message: "oldPassword is required" })
        }

        let restaurant = await Restaurant.findOne({ where: { id: restaurantId } })

        let checkPassword = await bcrypt.compare(oldPassword + nodeKey, restaurant.password)
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

//============================================Reset-password-for-A-Restaurant=================================================//

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

        const isRegisteredEmail = await Restaurant.findOne({ where: { email: email } });

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

//===========================================Verify-password-for-A-Restaurant=================================================//

const verifyPassword = async function (req, res, next) {
    try {

        let userToken = req.params.token

        JWT.verify(userToken, process.env.RESET_PASSWORD_KEY, async (err) => {
            if (err) {
                return res.status(401).send({ status: 1003, message: 'InValid Token or session expired' })
            }
        });

        let findUserToken = await Restaurant.findOne({ where: { resetLink: userToken } })

        if (!findUserToken) {
            return res.status(404).send({ status: 1006, message: "restaurant with this token does not exists" });
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
    createRestaurant,
    updateRestaurant,
    getRestaurant,
    deleteRestaurant,
    login,
    changePassword,
    resetPassword,
    verifyPassword
}







