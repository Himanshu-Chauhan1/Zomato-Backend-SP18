require("dotenv").config();
const db = require("../../models");
const { Offer } = db


//========================================POST /CREATE-A-OFFER==========================================================//

const create = async function (req, res) {
    try {

        const offerCreated = await Offer.create(req.body)

        res.status(201).send({ status: 1009, message: "A new offer has been created successfully", data: offerCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-OFFER==========================================================//

const update = async function (req, res) {
    try {
        const offerId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: offerId } };
        const options = { multi: true };

        const updateDetails = await Offer.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered food details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-FOOD-ITEMS==========================================================//

const index = async function (req, res) {
    try {

        let offer = await Offer.findAll()

        if (offer.length === 0) {
            return res.status(404).send({ status: 1008, msg: "No Offers found....." })
        }

        return res.status(200).send({ status: 1010, message: 'All Offers on Food Items:', data: offer })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-OFFER==========================================================//

const destroy = async function (req, res) {
    try {

        let offerId = req.params.id

        let deleteOffer = await Offer.destroy({ where: { id: offerId } })

        return res.status(200).send({ status: 1010, message: "The offer has been deleted Successfully", data: deleteOffer })
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