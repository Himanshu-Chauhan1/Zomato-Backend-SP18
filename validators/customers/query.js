const db = require("../../models")
const { Query, Customer } = db

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

        const { orderId, userId, queryDescription, userRole, isRequest, isActive } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(orderId)) {
            return res.status(422).send({ status: 1002, message: "orderId is required" })
        }

        const isRegisteredOrderId = await Customer.findOne({ where: { id: orderId } });

        if (!isRegisteredOrderId) {
            return res.status(422).send({ status: 1008, message: "This orderId does not exists" })
        }

        if (!isValid(userId)) {
            return res.status(422).send({ status: 1002, message: "userId is required" })
        }

        const isRegistereduserId = await Customer.findOne({ where: { id: userId } });

        if (!isRegistereduserId) {
            return res.status(422).send({ status: 1008, message: "This orderId does not exists for any customers" })
        }

        if (!isValid(queryDescription)) {
            return res.status(422).send({ status: 1002, message: "queryDescription is required" })
        }

        data.userRole = "customer".toLocaleLowerCase()
        data.isRequest = "false".toLocaleLowerCase()
        data.isActive = "true".toLocaleLowerCase()

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Order-Query==========================================================//

const updateOrderQuery = async function (req, res, next) {
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

        const enteredId = req.params.queryId

        let checkQueryId = enteredId.split('').length

        if (checkQueryId != 36) {
            return res.status(422).send({ status: 1003, message: "queryId is not valid" })
        }

        let queryId = enteredId

        const enteredOueryId = await Query.findOne({ where: { id: queryId } })

        if (!enteredOueryId) {
            return res.status(422).send({ status: 1006, message: "Provided query-ID does not exists" })
        }

        if (enteredOueryId.userId != userId) {
            return res.status(400).send({ status: 1003, message: 'this query does not belongs to you! Enter appropriate queryId' })
        }

        const data = req.body

        const { orderId, userId, queryDescription } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("orderId" in data) {

            if (!isValid(orderId)) {
                return res.status(422).send({ status: 1002, message: "orderId is required" })
            }

            const isRegisteredOrderId = await Customer.findOne({ where: { id: orderId } });

            if (!isRegisteredOrderId) {
                return res.status(422).send({ status: 1008, message: "This orderId does not exists" })
            }
            dataObject['orderId'] = orderId
        }

        if ("userId" in data) {

            if (isValid(!userId)) {
                return res.status(422).send({ status: 1002, message: "userId is required" })
            }

            const isRegistereduserId = await Customer.findOne({ where: { id: userId } });

            if (!isRegistereduserId) {
                return res.status(422).send({ status: 1008, message: "This orderId does not exists for any customers" })
            }

            dataObject['userId'] = userId
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

        let data = req.query

        const { orderId, userId } = data


        if ("orderId" in data) {

            if (!isValid(orderId)) {
                return res.status(422).send({ status: 1002, message: "orderId is required" })
            }

            let checkOrderId = orderId.split('').length

            if (checkOrderId != 36) {
                return res.status(422).send({ status: 1003, message: "order-Id is not valid please enter in a valid format" })
            }
        }

        if ("userId" in data) {

            if (!isValid(userId)) {
                return res.status(422).send({ status: 1002, message: "userId is required" })
            }

            let checkUserId = userId.split('').length

            if (checkUserId != 36) {
                return res.status(422).send({ status: 1003, message: "user-Id is not valid please enter in a valid format" })
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







