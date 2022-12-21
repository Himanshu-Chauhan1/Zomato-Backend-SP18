const db = require("../../models");
const { Customer, OrderStatus } = db
const { Op } = require("sequelize");

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

//========================================POST/UPDATE-A-CUSTOMER==========================================================//

const update = async function (req, res) {
    try {
        const customerId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: customerId } };
        const options = { multi: true };

        const updateDetails = await OrderStatus.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-0RDER-STATUS==========================================================//

const index = async function (req, res) {
    try {

        let data = req.query
        let { orderId, orderStatus } = data

        if (Object.keys(req.query).length > 0) {
            let findOrderStatusByFilter = await OrderStatus.findAll({
                where: {
                    [Op.or]: [{ orderStatus: { [Op.eq]: orderStatus } }, { orderId: { [Op.eq]: orderId } }],
                }
            })

            if (!findOrderStatusByFilter.length)
                return res.status(404).send({ status: 1006, message: "No orders found" })

            return res.status(200).send({ status: 1010, Menu: findOrderStatusByFilter })
        } else {
            let findOrderStatusByFilter = await OrderStatus.findAll()

            if (!findOrderStatusByFilter.length)
                return res.status(404).send({ status: 1006, message: "No orders found" })

            return res.status(200).send({ status: 1010, data: findOrderStatusByFilter })
        }
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