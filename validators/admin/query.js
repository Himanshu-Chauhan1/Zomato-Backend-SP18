const db = require("../../models")
const { Query } = db


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

//////////////// -FOR REQUEST-AVILABLE- ///////////////////////
const isValidRequest = (isRequest) => {
    return /^(true|false|True|False)$/.test(isRequest);
};

//////////////// -FOR ACTIVE-AVILABLE- ///////////////////////
const isActiveRequest = (isActive) => {
    return /^(true|false|True|False)$/.test(isActive);
};

//========================================Create-A-Order-Query==========================================================//

const createOrderQuery = async function (req, res, next) {
    try {
        const enteredAdminId = req.params.adminId

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

        const { orderId, userId, queryDescription, userRole, isRequest, isActive } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(orderId)) {
            return res.status(422).send({ status: 1002, message: "orderId is required" })
        }

        const isRegisteredOrderId = await db.Admin.findOne({ where: { id: orderId } });

        if (!isRegisteredOrderId) {
            return res.status(422).send({ status: 1008, message: "This orderId does not exists" })
        }

        if (!isValid(userId)) {
            return res.status(422).send({ status: 1002, message: "orderId is required" })
        }
        const isIdUnique = id =>
            db.findOne({ where: { id: userId }, attributes: ['id'] })
                .then(console.log("Yes"))

        if (!isValid(queryDescription)) {
            return res.status(422).send({ status: 1002, message: "queryDescription is required" })
        }

        data.userRole = "admin".toLocaleLowerCase()

        if (!isValid(isRequest)) {
            return res.status(422).send({ status: 1002, message: "isRequest is required" })
        }

        if (!isValidRequest(isRequest)) {
            return res.status(422).send({ status: 1003, message: "Please provide isRequest like True or false etc" })
        }

        if (!isValid(isActive)) {
            return res.status(422).send({ status: 1002, message: "isRequest is required" })
        }

        if (!isActiveRequest(isActive)) {
            return res.status(422).send({ status: 1003, message: "Please provide isActive like True or false etc" })
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Order-Query==========================================================//

const updateOrderQuery = async function (req, res, next) {
    try {
        const enteredAdminId = req.params.adminId

        let checkAdminId = enteredAdminId.split('').length

        if (checkAdminId != 36) {
            return res.status(422).send({ status: 1003, message: "admin-Id is not valid" })
        }

        let paramsAdminId = enteredAdminId

        const checkEnteredAdminId = await Admin.findOne({ where: { id: paramsAdminId } });

        if (!checkEnteredAdminId) {
            return res.status(422).send({ status: 1006, message: "admin-ID does not exists" })
        }

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

        const { orderId, userId, queryDescription, isRequest, isActive } = data

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

        if ("userId" in data) {

            if (isValid(userId)) {
                return res.status(422).send({ status: 1002, message: "orderId is required" })
            }

            const isIdUnique = id =>
                db.findOne({ where: { id: userId }, attributes: ['id'] })
                    .then(console.log("Yes"))

            dataObject['userId'] = userId
        }

        if ("queryDescription" in data) {

            if (isValid(queryDescription)) {
                return res.status(422).send({ status: 1002, message: "queryDescription is required" })
            }

            dataObject['queryDescription'] = queryDescription
        }

        if ("queryDescription" in data) {

            if (isValid(queryDescription)) {
                return res.status(422).send({ status: 1002, message: "queryDescription is required" })
            }

            dataObject['queryDescription'] = queryDescription
        }

        if ("isRequest" in data) {


            if (!isValid(isRequest)) {
                return res.status(422).send({ status: 1002, message: "isRequest is required" })
            }

            if (!isValidRequest(isRequest)) {
                return res.status(422).send({ status: 1003, message: "Please provide isRequest like True or false etc" })
            }

            dataObject['isRequest'] = isRequest
        }

        if ("isActive" in data) {


            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isRequest is required" })
            }

            if (!isActiveRequest(isActive)) {
                return res.status(422).send({ status: 1003, message: "Please provide isActive like True or false etc" })
            }

            dataObject['isActive'] = isActive
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

        const enteredAdminId = req.params.adminId

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

        const { orderId, userId, queryDescription, isRequest, isActive } = data

        if ("orderId" in data) {

            if (!isValid(orderId)) {
                return res.status(422).send({ status: 1002, message: "orderId is required" })
            }

            const isRegisteredOrderId = await OrderStatus.findOne({ where: { id: orderId } });

            if (!isRegisteredOrderId) {
                return res.status(422).send({ status: 1008, message: "This orderId does not exists" })
            }
        }

        if ("userId" in data) {

            if (isValid(userId)) {
                return res.status(422).send({ status: 1002, message: "orderId is required" })
            }

            const isIdUnique = id =>
                db.findOne({ where: { id: userId }, attributes: ['id'] })
                    .then(console.log("Yes"))

        }

        if ("queryDescription" in data) {

            if (isValid(queryDescription)) {
                return res.status(422).send({ status: 1002, message: "queryDescription is required" })
            }

        }

        if ("userRole" in data) {

            if (!isValid(userRole)) {
                return res.status(422).send({ status: 1002, message: "userRole is required" })
            }

            if (!(
                userRole == 'admin' ||
                userRole == 'Admin' ||
                userRole == 'customer' ||
                userRole == 'Customer' ||
                userRole == 'restaurant' ||
                userRole == 'Restaurant' ||
                userRole == 'Customersupport' ||
                userRole == 'customersupport' ||
                userRole == 'deliverypartner' ||
                userRole == 'Deliverypartner'
            )) {
                return res.status(422).send({ status: 1003, message: "Role can only be admin, customer, customersupport, restaurant, and Delivery Partner" })
            }
        }

        if ("isRequest" in data) {


            if (!isValid(isRequest)) {
                return res.status(422).send({ status: 1002, message: "isRequest is required" })
            }

            if (!isValidRequest(isRequest)) {
                return res.status(422).send({ status: 1003, message: "Please provide isRequest like True or false etc" })
            }

        }

        if ("isActive" in data) {


            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isRequest is required" })
            }

            if (!isActiveRequest(isActive)) {
                return res.status(422).send({ status: 1003, message: "Please provide isActive like True or false etc" })
            }

        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Delete-A-Order-Query==========================================================//

const deleteOrderQuery = async function (req, res, next) {
    try {

        const enteredAdminId = req.params.adminId

        let checkAdminId = enteredAdminId.split('').length

        if (checkAdminId != 36) {
            return res.status(422).send({ status: 1003, message: "admin-Id is not valid" })
        }

        let paramsAdminId = enteredAdminId

        const checkEnteredAdminId = await Admin.findOne({ where: { id: paramsAdminId } });

        if (!checkEnteredAdminId) {
            return res.status(422).send({ status: 1006, message: "admin-ID does not exists" })
        }

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

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


module.exports = {
    createOrderQuery,
    updateOrderQuery,
    getOrderQuery,
    deleteOrderQuery
}







