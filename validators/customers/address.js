const db = require("../../models")
const { Address, Customer } = db
const { Op } = require("sequelize");


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

//////////////// -FOR STREET-AVILABLE- ///////////////////////
const isValidStreetName = (streetName) => {
    return /^\s*\S+(?:\s+\S+){2}/.test(streetName);
};

//////////////// -FOR CITY-AVILABLE- ///////////////////////
const isValidCityName = (cityName) => {
    return /([a-zA-Z]+|[a-zA-Z]+\\s[a-zA-Z]+)/.test(cityName);
};

//////////////// -FOR STATE-AVILABLE- ///////////////////////
const isValidStateName = (cityName) => {
    return /([a-zA-Z]+|[a-zA-Z]+\\s[a-zA-Z]+)/.test(cityName);
};

//////////////// -FOR PINCODE-AVILABLE- ///////////////////////
const isValidPincode = (pincode) => {
    return /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(pincode);
};

//==================================================Create-A-Address==========================================================//

const createAddress = async function (req, res, next) {
    try {

        const enteredCustomerId = req.params.id

        let checkCustomerId = enteredCustomerId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let paramsCustomerId = enteredCustomerId

        const checkEnteredCustomerId = await Customer.findOne({ where: { id: paramsCustomerId } });

        if (!checkEnteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Customer-ID does not exists" })
        }

        const data = req.body

        const { streetName, cityName, stateName, pincode } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        data.userId = paramsCustomerId

        data.userRole = "customer".toLocaleLowerCase()

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
            return res.status(422).send({ status: 1003, message: "Please provide a valid pincode" })
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//==================================================Update-A-Address==========================================================//

const updateAddress = async function (req, res, next) {
    try {

        const enteredCustomerId = req.params.id

        let checkCustomerId = enteredCustomerId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let paramsCustomerId = enteredCustomerId

        const checkEnteredCustomerId = await Customer.findOne({ where: { id: paramsCustomerId } });

        if (!checkEnteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Customer-ID does not exists" })
        }

        const enteredId = req.params.addressId

        let checkAddressId = enteredId.split('').length

        if (checkAddressId != 36) {
            return res.status(422).send({ status: 1003, message: "Address-Id is not valid" })
        }

        let addressId = enteredId

        const enteredAddressId = await Address.findOne({ where: { id: addressId, userRole: { [Op.eq]: 'customer' } } })

        if (!enteredAddressId) {
            return res.status(422).send({ status: 1006, message: "Provided Address-ID does not belongs to any of the customers" })
        }

        if (enteredAddressId.userId != userId) {
            return res.status(400).send({ status: 1003, message: 'this address does not belongs to you! Enter appropriate addressId' })
        }

        const data = req.body

        const { userId, streetName, cityName, stateName, pincode } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
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

//==================================================Get-A-Address=============================================================//

const getAddress = async function (req, res, next) {
    try {

        const enteredCustomerId = req.params.id

        let checkCustomerId = enteredCustomerId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let paramsCustomerId = enteredCustomerId

        const checkEnteredCustomerId = await Customer.findOne({ where: { id: paramsCustomerId } });

        if (!checkEnteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Customer-ID does not exists" })
        }

        let data = req.query

        const { userId, streetName, cityName, stateName, pincode } = data

        if ("userId" in data) {

            if (!isValid(userId)) {
                return res.status(422).send({ status: 1002, message: "userId is required" })
            }

            if (userId.length != 36) {
                return res.status(422).send({ status: 1003, message: "Please enter userId in a correct format" })
            }

            const isRegisteredUserId = await Address.findOne({ where: { id: paramsCustomerId, userRole: { [Op.eq]: 'customer' } } });

            if (!isRegisteredUserId) {
                return res.status(422).send({ status: 1008, message: "This userId does not belongs to any of the customers" })
            }
        }

        if ("streetName" in data) {

            if (!isValid(streetName)) {
                return res.status(422).send({ status: 1002, message: "streetName is required" })
            }

            if (!isValidStreetName(streetName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid streetName" })
            }

            const isRegisteredStreetName = await Address.findOne({ where: { streetName: streetName, userRole: { [Op.eq]: 'customer' } } });

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

            const isRegisteredCityName = await Address.findOne({ where: { cityName: cityName, userRole: { [Op.eq]: 'customer' } } });

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

            const isRegisteredStateName = await Address.findOne({ where: { stateName: stateName, userRole: { [Op.eq]: 'customer' } } });

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

            const isRegisteredPincode = await Address.findOne({ where: { pincode: pincode, userRole: { [Op.eq]: 'customer' } } });

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

//=================================================Delete-A-Address==========================================================//

const deleteAddress = async function (req, res, next) {
    try {

        const enteredCustomerId = req.params.id

        let checkCustomerId = enteredCustomerId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let paramsCustomerId = enteredCustomerId

        const checkEnteredCustomerId = await Customer.findOne({ where: { id: paramsCustomerId } });

        if (!checkEnteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Customer-ID does not exists" })
        }

        const enteredId = req.params.addressId

        let checkAddressId = enteredId.split('').length

        if (checkAddressId != 36) {
            return res.status(422).send({ status: 1003, message: "Address-Id is not valid" })
        }

        let addressId = enteredId

        const enteredAddressId = await Address.findOne({ where: { id: addressId, userRole: { [Op.eq]: 'customer' } } })

        if (!enteredAddressId) {
            return res.status(422).send({ status: 1006, message: "Provided Address-ID does not exists" })
        }

        if (enteredAddressId.userId != userId) {
            return res.status(400).send({ status: 1003, message: 'this address does not belongs to you! Enter appropriate addressId' })
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







