const db = require("../../models")
const { Customer, Cart, FoodItem, Restaurant } = db


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

//////////////// -FOR FULLNAME- ///////////////////////
const isValidFullName = (fullName) => {
    return /^[a-zA-Z ]+$/.test(fullName);
};

//////////////// -FOR MOBILE- ///////////////////////
const isValidPhone = (phone) => {
    return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone);
};

//////////////// -FOR EMAIL- ///////////////////////
const isValidEmail = (email) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};


//========================================Create-A-Customer==========================================================//

const createCart = async function (req, res, next) {
    try {

        const enteredCustomerId = req.params.customerId

        let checkCustomerId = enteredCustomerId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let paramsCustomerId = enteredCustomerId

        const checkEnteredCustomerId = await Customer.findOne({ where: { id: paramsCustomerId } });

        if (!checkEnteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Customer-ID does not exists" })
        }

        if (!isValidRequestBody(req.body)) {
            return res.status(400).send({ status: 1002, message: 'kindly provide itemId in request body' })
        }

        let data = req.body

        let { customerId, restaurantId, itemId, itemQuantity, totalPrice, totalItems } = data

        if (!isValid(customerId)) {
            return res.status(422).send({ status: 1002, message: "customerId is required" })
        }

        const isRegisteredCustomer = await Customer.findOne({ where: { id: customerId } });

        if (!isRegisteredCustomer) {
            return res.status(422).send({ status: 1008, message: "This customer is not registered, Please enter a new one" })
        }

        if (checkEnteredCustomerId.id != customerId) {
            return res.status(400).send({ status: 1003, message: 'this params customerId should match with customerId in body! Enter appropriate customertId in path params and requestbody' })
        }

        if (!isValid(restaurantId)) {

            return res.status(422).send({ status: 1002, message: "restaurantId is required" })
        }

        if (restaurantId.length != 36) {
            return res.status(422).send({ status: 1003, message: "Please enter restaurantId-Id in a valid format" })
        }

        const isRegisteredRestaurantId = await Restaurant.findOne({ where: { id: restaurantId } });

        if (!isRegisteredRestaurantId) {
            return res.status(422).send({ status: 1008, message: "This restaurantId is not registered, Please enter a registered one" })
        }

        if (!isValid(itemId)) {
            return res.status(422).send({ status: 1002, message: "itemId is required" })
        }

        const isRegisteredItem = await FoodItem.findOne({ where: { id: itemId, restaurantId: restaurantId } });

        if (!isRegisteredItem) {
            return res.status(422).send({ status: 1008, message: "This itemId or item is not registered or not active for this restaurant, Please try a new one" })
        }

        const isInCartItem = await Cart.findOne({ where: { itemId: itemId, customerId: customerId, restaurantId: restaurantId } });

        if (isInCartItem) {
            return res.status(422).send({ status: 1008, message: "This itemId or item is already in the cart for this restaurant, Please try a new one" })
        }

        if (!isValid(itemQuantity)) {
            return res.status(422).send({ status: 1002, message: "itemQuantity is required" })
        }

        if (itemQuantity < 1) {
            return res.status(422).send({ status: 1002, message: "itemQuantity cannot be less than 1" })
        }

        const checkingItemPrice = await FoodItem.findOne({ where: { id: itemId } })
        let itemCost = checkingItemPrice.itemPrice

        data.totalPrice = +itemQuantity * +itemCost
        data.totalItems = +itemQuantity

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Customer==========================================================//

const updateCart = async function (req, res, next) {
    try {

        const enteredCustomerId = req.params.customerId

        let checkCustomerId = enteredCustomerId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let customerId = enteredCustomerId

        const checkEnteredCustomerId = await Customer.findOne({ where: { id: customerId } });

        if (!checkEnteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Customer-ID does not exists" })
        }

        const enteredId = req.params.cartId

        let checkCartId = enteredId.split('').length

        if (checkCartId != 36) {
            return res.status(422).send({ status: 1003, message: "Cart-Id is not valid" })
        }

        let cartId = enteredId

        const enteredCartId = await Cart.findOne({ where: { id: cartId } })

        if (!enteredCartId) {
            return res.status(422).send({ status: 1006, message: "Provided Cart-ID does not exists" })
        }

        if (enteredCartId.customerId != customerId) {
            return res.status(400).send({ status: 1003, message: 'this cart does not belongs to you! Enter appropriate cartId' })
        }

        let data = req.body

        let { itemId, itemQuantity, totalPrice, totalItems } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("itemId" in data) {

            if (!isValid(itemId)) {
                return res.status(422).send({ status: 1002, message: "itemId is required" })
            }

            const isRegisteredItem = await FoodItem.findOne({ where: { id: itemId } });

            if (!isRegisteredItem) {
                return res.status(422).send({ status: 1008, message: "This itemId or item is not registered or not active, Please enter a new one" })
            }

            dataObject['itemId'] = itemId
        }

        if ("itemQuantity" in data) {

            if (!isValid(itemQuantity)) {
                return res.status(422).send({ status: 1002, message: "itemQuantity is required" })
            }

            if (itemQuantity < 1) {
                return res.status(422).send({ status: 1002, message: "itemQuantity cannot be less than 1" })
            }

            dataObject['itemQuantity'] = itemQuantity
        }

        if ("itemQuantity" && "itemId" in data) {

            const checkingItemPrice = await FoodItem.findOne({ where: { id: itemId } })
            let itemCost = checkingItemPrice.itemPrice

            const checkingItemQuantity = await Cart.findOne({ where: { id: cartId } })
            let oldQuantity = checkingItemQuantity.itemQuantity

            data.totalPrice = (+oldQuantity + +itemQuantity) * itemCost
            data.totalItems = (+itemQuantity + +oldQuantity)

            dataObject['totalPrice'] = totalPrice
            dataObject['totalItems'] = totalItems
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Delete-A-Customer==========================================================//

const deleteCart = async function (req, res, next) {
    try {


        const enteredCustomerId = req.params.customerId

        let checkCustomerId = enteredCustomerId.split('').length

        if (checkCustomerId != 36) {
            return res.status(422).send({ status: 1003, message: "Customer-Id is not valid" })
        }

        let customerId = enteredCustomerId

        const checkEnteredCustomerId = await Customer.findOne({ where: { id: customerId } });

        if (!checkEnteredCustomerId) {
            return res.status(422).send({ status: 1006, message: "Customer-ID does not exists" })
        }

        const enteredId = req.params.cartId

        let checkCartId = enteredId.split('').length

        if (checkCartId != 36) {
            return res.status(422).send({ status: 1003, message: "Cart-Id is not valid" })
        }

        let cartId = enteredId

        const enteredCartId = await Cart.findOne({ where: { id: cartId } })

        if (!enteredCartId) {
            return res.status(422).send({ status: 1006, message: "Provided Cart-ID does not exists" })
        }

        if (enteredCartId.customerId !== customerId) {
            return res.status(400).send({ status: 1003, message: 'this cart does not belongs to you! Enter appropriate cartId' })
        } else {
            next()
        }


    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};


module.exports = {
    createCart,
    updateCart,
    deleteCart
}







