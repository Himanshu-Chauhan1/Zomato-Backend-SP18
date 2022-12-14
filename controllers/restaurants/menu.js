require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../../models");
const { Restaurant } = db


//========================================POST /CREATE-A-MENU==========================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await Restaurant.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


//========================================POST/UPDATE-A-MENU==========================================================//

const update = async function (req, res) {
    try {
        const restaurantId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: restaurantId } };
        const options = { multi: true };

        const updateDetails = await Restaurant.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-MENU==========================================================//

const index = async function (req, res) {
    try {

        let restaurant = await Restaurant.findAll()

        if (!restaurant) {
            return res.status(404).send({ status: 1008, msg: "No Restaurants found....." })
        }

        return res.status(200).send({ status: 1010, message: 'All Restaurants:', data: restaurant })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-MENU==========================================================//

const destroy = async function (req, res) {
    try {

        let restaurantId = req.params.id

        let deleteRestaurant = await Restaurant.destroy({ where: { id: restaurantId } })

        return res.status(200).send({ status: 1010, message: "The Customer has been deleted Successfully", data: deleteRestaurant })
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