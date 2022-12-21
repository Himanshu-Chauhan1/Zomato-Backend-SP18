const db = require("../../models");
const { Customer, OrderStatus } = db


//========================================POST /CREATE-A-ORDER-STATUS==========================================================//

const create = async function (req, res) {
    try {

        const orderStatusCreated = await OrderStatus.create(req.body)

        res.status(201).send({ status: 1009, message: "order status has been changed successfully", data: orderStatusCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-ORDER-STATUS==========================================================//

const update = async function (req, res) {
    try {
        const customerId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: customerId } };
        const options = { multi: true };

        const updateDetails = await Customer.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-ORDER-STATUS==========================================================//

const index = async function (req, res) {
    try {

        let customers = await Customer.findAll()

        if (customers.length === 0) {
            return res.status(404).send({ status: 1008, msg: "No Customers found....." })
        }

        return res.status(200).send({ status: 1010, message: 'All Customers:', data: customers })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};


module.exports = {
    create,
    update,
    index
}