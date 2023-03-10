const db = require("../../models");
const { Location, Restaurant } = db
const { Op } = require("sequelize");
const sequelize = require("sequelize")
const axios = require("axios")


//======================================POST /CREATE-A-LOCATION====================================================//

const create = async function (req, res) {
    try {

        let data = req.body
        let { longitude, latitude } = data
        const coordinates = { longitude: longitude, latitude: latitude };

        // const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        //     params: {
        //         latlng: `${coordinates.latitude},${coordinates.longitude}`,
        //         key: 'YOUR_API_KEY'
        //     }
        // });

        // const address = response.data.results[0].formatted_address;

        const locationCreated = await Location.create({
            restaurantId: req.params.id,
            coordinates: { type: 'Point', coordinates: [longitude, latitude] },
            longitude: await sequelize.literal(`ST_X(ST_Transform(ST_SetSRID(ST_MakePoint(${coordinates.longitude}, ${coordinates.latitude}), 4326), 4326))`),
            latitude: await sequelize.literal(`ST_Y(ST_Transform(ST_SetSRID(ST_MakePoint(${coordinates.longitude}, ${coordinates.latitude}), 4326), 4326))`),
            address: "address"
        })

        res.status(201).send({ status: 1009, message: "Your location has been saved successfully", data: locationCreated })

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

module.exports = {
    create,
    update,
    index,
    destroy
}