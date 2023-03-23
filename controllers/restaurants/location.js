const db = require("../../models");
const { Location, Restaurant } = db
const { Op } = require("sequelize");
const sequelize = require("sequelize")
const axios = require("axios")
const { GOOGLE_MAPS_API_KEY } = process.env;

//======================================POST /CREATE-A-LOCATION====================================================//

const create = async function (req, res) {
    try {

        let data = req.body
        let { restaurantLongitude, restaurantLatitude } = data
        const restaurantCoordinates = { restaurantLongitude: restaurantLongitude, restaurantLatitude: restaurantLatitude };

        const response = await axios.get('https://trueway-geocoding.p.rapidapi.com/ReverseGeocode', {
            params: { location: `${restaurantLatitude},${restaurantLongitude}`, language: 'en' },
            headers: {
                'X-RapidAPI-Key': '0cedc2b70emshe393ecb4154f8a6p13efa6jsn6fcdaa4205ce',
                'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
            }
        });

        // const restaurantAddress = response.data.results[0].formatted_address;


        // const options = {
        //     method: 'GET',
        //     url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
        //     params: { location: `${restaurantLatitude},${restaurantLongitude}`, language: 'en' },
        //     headers: {
        //         'X-RapidAPI-Key': '0cedc2b70emshe393ecb4154f8a6p13efa6jsn6fcdaa4205ce',
        //         'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
        //     }
        // };
        // const response = await axios.request(options)
        console.log(response)

        const locationCreated = await Location.create({
            restaurantId: req.params.id,
            restaurantCoordinates: { type: 'Point', coordinates: [restaurantLongitude, restaurantLatitude] },
            restaurantLongitude: sequelize.literal(`ST_X(ST_Transform(ST_SetSRID(ST_MakePoint(${restaurantCoordinates.restaurantLongitude}, ${restaurantCoordinates.restaurantLatitude}), 4326), 4326))`),
            restaurantLatitude: sequelize.literal(`ST_Y(ST_Transform(ST_SetSRID(ST_MakePoint(${restaurantCoordinates.restaurantLongitude}, ${restaurantCoordinates.restaurantLatitude}), 4326), 4326))`),
            restaurantAddress: response
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

        const axios = require("axios");

        const options = {
          method: 'GET',
          url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
          params: {location: '37.7879493,-122.3961974', language: 'en'},
          headers: {
            'X-RapidAPI-Key': '0cedc2b70emshe393ecb4154f8a6p13efa6jsn6fcdaa4205ce',
            'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
          }
        };
        
        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });

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