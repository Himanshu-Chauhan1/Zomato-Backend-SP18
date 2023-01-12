const db = require("../../models")
const { Order, Admin, Customer, Cart, Offer, Address } = db
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

//===================================================Create-A-Order==========================================================//

const createOrder = async function (req, res, next) {
    try {

        const enteredAdminId = req.params.id

        let checkAdminId = enteredAdminId.split('').length

        if (checkAdminId != 36) {
            return res.status(422).send({ status: 1003, message: "admin-Id is not valid" })
        }

        let paramsAdminId = enteredAdminId

        const checkEnteredAdminId = await Admin.findOne({ where: { id: paramsAdminId } });

        if (!checkEnteredAdminId) {
            return res.status(422).send({ status: 1006, message: "admin-ID does not exists" })
        }

        const data = req.body

        const { customerId, restaurantId, offerId, deliveryAddressId } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(restaurantId)) {
            return res.status(422).send({ status: 1002, message: "restaurantId is required" })
        }

        const isRegisteredCustomerId = await Customer.findOne({ where: { id: customerId } });

        if (!isRegisteredCustomerId) {
            return res.status(422).send({ status: 1008, message: "This customerId is not registered, Please enter a registered one" })
        }

        if (!isValid(restaurantId)) {
            return res.status(422).send({ status: 1002, message: "restaurantId is required" })
        }

        const isRegisteredRestaurantId = await Cart.findOne({ where: { restaurantId: restaurantId, customerId: customerId } });

        if (!isRegisteredRestaurantId) {
            return res.status(422).send({ status: 1008, message: "This restaurantId is not registered with your cart, Please enter a registered one" })
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
            where: { customerId: { [Op.eq]: customerId }, restaurantId: { [Op.eq]: restaurantId } },
            attributes: [
                [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalPrice'],
            ]
        });

        const customerCart = await Cart.findAll({
            where: { customerId: { [Op.eq]: customerId }, restaurantId: { [Op.eq]: restaurantId } },
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

        const isRegisteredAddress = await Address.findOne({ where: { id: deliveryAddressId, userId: customerId, userRole: "customer" } });

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

//===================================================Update-A-Order===========================================================//

const updateOrder = async function (req, res, next) {
    try {

        const enteredAdminId = req.params.id

        let checkAdminId = enteredAdminId.split('').length

        if (checkAdminId != 36) {
            return res.status(422).send({ status: 1003, message: "admin-Id is not valid" })
        }

        let paramsAdminId = enteredAdminId

        const checkEnteredAdminId = await Admin.findOne({ where: { id: paramsAdminId } });

        if (!checkEnteredAdminId) {
            return res.status(422).send({ status: 1006, message: "admin-ID does not exists" })
        }

        const enteredOrderId = req.params.orderId

        let checkOrderId = enteredOrderId.split('').length

        if (checkOrderId != 36) {
            return res.status(422).send({ status: 1003, message: "Order-Id is not valid" })
        }

        let paramsOrderId = enteredOrderId

        const checkEnteredOrderId = await Order.findOne({ where: { id: paramsOrderId } });

        if (!checkEnteredOrderId) {
            return res.status(422).send({ status: 1006, message: "Order-ID does not exists" })
        }

        const data = req.body

        const { orderStatus } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("orderStatus" in data) {

            if (!isValid(orderStatus)) {
                return res.status(422).send({ status: 1002, message: "orderStatus is required" })
            }

            if (!(
                orderStatus == 'accepted' ||
                orderStatus == 'rejected' ||
                orderStatus == 'preparing' ||
                orderStatus == 'prepared' ||
                orderStatus == 'takenOver' ||
                orderStatus == 'handedOver' ||
                orderStatus == 'handedOver' ||
                orderStatus == 'onTheWay' ||
                orderStatus == 'delivered' ||
                orderStatus == 'placed' ||
                orderStatus == 'onTheLocation' ||
                orderStatus == 'reachedTheLocation' ||
                orderStatus == 'cancelled'
            )) {
                return res.status(422).send({ status: 1003, message: "orderStatus can only be accepted, rejected, preparing, prepared, takenOver. handedOver, onTheway, delivered, placed, cancelled, onTheLocation and reachedTheLocation" })
            }

            dataObject['orderStatus'] = orderStatus
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}
//===================================================Get-A-Order=============================================================//

const getOrder = async function (req, res, next) {
    try {

        const enteredAdminId = req.params.id

        let checkAdminId = enteredAdminId.split('').length

        if (checkAdminId != 36) {
            return res.status(422).send({ status: 1003, message: "admin-Id is not valid" })
        }

        let paramsAdminId = enteredAdminId

        const checkEnteredAdminId = await Admin.findOne({ where: { id: paramsAdminId } });

        if (!checkEnteredAdminId) {
            return res.status(422).send({ status: 1006, message: "admin-ID does not exists" })
        }

        let data = req.query

        
        const { customerId, orderId, placedTime, deliveryAddressId, restaurantId, orderStatus } = data

        if ("orderId" in data) {

            if (!isValid(orderId)) {
                return res.status(422).send({ status: 1002, message: "orderId is required" })
            }

            let checkOrderId = orderId.split('').length

            if (checkOrderId != 36) {
                return res.status(422).send({ status: 1003, message: "order-Id is not valid please enter in a valid format" })
            }
        }

        if ("customerId" in data) {

            if (!isValid(customerId)) {
                return res.status(422).send({ status: 1002, message: "customerId is required" })
            }

            let checkCustomerId = customerId.split('').length

            if (checkCustomerId != 36) {
                return res.status(422).send({ status: 1003, message: "customer-Id is not valid please enter in a valid format" })
            }
        }

        if ("restaurantId" in data) {

            if (!isValid(customerId)) {
                return res.status(422).send({ status: 1002, message: "restaurantId is required" })
            }

            let checkRestaurantId = restaurantId.split('').length

            if (checkRestaurantId != 36) {
                return res.status(422).send({ status: 1003, message: "restaurant-Id is not valid please enter in a valid format" })
            }
        }

        if ("placedTime" in data) {

            if (!isValid(placedTime)) {
                return res.status(422).send({ status: 1002, message: "placedTime is required" })
            }
        }

        if ("deliveryAddressId" in data) {

            if (!isValid(deliveryAddress)) {
                return res.status(422).send({ status: 1002, message: "deliveryAddress is required" })
            }

            let checkDeliveryAddressId = deliveryAddressId.split('').length

            if (checkDeliveryAddressId != 36) {
                return res.status(422).send({ status: 1003, message: "user-Id is not valid please enter in a valid format" })
            }
        }

        if ("orderStatus" in data) {

            if (!isValid(orderStatus)) {
                return res.status(422).send({ status: 1002, message: "orderStatus is required" })
            }

            if (!(
                orderStatus == 'accepted' ||
                orderStatus == 'rejected' ||
                orderStatus == 'preparing' ||
                orderStatus == 'prepared' ||
                orderStatus == 'takenOver' ||
                orderStatus == 'handedOver' ||
                orderStatus == 'onTheWay' ||
                orderStatus == 'delivered' ||
                orderStatus == 'placed' ||
                orderStatus == 'onTheLocation' ||
                orderStatus == 'reachedTheLocation' ||
                orderStatus == 'cancelled'
            )) {
                return res.status(422).send({ status: 1003, message: "orderStatus can only be accepted, rejected, preparing, prepared, takenOver. handedOver, onTheway, delivered, placed, cancelled, onTheLocation and reachedTheLocation" })
            }
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







