const db = require("../../models")
const { Order, Customer, Cart, Offer, Address } = db
const moment = require('moment');
const { Op } = require("sequelize");
const sequelize = require("sequelize");


////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

//////////////// -FOR EMPTY BODY- ///////////////////////
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};


//========================================Create-A-Order==========================================================//

const createOrder = async function (req, res, next) {
    try {

        const enteredCustomerId = req.params.id

        let checkCustomerId = enteredCustomerId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let paramsCustomerId = enteredCustomerId

        const checkEnteredCustomerId = await Customer.findOne({ where: { id: paramsCustomerId } });

        if (!checkEnteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Customer-ID does not exists" })
        }

        const data = req.body

        const { restaurantId, offerId, deliveryAddressId } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        data.customerId = paramsCustomerId

        if (!isValid(restaurantId)) {
            return res.status(422).send({ status: 1002, message: "restaurantId is required" })
        }

        const isRegisteredRestaurantId = await Cart.findOne({ where: { restaurantId: restaurantId, customerId: paramsCustomerId } });

        if (!isRegisteredRestaurantId) {
            return res.status(422).send({ status: 1008, message: "This restaurantId is not registered with your cart, Please enter a registered one" })
        }

        const isAlreadyPlacedOrder = await Order.findOne({ where: { restaurantId: restaurantId, customerId: paramsCustomerId } });

        if (isAlreadyPlacedOrder) {
            return res.status(422).send({ status: 1008, message: "A order is already placed from this restaurant, please choose a another restaurant to make a new order" })
        }

        if ("offerId" in data) {

            if (!isValid(offerId)) {
                return res.status(422).send({ status: 1002, message: "offerId is required" })
            }

            if (offerId.length != 36) {
                return res.status(422).send({ status: 1003, message: "Please enter offer-Id in a valid format" })
            }

            const isRegisteredOfferId = await Offer.findOne({ where: { id: offerId, restaurantId: restaurantId } });

            if (!isRegisteredOfferId) {
                return res.status(422).send({ status: 1008, message: "This offerId is not registered with this restaurant, Please enter a registered one" })
            }
        }

        const totalAmount = await Cart.findOne({
            where: { customerId: { [Op.eq]: enteredCustomerId }, restaurantId: { [Op.eq]: restaurantId } },
            attributes: [
                [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalPrice'],
            ]
        });

        const customerCart = await Cart.findAll({
            where: { customerId: { [Op.eq]: enteredCustomerId }, restaurantId: { [Op.eq]: restaurantId } },
            attributes: ['restaurantId', 'itemId', 'totalItems', 'totalPrice'],
        })

        data.cartItems = customerCart
        data.placedTime = moment().format('MMMM Do YYYY, h:mm:ss a')

        data.price = totalAmount.totalPrice

        let findOfferId = await Offer.findOne({ where: { restaurantId: restaurantId } })

        const isRegisteredDiscountPrice = await Offer.findOne({ where: { id: findOfferId.id, restaurantId: restaurantId } });
        let discountPercentage = isRegisteredDiscountPrice.discount

        if ("offerId" in data) {

            data.discount = discountPercentage
            let changedPrice = (data.price - (data.price * discountPercentage / 100))
            data.finalPrice = changedPrice

        } else {

            data.discount = 0
            let changedPrice = (data.price - (data.price * data.discount / 100))
            data.finalPrice = changedPrice
        }

        if (!isValid(deliveryAddressId)) {
            return res.status(422).send({ status: 1002, message: "deliveryAddressId is required" })
        }

        if (deliveryAddressId.length != 36) {
            return res.status(422).send({ status: 1003, message: "Please enter deliveryAddress-Id in a valid format" })
        }

        const isRegisteredAddress = await Address.findOne({ where: { id: deliveryAddressId, userId: paramsCustomerId, userRole: "customer" } });

        if (!isRegisteredAddress) {
            return res.status(422).send({ status: 1008, message: "This address is not registered with this customer, Please enter a registered one" })
        }

        data.orderStatus = "placed"

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Order==========================================================//

const updateOrder = async function (req, res, next) {
    try {

        const enteredCustomerId = req.params.id

        let checkCustomerId = enteredCustomerId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let customerId = enteredCustomerId

        const checkEnteredCustomerId = await Customer.findOne({ where: { id: customerId } });

        if (!checkEnteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Customer-ID does not exists" })
        }

        const enteredId = req.params.orderId

        let checkOrderId = enteredId.split('').length

        if (checkOrderId != 36) {
            return res.status(422).send({ status: 1003, message: "Order-Id is not valid" })
        }

        let orderId = enteredId

        const enteredOrderId = await Order.findOne({ where: { id: orderId } })

        if (!enteredOrderId) {
            return res.status(422).send({ status: 1006, message: "Provided Order-ID does not exists" })
        }

        let data = req.body

        let { restaurantId, orderStatus } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if (!isValid(restaurantId)) {
            return res.status(422).send({ status: 1002, message: "restaurantId is required" })
        }

        if (restaurantId.length != 36) {
            return res.status(422).send({ status: 1003, message: "Please enter restaurant-Id in a valid format" })
        }

        const isRegisteredRestaurantId = await Order.findOne({ where: { restaurantId: restaurantId, customerId: enteredCustomerId } });

        if (!isRegisteredRestaurantId) {
            return res.status(422).send({ status: 1008, message: "This restaurantId is not registered with your order, Please enter a registered one" })
        }

        if ("orderStatus" in data) {

            if (!isValid(orderStatus)) {
                return res.status(422).send({ status: 1002, message: "orderStatus is required" })
            }

            if (!(orderStatus == 'cancelled')) {
                return res.status(422).send({ status: 1003, message: "orderStatus can only be cancelled only" })
            }

            dataObject['orderStatus'] = orderStatus
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Get-A-Order==========================================================//

const getOrder = async function (req, res, next) {
    try {

        const enteredCustomerId = req.params.id

        let checkCustomerId = enteredCustomerId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let customerId = enteredCustomerId

        const checkEnteredCustomerId = await Customer.findOne({ where: { id: customerId } });

        if (!checkEnteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Customer-ID does not exists" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    createOrder,
    updateOrder,
    getOrder
}







