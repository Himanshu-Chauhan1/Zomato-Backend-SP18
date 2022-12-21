const db = require("../../models")
const { OrderStatus } = db


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

//========================================Create-A-OrderStatus==========================================================//

const createOrderStatus = async function (req, res, next) {
    try {

        const data = req.body

        const { orderId, orderStatus } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(orderId)) {
            return res.status(422).send({ status: 1002, message: "orderId is required" })
        }

        const isRegisteredOrderId = await OrderStatus.findOne({ where: { id: orderId } });

        if (!isRegisteredOrderId) {
            return res.status(422).send({ status: 1008, message: "This orderId does not exists" })
        }

        if (!isValid(orderStatus)) {
            return res.status(422).send({ status: 1002, message: "orderStatus is required" })
        }
  
        if (!(
            orderStatus == 'accepted' ||
            orderStatus == 'rejected' ||
            orderStatus == 'preparing' ||
            orderStatus == 'prepared' ||
            orderStatus == 'handedOver' 
        )) {
            return res.status(422).send({ status: 1003, message: "orderStatus can only be accepted, rejected, preparing, prepared and handedOver" })
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-OrderStatus==========================================================//

const updateOrderStatus = async function (req, res, next) {
    try {

        const enteredId = req.params.id;

        let checkOrderStatusId = enteredId.split('').length

        if (checkOrderStatusId != 36) {
            return res.status(422).send({ status: 1003, message: "orderStatus-Id is not valid" })
        }

        let orderStatusId = enteredId

        const enteredOrderStatusId = await Customer.findOne({ where: { id: orderStatusId } })

        if (!enteredOrderStatusId) {
            return res.status(422).send({ status: 1006, message: "Provided orderStatus-ID does not exists" })
        }

        const data = req.body

        const { orderId, orderStatus } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("orderId" in data) {
            
            if (!isValid(orderId)) {
                return res.status(422).send({ status: 1002, message: "orderId is required" })
            }
    
            const isRegisteredOrderId = await OrderStatus.findOne({ where: { id: orderId } });
    
            if (!isRegisteredOrderId) {
                return res.status(422).send({ status: 1008, message: "This orderId does not exists" })
            }
            dataObject['orderId'] = orderId
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
                orderStatus == 'handedOver' 
            )) {
                return res.status(422).send({ status: 1003, message: "orderStatus can only be accepted, rejected, preparing, prepared and handedOver" })
            }

            dataObject['orderStatus'] = orderStatus
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    createOrderStatus,
    updateOrderStatus
}







