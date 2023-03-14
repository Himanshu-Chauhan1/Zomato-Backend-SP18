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

//=======================================GET/GET-ALL-PLACES-WITHIN-THE-GIVEN-RADIUS====================================================//

const validateRestaurantsNearby = async function (req, res, next) {
    try {

        let data = req.body
        let { customerLatitude, customerLongitude, radiusInKM } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValidNumber(customerLatitude)) {
            return res.status(422).send({ status: 1002, message: "customerLatitude is required" })
        }

        // if (!(customerLatitude <= -90 || customerLatitude >= 90)) {
        //     return res.status(422).send({ status: 1002, message: "Invalid customerLatitude!, Latitude must be between -90 and 90 degrees inclusive" })
        // }

        if (!isValidNumber(customerLongitude)) {
            return res.status(422).send({ status: 1002, message: "customerLongitude is required" })
        }

        // if (!(customerLongitude <= -180 || customerLongitude >= 180)) {
        //     return res.status(422).send({ status: 1002, message: "Invalid customerLongitude!, Longitude must be between -180 and 180 degrees inclusive" })
        // }

        if ("radiusInKM" in data) {
            if (!isValidNumber(radiusInKM)) {
                return res.status(422).send({ status: 1002, message: "radiusInKM is required, and must be a Number" })
            }
        }

        next()
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

module.exports = {
    validateRestaurantsNearby
}







