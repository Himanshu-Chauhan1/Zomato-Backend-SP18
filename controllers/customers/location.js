const db = require("../../models");
const { Location } = db
const { Op } = require("sequelize");
const axios = require("axios")
const sequelize = require("sequelize")

//======================================POST /CREATE-A-LOCATION====================================================//

const create = async function (req, res) {
    try {
        let data = req.body
        let { customerLongitude, customerLatitude } = data
        const customerCoordinates = { customerLongitude: customerLongitude, customerLatitude: customerLatitude };

        // const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        //     params: {
        //         latlng: `${customerCoordinates.customerLatitude},${customerCoordinates.customerLongitude}`,
        //         key: 'YOUR_API_KEY'
        //     }
        // });

        // const customerAddress = response.data.results[0].formatted_address;

        const locationCreated = await Location.create({
            restaurantId: undefined,
            customerCoordinates: { type: 'Point', coordinates: [customerLongitude, customerLatitude] },
            customerLongitude: sequelize.literal(`ST_X(ST_Transform(ST_SetSRID(ST_MakePoint(${customerCoordinates.customerLongitude}, ${customerCoordinates.customerLatitude}), 4326), 4326))`),
            customerLatitude: sequelize.literal(`ST_Y(ST_Transform(ST_SetSRID(ST_MakePoint(${customerCoordinates.customerLongitude}, ${customerCoordinates.customerLatitude}), 4326), 4326))`),
            customerAddress: "address"
        })

        res.status(201).send({ status: 1009, message: "Customer location has been saved successfully", data: locationCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//======================================POST /GET-A-LOCATION====================================================//

const getLocation = async function (req, res) {
    try {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };

                    // Save the user's location to the database
                    const locationCreated = await Location.create({
                        restaurantId: undefined,
                        userLocation
                    })


                    res.status(201).send({ status: 1009, message: "Your location has been saved successfully", data: locationCreated })
                },

            );

            // const locationCreated = await Location.create({
            //     restaurantId: undefined,
            //     coordinates: { type: 'Point', coordinates: [req.body.longitude, req.body.latitude] }
            // })

            // res.status(201).send({ status: 1009, message: "Your location has been saved successfully", data: locationCreated })
        }
    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//======================================GET/GET-ALL-LOCATION======================================================//

const index = async function (req, res) {
    try {
        let data = req.query
        const { locationId } = data

        if (Object.keys(req.query).length > 0) {
            let findLocationByFilter = await Location.findAll({
                attributes: ['coordinates'],
                where: {
                    restaurantId: null,
                    attributes: ['coordinates'],
                    [Op.or]: [
                        { locationId: { [Op.eq]: locationId } },
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

        let locationId = req.params.locationId

        let deleteLocation = await Location.destroy({ where: { id: locationId } })

        return res.status(200).send({ status: 1010, message: "The location has been deleted Successfully", data: deleteLocation })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create,
    getLocation,
    index,
    destroy
}