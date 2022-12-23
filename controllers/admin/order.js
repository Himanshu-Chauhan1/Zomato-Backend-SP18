require("dotenv").config();
const db = require("../../models");
const { Cart, Order, Customer } = db


//========================================POST /CREATE-A-ORDER==========================================================//

const create = async function (req, res) {
    try {

        const orderCreated = await Order.create(req.body)

        res.status(201).send({ status: 1009, message: "Your cart has been created successfully", data: orderCreated })
    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-ORDER==========================================================//

const update = async function (req, res) {
    try {
        const orderId = req.params.orderId;
        let data = req.body

        const values = data;
        const condition = { where: { id: orderId } };
        const options = { multi: true };

        const updateDetails = await Order.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered order details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-ORDERS==========================================================//

const index = async function (req, res) {
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

        const enteredCustomer = await Order.findOne({ where: { customerId: customerId } })

        if (!enteredCustomer) {
            return res.status(422).send({ status: 1006, message: "There is no order for this customer" })
        }

        return res.status(200).send({ status: 1010, data: enteredCustomer })

    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};
//========================================GET/DELETE-A-ORDER==========================================================//

const destroy = async function (req, res) {
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

        const enteredCustomer = await Order.findOne({ where: { customerId: customerId } })

        if (!enteredCustomer) {
            return res.status(422).send({ status: 1006, message: "There is no order for this customer" })
        }

        return res.status(200).send({ status: 1010, data: enteredCustomer })

    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};


module.exports = {
    create,
    update,
    index,
    destroy
}