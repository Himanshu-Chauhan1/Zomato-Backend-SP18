const db = require("../../models");
const { Location, Restaurant } = db
const { Op } = require("sequelize");

//======================================POST /CREATE-A-LOCATION====================================================//

const create = async function (req, res) {
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

        const point = { type: 'Point', coordinates: [req.body.lng, req.body.lat] };
        const locationCreated = await Location.create({
            restaurantId: paramsRestaurantId,
            coordinates: point
        })

        res.status(201).send({ status: 1009, message: "A new location has been registered successfully", data: locationCreated })

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
        const { locationId, restaurantId,coordinates } = data

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
                replacements: {coordinates:parseFloat(coordinates)},
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