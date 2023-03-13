const db = require("../../models");
const { Location, Restaurant } = db
const { Op } = require("sequelize");
const sequelize = require("sequelize")
const axios = require("axios")
const GoogleMapsAPI = require('googlemaps');
const { promisify } = require('util');
const { GOOGLE_MAPS_API_KEY } = process.env;


//======================================POST /CREATE-A-LOCATION====================================================//

const create = async function (req, res) {
    try {

        let data = req.body
        let { restaurantLongitude, restaurantLatitude } = data
        const restaurantCoordinates = { restaurantLongitude: restaurantLongitude, restaurantLatitude: restaurantLatitude };

        // const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        //     params: {
        //         latlng: `${restaurantCoordinates.restaurantLatitude},${restaurantCoordinates.restaurantLongitude}`,
        //         key: 'YOUR_API_KEY'
        //     }
        // });

        // const restaurantAddress = response.data.results[0].formatted_address;

        const locationCreated = await Location.create({
            restaurantId: req.params.id,
            restaurantCoordinates: { type: 'Point', coordinates: [restaurantLongitude, restaurantLatitude] },
            restaurantLongitude: sequelize.literal(`ST_X(ST_Transform(ST_SetSRID(ST_MakePoint(${restaurantCoordinates.restaurantLongitude}, ${restaurantCoordinates.restaurantLatitude}), 4326), 4326))`),
            restaurantLatitude: sequelize.literal(`ST_Y(ST_Transform(ST_SetSRID(ST_MakePoint(${restaurantCoordinates.restaurantLongitude}, ${restaurantCoordinates.restaurantLatitude}), 4326), 4326))`),
            restaurantAddress: "address"
        })

        res.status(201).send({ status: 1009, message: "Restaurant location has been saved successfully", data: locationCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//======================================POST/UPDATE-A-LOCATION====================================================//

const update = async function (req, res) {
    try {
        const locationId = req.params.locationId
        let data = req.body

        const values = data;
        const condition = { where: { id: locationId } };
        const options = { multi: true };

        const updateDetails = await Location.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered location details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//======================================GET/GET-ALL-LOCATION======================================================//

const index = async function (req, res) {
    try {
        let data = req.query
        const { locationId, restaurantId, coordinates } = data

        if (Object.keys(req.query).length > 0) {
            let findLocationByFilter = await Location.findAll({
                where: {
                    [Op.or]: [
                        { locationId: { [Op.eq]: locationId } },
                        { restaurantId: { [Op.eq]: restaurantId } },
                    ],
                }
            })

            if (!findLocationByFilter.length)
                return res.status(404).send({ status: 1006, message: "No location found as per the filters" })

            return res.status(200).send({ status: 1010, data: findLocationByFilter })
        } else {
            let findAllLocations = await Location.findAll({
                replacements: { coordinates: parseFloat(coordinates) },
            })

            if (!findAllLocations.length)
                return res.status(404).send({ status: 1006, message: "No Location found" })

            return res.status(200).send({ status: 1010, data: findAllLocations })
        }

    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//=======================================DELETE/DELETE-A-LOCATION====================================================//

const destroy = async function (req, res) {
    try {


        let paramsRestaurantId = req.params.id
        let locationId = req.params.locationId

        let deleteLocation = await Location.destroy({ where: { id: locationId, restaurantId: paramsRestaurantId } })

        return res.status(200).send({ status: 1010, message: "The location has been deleted Successfully", data: deleteLocation })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//=======================================GET/GET-ALL-PLACES-WITHIN-THE-GIVEN-RADIUS====================================================//

const places = async function (req, res) {
    try {

        let data = req.body
        let { customerLongitude, customerLatitude, restaurantLatitude, restaurantLongitude } = data

        let findCoordinates=await Location.findOne()

        const customerCoordinates = { customerLatitude: customerLatitude, customerLongitude: customerLongitude };
        const restaurantCoordinates = { restaurantLatitude: restaurantLatitude, restaurantLongitude: restaurantLongitude };

        // Create a Google Maps client
        const googleMaps = new GoogleMapsAPI({
            key: GOOGLE_MAPS_API_KEY,
            secure: true
        });

        // Get places between coordinates
        const params = {
            location: `${(customerCoordinates.customerLatitude + restaurantCoordinates.restaurantLatitude) / 2},${(customerCoordinates.customerLongitude + restaurantCoordinates.restaurantLongitude) / 2}`,
            radius: Math.max(
                googleMaps.distance(customerCoordinates.customerLatitude, restaurantCoordinates.restaurantLongitude, restaurantCoordinates.restaurantLatitude, restaurantCoordinates.restaurantLongitude) / 2,
                500 // minimum radius of 500 meters
            ),
            key: GOOGLE_MAPS_API_KEY
        };
        const places = await promisify(googleMaps.places.bind(googleMaps))(params);

        return res.status(200).send({ status: 1010, message: "All places between the entered radius:", data: places })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}



module.exports = {
    create,
    update,
    index,
    destroy,
    places
}