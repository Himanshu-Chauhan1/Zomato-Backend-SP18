require("dotenv").config();
const db = require("../../models");
const { Cart, Customer } = db


//========================================POST /CREATE-A-CUSTOMER==========================================================//

const create = async function (req, res) {
    try {

        const customerId = req.params.id

        const checkCartExist = await Cart.findOne({ where: { id: customerId } })

        if (!checkCartExist) {
            let data = req.body
            let { customerId, itemId, itemQuantity, totalPrice, totalItems } = data

            const createCart = await Cart.create(data)
            return res.status(201).send({ status: true, message: "Success", data: createCart })
        } else {
            let data = req.body
            let { cartId, itemId, itemQuantity, totalItems, totalPrice } = data
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