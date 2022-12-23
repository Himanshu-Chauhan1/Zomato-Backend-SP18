const db = require("../../models")
const { Query,DeliveryPartner } = db


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

//========================================Create-A-Order-Query==========================================================//

const createOrderQuery = async function (req, res, next) {
    try {

        const data = req.body

        const { orderId, roleId, queryDescription, isRequest, isActive } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(orderId)) {
            return res.status(422).send({ status: 1002, message: "orderId is required" })
        }

        const isRegisteredOrderId = await DeliveryPartner.findOne({ where: { id: orderId } });

        if (!isRegisteredOrderId) {
            return res.status(422).send({ status: 1008, message: "This orderId does not exists" })
        }

        if (!isValid(roleId)) {
            return res.status(422).send({ status: 1002, message: "roleId is required" })
        }

        const isRegisteredRoleId = await DeliveryPartner.findOne({ where: { id: roleId } });

        if (!isRegisteredRoleId) {
            return res.status(422).send({ status: 1008, message: "This orderId does not exists for any delivery partners" })
        }

        if (!isValid(queryDescription)) {
            return res.status(422).send({ status: 1002, message: "queryDescription is required" })
        }
        
        data.isRole="deliverypartner".toLocaleLowerCase()
        data.isRequest = "false".toLocaleLowerCase()
        data.isActive = "false".toLocaleLowerCase()

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Order-Query==========================================================//

const updateOrderQuery = async function (req, res, next) {
    try {

        const enteredId = req.params.id;

        let checkQueryId = enteredId.split('').length

        if (checkQueryId != 36) {
            return res.status(422).send({ status: 1003, message: "queryId is not valid" })
        }

        let queryId = enteredId

        const enteredOueryId = await Query.findOne({ where: { id: queryId } })

        if (!enteredOueryId) {
            return res.status(422).send({ status: 1006, message: "Provided query-ID does not exists" })
        }

        const data = req.body

        const { orderId, roleId, queryDescription } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("orderId" in data) {

            if (!isValid(orderId)) {
                return res.status(422).send({ status: 1002, message: "orderId is required" })
            }

            const isRegisteredOrderId = await DeliveryPartner.findOne({ where: { id: orderId } });

            if (!isRegisteredOrderId) {
                return res.status(422).send({ status: 1008, message: "This orderId does not exists" })
            }
            dataObject['orderId'] = orderId
        }

        if ("roleId" in data) {

            if (!isValid(roleId)) {
                return res.status(422).send({ status: 1002, message: "roleId is required" })
            }

            const isRegisteredRoleId = await DeliveryPartner.findOne({ where: { id: roleId } });

            if (!isRegisteredRoleId) {
                return res.status(422).send({ status: 1008, message: "This orderId does not exists for any delivery partners" })
            }

            dataObject['roleId'] = roleId
        }

        if ("queryDescription" in data) {

            if (!isValid(queryDescription)) {
                return res.status(422).send({ status: 1002, message: "queryDescription is required" })
            }

            dataObject['queryDescription'] = queryDescription
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Get-A-Order-Query==========================================================//

const getOrderQuery = async function (req, res, next) {
    try {

        let data = req.query

        const { orderId, roleId, queryDescription, isRequest, isActive } = data

        if ("orderId" in data) {

            if (!isValid(orderId)) {
                return res.status(422).send({ status: 1002, message: "orderId is required" })
            }

            const isRegisteredOrderId = await DeliveryPartner.findOne({ where: { id: orderId } });

            if (!isRegisteredOrderId) {
                return res.status(422).send({ status: 1008, message: "This orderId does not exists" })
            }
        }

        if ("roleId" in data) {

            if (!isValid(roleId)) {
                return res.status(422).send({ status: 1002, message: "roleId is required" })
            }

            const isRegisteredRoleId = await DeliveryPartner.findOne({ where: { id: roleId } });

            if (!isRegisteredRoleId) {
                return res.status(422).send({ status: 1008, message: "This orderId does not exists for any delivery partners" })
            }

        }

        if ("queryDescription" in data) {

            if (isValid(queryDescription)) {
                return res.status(422).send({ status: 1002, message: "queryDescription is required" })
            }
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    createOrderQuery,
    updateOrderQuery,
    getOrderQuery
}







