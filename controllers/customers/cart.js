require("dotenv").config();
const db = require("../../models");
const { Cart, Customer, FoodItem } = db
const { Op } = require("sequelize");
const sequelize = require("sequelize");


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
        const customerId = req.params.id;
        let data = req.body


        let valuesFromCart = await Cart.findOne({ where: { customerId: customerId } })

        const values = data;
        const condition = { where: { customerId: customerId, restaurantId: valuesFromCart.restaurantId, itemId: valuesFromCart.itemId } };
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

        const enteredCustomerId = req.params.id

        let valuesFromCart = await Cart.findOne({ where: { customerId: enteredCustomerId } })

        if (!valuesFromCart) {
            return res.status(422).send({ status: 1006, message: "No Customer Cart Found..." })
        }

        const customerCart = await Cart.findAll({
            where: { customerId: { [Op.eq]: enteredCustomerId } },
            attributes: ['itemId','itemPrice', 'totalItems', 'totalPrice'],
        })

        return res.status(200).send({ status: 1010, CartData: customerCart })

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
        const customerId = req.params.id

        let valuesFromCart = await Cart.findOne({ where: { customerId: customerId } })

        let findCustomerCart = await Cart.destroy({ customerId: customerId, restaurantId: valuesFromCart.restaurantId })

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