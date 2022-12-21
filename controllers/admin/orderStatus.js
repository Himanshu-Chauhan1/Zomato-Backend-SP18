const db = require("../../models");
const { Customer, OrderStatus } = db


//========================================POST /CREATE-A-ORDER-STATUS==========================================================//

const create = async function (req, res) {
    try {

        const orderStatusCreated = await OrderStatus.create(req.body)

        res.status(201).send({ status: 1009, message: "A new order status has been created successfully", data: orderStatusCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-ORDER-STATUS==========================================================//

const update = async function (req, res) {
    try {
        const orderStatusId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: orderStatusId } };
        const options = { multi: true };

        const updateDetails = await OrderStatus.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered Order status details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-ORDER-STATUS==========================================================//

const index = async function (req, res) {
    try {

        let customers = await OrderStatus.findAll()

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

//========================================DELETE/DELETE-A-ORDER-STATUS==========================================================//

const destroy = async function (req, res) {
    try {

        let orderStatusId = req.params.id

        let deleteRestaurant = await OrderStatus.destroy({ where: { id: orderStatusId } })

        return res.status(200).send({ status: 1010, message: "The order status has been deleted Successfully", data: deleteRestaurant })
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