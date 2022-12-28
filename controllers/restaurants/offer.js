require("dotenv").config();
const db = require("../../models");
const { Offer } = db
const { Op } = require("sequelize");


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
        const offerId = req.params.offerId
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

//========================================GET/GET-ALL-OFFERS==========================================================//

const index = async function (req, res) {
    try {

        let data = req.query
        let paramsRestaurantId = req.params.restaurantId

        const { categoryName, offerName, dateActiveFrom, dateActiveTo, isActive } = data

        if (Object.keys(req.query).length > 0) {
            let findOffersByFilter = await Offer.findAll({
                where: {
                    restaurantId: { [Op.eq]: paramsRestaurantId },
                    [Op.or]: [
                        { categoryName: { [Op.eq]: categoryName } },
                        { offerName: { [Op.eq]: offerName } },
                        { dateActiveFrom: { [Op.eq]: dateActiveFrom } },
                        { dateActiveTo: { [Op.eq]: dateActiveTo } },
                        { isActive: { [Op.eq]: isActive } },
                    ],
                }
            })

            if (!findOffersByFilter.length)
                return res.status(404).send({ status: 1006, message: "No offers found as per the filters....." })

            return res.status(200).send({ status: 1010, data: findOffersByFilter })
        } else {
            let findAllOffers = await Offer.findAll({ where: { restaurantId: paramsRestaurantId } })

            if (!findAllOffers.length)
                return res.status(404).send({ status: 1006, message: "No offers found...." })

            return res.status(200).send({ status: 1010, data: findAllOffers })
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-OFFER==========================================================//

const destroy = async function (req, res) {
    try {

        let offerId = req.params.offerId
        let paramsRestaurantId = req.params.restaurantId

        let deleteOffer = await Offer.destroy({ where: { id: offerId, restaurantId: paramsRestaurantId } })

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