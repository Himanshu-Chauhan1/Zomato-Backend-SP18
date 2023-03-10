const db = require("../../models");
const { Location } = db
const { Op } = require("sequelize");

//======================================POST /CREATE-A-LOCATION====================================================//

const create = async function (req, res) {
    try {

        const locationCreated = await Location.create({
            restaurantId: undefined,
            coordinates: { type: 'Point', coordinates: [req.body.longitude, req.body.latitude] }
        })

        res.status(201).send({ status: 1009, message: "Your location has been saved successfully", data: locationCreated })

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