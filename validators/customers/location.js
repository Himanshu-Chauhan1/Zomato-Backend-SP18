const db = require("../../models")
const { Location } = db

////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

////////////////////////// -GLOBAL- //////////////////////
const isValidNumber = function (value) {
    if (!value || typeof value != "number")
        return false;
    return true;
};

//////////////// -FOR EMPTY BODY- ///////////////////////
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

//========================================Create-A-FoodItem==========================================================//

const createLocation = async function (req, res, next) {
    try {

        let data = req.body

        const { customerLongitude, customerLatitude } = data;

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValidNumber(customerLongitude)) {
            return res.status(422).send({ status: 1002, message: "customerLongitude is required" })
        }

        if ((customerLongitude < -180 || customerLongitude > 180)) {
            return res.status(422).send({ status: 1002, message: "Invalid customerLongitude!, Longitude must be between -180 and 180 degrees inclusive" })
        }

        if (!isValidNumber(customerLatitude)) {
            return res.status(422).send({ status: 1002, message: "latitude is required" })
        }

        if ((customerLatitude < -90 || customerLatitude > 90)) {
            return res.status(422).send({ status: 1002, message: "Invalid customerLatitude!, Latitude must be between -90 and 90 degrees inclusive" })
        }

        const customerCoordinates = { type: 'Point', coordinates: [customerLongitude, customerLatitude] }

        const checkForEmptyLocation = await Location.findAll()

        if (checkForEmptyLocation.length > 0) {
            const checkForSameLocation = await Location.findOne({
                limit: 1,
                attributes: ['customerCoordinates'],
                order: [['createdAt', 'DESC']]
            });

            if ((checkForSameLocation.customerCoordinates.coordinates.toString() === customerCoordinates.coordinates.toString())) {
                return res.status(422).send({ status: 1006, message: "This location is already saved, Please enter a new one" })
            }
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Get-All-Location==========================================================//

const getLocation = async function (req, res, next) {
    try {

        let data = req.query

        const { locationId } = data

        if ("locationId" in data) {

            if (!isValid(locationId)) {
                return res.status(422).send({ status: 1002, message: "locationId is required" })
            }

            let checkLocationId = locationId.split('').length

            if (checkLocationId != 36) {
                return res.status(422).send({ status: 1003, message: "Location-Id is not valid format" })
            }

        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Delete-A-Location==========================================================//

const deleteLocation = async function (req, res, next) {
    try {

        next()
    }
    catch (err) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

module.exports = {
    createLocation,
    getLocation,
    deleteLocation
}







