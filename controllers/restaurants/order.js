require("dotenv").config();
const db = require("../../models");
const { Cart, Order, Restaurant } = db
const { Op } = require("sequelize");


//========================================POST/UPDATE-A-ORDER==========================================================//

const update = async function (req, res) {
    try {

        const orderId = req.params.orderId;
        let data = req.body

        const findCustomerId = await Order.findOne({ where: { id: orderId } })

        if (!findCustomerId) {
            return res.status(422).send({ status: 1006, message: "Please enter a correct orderId or this id does not belongs to this customer" })
        }
        
        const customerId = findCustomerId.customerId

        const values = data;
        const condition = { where: { id: orderId, customerId: customerId } };
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

        const enteredRestaurantId = req.params.id

        let valuesFromOrder = await Order.findOne({ where: { restaurantId: enteredRestaurantId } })

        if (!valuesFromOrder) {
            return res.status(422).send({ status: 1006, message: "No Orders Found for this restaurant" })
        }

        const restaurantOrder = await Order.findAndCountAll({
            where: { restaurantId: { [Op.eq]: enteredRestaurantId } },
            attributes: ['id', 'customerId', ['cartItems', 'orderedItems'], 'offerId', 'placedTime', 'price', 'discount', 'finalPrice', 'deliveryAddressId', 'orderStatus'],
        })

        return res.status(200).send({ status: 1010, Orders: restaurantOrder })

    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};


module.exports = {
    update,
    index
}