require("dotenv").config();
const db = require("../../models");
const { Cart, Customer } = db
const { Op } = require("sequelize");


//========================================POST /CREATE-A-CART==========================================================//

const create = async function (req, res) {
    try {

        const cartCreated = await Cart.create(req.body)

        res.status(201).send({ status: 1009, message: "Your cart has been created successfully", data: cartCreated })
    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-CART==========================================================//

const update = async function (req, res) {
    try {
        const cartId = req.params.cartId;
        let data = req.body

        const values = data;
        const condition = { where: { id: cartId } };
        const options = { multi: true };

        const updateDetails = await Cart.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered cart details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-A-CART==========================================================//

const index = async function (req, res) {
    try {

        const enteredCustomerId = req.params.customerId

        let checkCustomerId = enteredCustomerId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let customerId = enteredCustomerId

        const checkEnteredCustomerId = await Customer.findOne({ where: { id: customerId } });

        if (!checkEnteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Customer-ID does not exists" })
        }

        let findRestaurantId = await Cart.findOne({ where: { customerId: customerId } })

        let findCustomerCart = await Cart.findAll({
            where: { [Op.and]: [{ customerId: customerId, isActive: true, restaurantId: findRestaurantId.restaurantId }] }
        })

        if (!findCustomerCart) {
            return res.status(422).send({ status: 1006, message: "There is no cart for this customer" })
        }

        return res.status(200).send({ status: 1010, CartData: findCustomerCart })

    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-CART==========================================================//

const destroy = async function (req, res) {
    try {

        const cartId = req.params.cartId
        const customerId = req.params.customerId

        let findCustomerCart = await Cart.findAll({
            where: { [Op.and]: [{ customerId: customerId, isActive: true }] }
        })

        if (!findCustomerCart) {
            return res.status(422).send({ status: 1006, message: "There is no cart for this customer" })
        }

        let deleteCart = await Cart.destroy({ where: { id: cartId, customerId: customerId } })

        return res.status(200).send({ status: 1010, message: "The cart has been deleted Successfully", data: deleteCart })
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