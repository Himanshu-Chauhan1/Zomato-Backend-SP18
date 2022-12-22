const db = require("../../models");
const { OrderStatus } = db
const { Op } = require("sequelize");

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