const db = require("../../models")
const { Order, DeliveryPartner } = db


////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

//========================================Update-A-Order==========================================================//

const updateOrder = async function (req, res, next) {
    try {

        const enteredDeliveryPartnerId = req.params.id

        let checkDeliveryPartnerId = enteredDeliveryPartnerId.split('').length

        if (checkDeliveryPartnerId != 36) {
            return res.status(422).send({ status: 1003, message: "deliveryPartner-Id is not valid" })
        }

        let paramsDeliveryPartnerId = enteredDeliveryPartnerId

        const checkEnteredDeliveryPartnerId = await DeliveryPartner.findOne({ where: { id: paramsDeliveryPartnerId } });

        if (!checkEnteredDeliveryPartnerId) {
            return res.status(422).send({ status: 1006, message: "deliveryPartner-ID does not exists" })
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

        let data = req.body

        let { orderStatus } = data

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
                orderStatus == 'takenOver' ||
                orderStatus == 'onTheWay' ||
                orderStatus == 'delivered' ||
                orderStatus == 'onTheLocation' ||
                orderStatus == 'reachedTheLocation'
            )) {
                return res.status(422).send({ status: 1003, message: "orderStatus can only be accepted, rejected, takenOver, onTheway, delivered, onTheLocation and reachedTheLocation" })
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

        const enteredDeliveryPartnerId = req.params.id

        let checkDeliveryPartnerId = enteredDeliveryPartnerId.split('').length

        if (checkDeliveryPartnerId != 36) {
            return res.status(422).send({ status: 1003, message: "deliveryPartner-Id is not valid" })
        }

        let paramsDeliveryPartnerId = enteredDeliveryPartnerId

        const checkEnteredDeliveryPartnerId = await DeliveryPartner.findOne({ where: { id: paramsDeliveryPartnerId } });

        if (!checkEnteredDeliveryPartnerId) {
            return res.status(422).send({ status: 1006, message: "deliveryPartner-ID does not exists" })
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
                orderStatus == 'takenOver' ||
                orderStatus == 'onTheWay' ||
                orderStatus == 'delivered' ||
                orderStatus == 'onTheLocation' ||
                orderStatus == 'reachedTheLocation'
            )) {
                return res.status(422).send({ status: 1003, message: "orderStatus can only be accepted, rejected, takenOver, onTheway, delivered, onTheLocation and reachedTheLocation" })
            }

        }


        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    updateOrder,
    getOrder
}







