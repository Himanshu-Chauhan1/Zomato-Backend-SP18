require("dotenv").config();
const db = require("../../models");
const { Cart, Order, Customer } = db
const { Op } = require("sequelize");
const sequelize = require("sequelize");


//========================================POST /CREATE-A-ORDER==========================================================//

const create = async function (req, res) {
    try {

        const orderCreated = await Order.create(req.body)

        res.status(201).send({ status: 1009, message: "Your order has been placed successfully", data: orderCreated })
    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-ORDER==========================================================//

const update = async function (req, res) {
    try {
        const orderId = req.params.orderId;
        let data = req.body

        const values = data;
        const condition = { where: { id: orderId } };
        const options = { multi: true };

        const updateDetails = await Order.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered order details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-ORDERS==========================================================//

const index = async function (req, res) {
    try {

        const enteredCustomerId = req.params.id

        let valuesFromOrder = await Order.findOne({ where: { customerId: enteredCustomerId } })

        if (!valuesFromOrder) {
            return res.status(422).send({ status: 1006, message: "No Orders Found for this customer" })
        }

        const customerOrder = await Order.findAndCountAll({
            where: { customerId: { [Op.eq]: enteredCustomerId } },
            attributes: ['id', 'customerId', 'restaurantId', 'cartItems', 'offerId', 'placedTime', 'price', 'discount', 'finalPrice', 'deliveryAddress'],
        })

        return res.status(200).send({ status: 1010, Orders: customerOrder })

    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};


module.exports = {
    create,
    update,
    index
}