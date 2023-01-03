const db = require("../../models")
const { Address, Admin } = db


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

//////////////// -FOR REQUEST-AVILABLE- ///////////////////////
const isValidRequest = (isRequest) => {
    return /^(true|false|True|False)$/.test(isRequest);
};
//////////////// -FOR STREET-AVILABLE- ///////////////////////
const isValidStreetName = (streetName) => {
    return /^\s*\S+(?:\s+\S+){2}/.test(streetName);
};

//////////////// -FOR CITY-AVILABLE- ///////////////////////
const isValidCityName = (cityName) => {
    return /([a-zA-Z]+|[a-zA-Z]+\\s[a-zA-Z]+)/.test(cityName);
};

//////////////// -FOR STATE-AVILABLE- ///////////////////////
const isValidStateName = (stateName) => {
    return /([a-zA-Z]+|[a-zA-Z]+\\s[a-zA-Z]+)/.test(stateName);
};

//////////////// -FOR PINCODE-AVILABLE- ///////////////////////
const isValidPincode = (pincode) => {
    return /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(pincode);
};

//========================================Create-A-Address==========================================================//

const createAddress = async function (req, res, next) {
    try {

        const enteredAdminId = req.params.adminId

        let checkAdminId = enteredAdminId.split('').length

        if (checkAdminId != 36) {
            return res.status(422).send({ status: 1003, message: "admin-Id is not valid" })
        }

        let paramsAdminId = enteredAdminId

        const checkEnteredAdminId = await Admin.findOne({ where: { id: paramsAdminId } });

        if (!checkEnteredAdminId) {
            return res.status(422).send({ status: 1006, message: "admin-ID does not exists" })
        }

        const data = req.body

        const { userId, userRole, streetName, cityName, stateName, pincode } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(userId)) {
            return res.status(422).send({ status: 1002, message: "userId is required" })
        }

        if (userId.length != 36) {
            return res.status(422).send({ status: 1003, message: "Please enter userId in a correct format" })
        }

        const isRegisteredUserId = await Admin.findOne({ where: { id: userId } });

        if (!isRegisteredUserId) {
            return res.status(422).send({ status: 1008, message: "This userId does not belongs to any of the admins" })
        }

        data.userRole = "admin".toLocaleLowerCase()

        if (!isValid(streetName)) {
            return res.status(422).send({ status: 1002, message: "streetName is required" })
        }

        if (!isValidStreetName(streetName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid streetName" })
        }

        if (!isValid(cityName)) {
            return res.status(422).send({ status: 1002, message: "cityName is required" })
        }

        if (!isValidCityName(cityName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid cityName" })
        }

        if (!isValid(stateName)) {
            return res.status(422).send({ status: 1002, message: "stateName is required" })
        }

        if (!isValidStateName(stateName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid stateName" })
        }

        if (!isValid(pincode)) {
            return res.status(422).send({ status: 1002, message: "pincode is required" })
        }

        if (!isValidPincode(pincode)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid pincode of six digits" })
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Address==========================================================//

const updateAddress = async function (req, res, next) {
    try {

        const enteredAdminId = req.params.id

        let checkAdminId = enteredAdminId.split('').length

        if (checkAdminId != 36) {
            return res.status(422).send({ status: 1003, message: "admin-Id is not valid" })
        }

        let paramsAdminId = enteredAdminId

        const checkEnteredAdminId = await Admin.findOne({ where: { id: paramsAdminId } });

        if (!checkEnteredAdminId) {
            return res.status(422).send({ status: 1006, message: "admin-ID does not exists" })
        }

        const enteredId = req.params.addressId

        let checkAddressId = enteredId.split('').length

        if (checkAddressId != 36) {
            return res.status(422).send({ status: 1003, message: "Address-Id is not valid" })
        }

        let addressId = enteredId

        const enteredAddressId = await Address.findOne({ where: { id: addressId } })

        if (!enteredAddressId) {
            return res.status(422).send({ status: 1006, message: "Provided Address-ID does not exists" })
        }

        const data = req.body

        const { userId, streetName, cityName, stateName, pincode } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("userId" in data) {

            if (!isValid(userId)) {
                return res.status(422).send({ status: 1002, message: "userIId is required" })
            }

            if (userId.length != 36) {
                return res.status(422).send({ status: 1003, message: "Please enter userId in a correct format" })
            }

            const isRegisteredUserId = await Admin.findOne({ where: { id: userId } });

            if (!isRegisteredUserId) {
                return res.status(422).send({ status: 1008, message: "This userId does not belongs to any of the admins" })
            }

            dataObject['userId'] = userId
        }


        if ("streetName" in data) {

            if (!isValid(streetName)) {
                return res.status(422).send({ status: 1002, message: "streetName is required" })
            }

            if (!isValidStreetName(streetName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid streetName" })
            }

            dataObject['streetName'] = streetName
        }

        if ("cityName" in data) {

            if (!isValid(cityName)) {
                return res.status(422).send({ status: 1002, message: "cityName is required" })
            }

            if (!isValidCityName(cityName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid cityName" })
            }

            dataObject['cityName'] = cityName
        }

        if ("stateName" in data) {

            if (!isValid(stateName)) {
                return res.status(422).send({ status: 1002, message: "stateName is required" })
            }

            if (!isValidStateName(stateName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid stateName" })
            }

            dataObject['stateName'] = stateName
        }

        if ("pincode" in data) {

            if (!isValid(pincode)) {
                return res.status(422).send({ status: 1002, message: "pincode is required" })
            }

            if (!isValidPincode(pincode)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid pincode" })
            }

            dataObject['pincode'] = pincode
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Get-A-Address==========================================================//

const getAddress = async function (req, res, next) {
    try {

        const enteredAdminId = req.params.id

        let checkAdminId = enteredAdminId.split('').length

        if (checkAdminId != 36) {
            return res.status(422).send({ status: 1003, message: "admin-Id is not valid" })
        }

        let paramsAdminId = enteredAdminId

        const checkEnteredAdminId = await Admin.findOne({ where: { id: paramsAdminId } });

        if (!checkEnteredAdminId) {
            return res.status(422).send({ status: 1006, message: "admin-ID does not exists" })
        }

        let data = req.query

        const { userId, userRole, streetName, cityName, stateName, pincode } = data

        if ("userId" in data) {

            if (!isValid(userId)) {
                return res.status(422).send({ status: 1002, message: "userId is required" })
            }

            if (userId.length != 36) {
                return res.status(422).send({ status: 1003, message: "Please enter userId in a correct format" })
            }

            const isRegisteredUserId = await Address.findOne({ where: { id: userId } });

            if (!isRegisteredUserId) {
                return res.status(422).send({ status: 1008, message: "This userId does not belongs to any of the users" })
            }
        }

        if ("userRole" in data) {

            if (isValid(userRole)) {
                return res.status(422).send({ status: 1002, message: "userRole is required" })
            }

            const isRegisteredUserRole = await Address.findOne({ where: { userRole: userRole } });

            if (!isRegisteredUserRole) {
                return res.status(422).send({ status: 1008, message: "This userRole does not exists" })
            }

        }


        if ("streetName" in data) {

            if (!isValid(streetName)) {
                return res.status(422).send({ status: 1002, message: "streetName is required" })
            }

            if (!isValidStreetName(streetName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid streetName" })
            }

            const isRegisteredStreetName = await Address.findOne({ where: { streetName: streetName } });

            if (!isRegisteredStreetName) {
                return res.status(422).send({ status: 1008, message: "This streetName does not belongs to any of the users" })
            }
        }

        if ("cityName" in data) {

            if (!isValid(cityName)) {
                return res.status(422).send({ status: 1002, message: "cityName is required" })
            }

            if (!isValidCityName(cityName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid cityName" })
            }

            const isRegisteredCityName = await Address.findOne({ where: { cityName: cityName } });

            if (!isRegisteredCityName) {
                return res.status(422).send({ status: 1008, message: "This cityName does not belongs to any of the users" })
            }
        }

        if ("stateName" in data) {

            if (!isValid(stateName)) {
                return res.status(422).send({ status: 1002, message: "stateName is required" })
            }

            if (!isValidStateName(stateName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid stateName" })
            }

            const isRegisteredStateName = await Address.findOne({ where: { stateName: stateName } });

            if (!isRegisteredStateName) {
                return res.status(422).send({ status: 1008, message: "This stateName does not belongs to any of the users" })
            }
        }

        if ("pincode" in data) {

            if (!isValid(pincode)) {
                return res.status(422).send({ status: 1002, message: "pincode is required" })
            }

            if (!isValidPincode(pincode)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid pincode" })
            }

            const isRegisteredPincode = await Address.findOne({ where: { pincode: pincode } });

            if (!isRegisteredPincode) {
                return res.status(422).send({ status: 1008, message: "This pincode does not belongs to any of the users" })
            }
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Delete-A-Address==========================================================//

const deleteAddress = async function (req, res, next) {
    try {

        const enteredAdminId = req.params.id

        let checkAdminId = enteredAdminId.split('').length

        if (checkAdminId != 36) {
            return res.status(422).send({ status: 1003, message: "admin-Id is not valid" })
        }

        let paramsAdminId = enteredAdminId

        const checkEnteredAdminId = await Admin.findOne({ where: { id: paramsAdminId } });

        if (!checkEnteredAdminId) {
            return res.status(422).send({ status: 1006, message: "admin-ID does not exists" })
        }

        const enteredId = req.params.addressId

        let checkAddressId = enteredId.split('').length

        if (checkAddressId != 36) {
            return res.status(422).send({ status: 1003, message: "Address-Id is not valid" })
        }

        let addressId = enteredId

        const enteredAddressId = await Address.findOne({ where: { id: addressId } })

        if (!enteredAddressId) {
            return res.status(422).send({ status: 1006, message: "Provided Address-ID does not exists" })
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


module.exports = {
    createAddress,
    updateAddress,
    getAddress,
    deleteAddress
}







