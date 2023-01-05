require("dotenv").config();
const db = require("../../models");
const { Order, Customer } = db


//========================================POST /CREATE-A-ORDER==========================================================//

const create = async function (req, res) {
    try {

        const orderCreated = await Order.create(req.body)

        res.status(201).send({ status: 1009, message: "Your cart has been created successfully", data: orderCreated })
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

        let data = req.query

        const { customerId, orderId, placedTime, deliveryAddressId, restaurantId, orderStatus } = data

        if (Object.keys(req.query).length > 0) {
            let findOrderByFilter = await Order.findAll({
                where: {
                    [Op.or]: [
                        { id: { [Op.eq]: orderId } },
                        { customerId: { [Op.eq]: customerId } },
                        { restaurantId: { [Op.eq]: restaurantId } },
                        { placedTime: { [Op.eq]: placedTime } },
                        { deliveryAddressId: { [Op.eq]: deliveryAddressId } },
                        { orderStatus: { [Op.eq]: orderStatus } },
                    ],
                }
            })

            if (!findOrderByFilter.length)
                return res.status(404).send({ status: 1006, message: "No order found as per the filters applied" })

            return res.status(200).send({ status: 1010, Menu: findOrderByFilter })
        } else {
            let findAllOrders = await Order.findAll({
                attributes: ['id', 'customerId', 'cartItems', 'offerId', 'placedTime', 'price', 'discount', 'finalPrice', 'deliveryAddressId', 'orderStatus']
            })

            if (!findAllOrders.length)
                return res.status(404).send({ status: 1006, message: "No orders found" })

            return res.status(200).send({ status: 1010, data: findAllOrders })
        }

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