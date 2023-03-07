const db = require("../../models")
const { Location, Restaurant } = db

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

        const enteredRestaurantId = req.params.id

        let checkRestaurantId = enteredRestaurantId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let paramsRestaurantId = enteredRestaurantId

        const checkEnteredRestaurantId = await Restaurant.findOne({ where: { id: paramsRestaurantId } });

        if (!checkEnteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "Restaurant-ID does not exists" })
        }

        const data = req.body

        const point = { type: 'Point', coordinates: [70, 80] }; // GeoJson format: [lng, lat]

        // User.create({ username: 'username', geometry: point });

        // const { longitude, latitude } = req.body

        // data.restaurantId = paramsRestaurantId

        // if (!isValidRequestBody(data)) {
        //     return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        // }

        // if (!isValidNumber(longitude)) {
        //     return res.status(422).send({ status: 1002, message: "longitude is required" })
        // }

        // if (!isValidNumber(latitude)) {
        //     return res.status(422).send({ status: 1002, message: "latitude is required" })
        // }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Location==========================================================//

const updateLocation = async function (req, res, next) {
    try {

        const enteredRestaurantId = req.params.id

        let checkRestaurantId = enteredRestaurantId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let paramsRestaurantId = enteredRestaurantId

        const checkEnteredRestaurantId = await Restaurant.findOne({ where: { id: paramsRestaurantId } });

        if (!checkEnteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "Restaurant-ID does not exists" })
        }

        const enteredId = req.params.locationId

        let checkLocationId = enteredId.split('').length

        if (checkLocationId != 36) {
            return res.status(422).send({ status: 1003, message: "Location-Id is not valid" })
        }

        let locationId = enteredId

        const enteredLocationId = await FoodItem.findOne({ where: { id: locationId, restaurantId: paramsRestaurantId } })

        if (!enteredLocationId) {
            return res.status(422).send({ status: 1006, message: "Provided Location-ID does not exists" })
        }

        const data = req.body

        const { longitude, latitude } = req.body

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }


        if ("longitude" in data) {

            if (!isValid(longitude)) {
                return res.status(422).send({ status: 1002, message: "longitude is required" })
            }

            dataObject['longitude'] = longitude
        }

        if ("latitude" in data) {

            if (!isValid(latitude)) {
                return res.status(422).send({ status: 1002, message: "latitude is required" })
            }

            dataObject['latitude'] = latitude
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

        const enteredRestaurantId = req.params.id

        let checkRestaurantId = enteredRestaurantId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let paramsRestaurantId = enteredRestaurantId

        const checkEnteredRestaurantId = await Restaurant.findOne({ where: { id: paramsRestaurantId } });

        if (!checkEnteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "There is no restaurant with this Restaurant-ID" })
        }

        let data = req.query

        const { locationId, restaurantId } = data

        if ("locationId" in data) {

            if (!isValid(locationId)) {
                return res.status(422).send({ status: 1002, message: "locationId is required" })
            }

            let checkLocationId = locationId.split('').length

            if (checkLocationId != 36) {
                return res.status(422).send({ status: 1003, message: "Location-Id is not valid format" })
            }

        }

        if ("restaurantId" in data) {

            if (!isValid(restaurantId)) {
                return res.status(422).send({ status: 1002, message: "restaurantId is required" })
            }

            let checkRestaurantId = restaurantId.split('').length

            if (checkRestaurantId != 36) {
                return res.status(422).send({ status: 1003, message: "restaurantId is not valid format" })
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

        const enteredRestaurantId = req.params.id

        let checkRestaurantId = enteredRestaurantId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let paramsRestaurantId = enteredRestaurantId

        const checkEnteredRestaurantId = await Restaurant.findOne({ where: { id: paramsRestaurantId } });

        if (!checkEnteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "Restaurant-ID does not exists" })
        }

        const enteredId = req.params.locationId

        let checkLocationId = enteredId.split('').length

        if (checkLocationId != 36) {
            return res.status(422).send({ status: 1003, message: "Location-Id is not valid" })
        }

        let locationId = enteredId

        const enteredLocationId = await FoodItem.findOne({ where: { id: locationId, restaurantId: paramsRestaurantId } })

        if (!enteredLocationId) {
            return res.status(422).send({ status: 1006, message: "Provided Location-ID does not exists" })
        }

        next()
    }
    catch (err) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

module.exports = {
    createLocation,
    updateLocation,
    getLocation,
    deleteLocation
}







