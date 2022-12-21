require("dotenv").config();
const db = require("../../models");
const { Cart, Customer, FoodItem } = db


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

////////////////////////// -GLOBAL- //////////////////////
const isValidArray = function (value) {
    if (!value || typeof value != "object")
        return false;
    return true;
};

//========================================POST /CREATE-A-CUSTOMER==========================================================//

const create = async function (req, res) {
    try {
        const customerId = req.params.id

        if (Object.keys(customerId) == 0) {
            return res.status(400).send({ status: 1006, message: 'kindly provide customerId in path params' })
        }

        const customer = await Customer.findByPk(customerId)

        if (!customer) {
            return res.status(404).send({ status: 1006, message: 'this customer does not found' })
        }

        if (!isValidRequestBody(req.body)) {
            return res.status(400).send({ status: 1002, message: 'kindly provide productid in request body' })
        }


        const cart = await Cart.findOne({ where: { customerId: customerId } })

        if (!cart) {

            let data = req.body

            let { itemId, itemQuantity, totalPrice, totalItems } = data


            if (!isValidArray(itemId)) {
                return res.status(422).send({ status: 1002, message: "LanguagesKnown is Required" })
            }

            if (!Array.isArray(itemId)) {
                return res.status(422).send({ status: 1002, message: "LanguagesKnown is must be an array of String" })
            }

            if (!isValid(itemQuantity)) {
                return res.status(422).send({ status: 1002, message: "itemQuantity is required" })
            }

            if (itemQuantity < 1) {
                return res.status(422).send({ status: 1002, message: "itemQuantity cannot be less than 1" })
            }

            const checkingItemPrice = await FoodItem.findAll({ where: { id: itemId }, attributes: ['itemPrice'] })

            totalPrice = itemQuantity * checkingItemPrice
            totalItems = itemQuantity

            let submitData = {
                customerId: req.params.id,
                itemId: itemId,
                itemQuantity: itemQuantity,
                totalPrice: totalPrice,
                totalItems: totalItems
            }

            const cartData = await Cart.create(submitData)
            return res.status(201).send({ status: 1010, message: 'cart created & product has been added in the cart', data: cartData })
        } else {
            let data = req.body
            let { cartId, itemId, itemQuantity, totalPrice, totalItems } = data

            if (!isValidRequestBody(data)) {
                return res.status(422).send({ status: 1002, message: "Please Provide Details" })
            }

            if (!isValid(cartId)) {
                return res.status(422).send({ status: 1002, message: "cartId is required" })
            }


            if (!isValidArray(itemId)) {
                return res.status(422).send({ status: 1002, message: "LanguagesKnown is Required" })
            }

            if (!Array.isArray(itemId)) {
                return res.status(422).send({ status: 1002, message: "LanguagesKnown is must be an array of String" })
            }

            if (!isValid(itemQuantity)) {
                return res.status(422).send({ status: 1002, message: "itemQuantity is required" })
            }

            if (itemQuantity < 1) {
                return res.status(422).send({ status: 1002, message: "itemQuantity cannot be less than 1" })
            }

            const checkingItemPrice = await FoodItem.findAll({ where: { id: itemId }, attributes: ['itemPrice'] })

            // totalPrice = itemQuantity * checkingItemPrice
            // totalItems = itemQuantity

            const item = cart.itemId
            console.log(item);
            var newQuantity = 1
            for (let i = 0; i < item.length; i++) {
                if (item[i] == itemId) {
                    newQuantity = itemQuantity ++
                    // totalPrice += checkingItemPrice

                }
               console.log(newQuantity);
            }
            // const updatedData = await cartModel.findOneAndUpdate({ _id: cart._id }, { items: item, totalPrice: cart.totalPrice }, { new: true })
            // return res.status(200).send({ status: true, message: 'quantity has been changed', data: updatedData })

            let data1 = {
                customerId: req.params.id,
                itemId: itemId,
                itemQuantity: itemQuantity,
                totalPrice: totalPrice,
                totalItems: newQuantity
            }

            const values = data1;
            const condition = { where: { id: cartId } };
            const options = { multi: true };

            const updatedData1 = await Cart.update(values, condition, options)
            return res.status(200).send({ status: 1010, message: 'item has been added in the cart', data: values })
        }



    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


//========================================POST/UPDATE-A-CUSTOMER==========================================================//

const update = async function (req, res) {
    try {
        const customerId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: customerId } };
        const options = { multi: true };

        const updateDetails = await Cart.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-CUSTOMERS==========================================================//

const index = async function (req, res) {
    try {

        let customers = await Cart.findAll()

        if (customers.length === 0) {
            return res.status(404).send({ status: 1008, msg: "No Cart found....." })
        }

        return res.status(200).send({ status: 1010, message: 'All Carts:', data: customers })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-CUSTOMER==========================================================//

const destroy = async function (req, res) {
    try {

        const customerId = req.params.customerId

        const checkingCart = await Cart.findOne({ where: { customerId: customerId } })

        if (!checkingCart) return res.status(404).send({ status: 1006, message: "Cart does not exist for this customer" })

        let deleteCart = await Customer.destroy({ where: { id: customerId }, items: 0, totalItems: 0, totalPrice: 0 })

        return res.status(200).send({ status: 1010, message: "The cart has been deleted Successfully", data: deleteCart })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}



module.exports = {
    create,
    update,
    index,
    destroy
}