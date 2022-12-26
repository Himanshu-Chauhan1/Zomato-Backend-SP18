const db = require("../../models");
const { Query } = db
const { Op } = require("sequelize");
const deliverypartner = require("../../models/deliverypartner");

//========================================POST /CREATE-A-ORDER-QUERY==========================================================//

const create = async function (req, res) {
    try {

        const orderQueryCreated = await Query.create(req.body)

        res.status(201).send({ status: 1009, message: "A new order query has been registered successfully", data: orderQueryCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-ORDER-QUERY==========================================================//

const update = async function (req, res) {
    try {
        const orderQueryId = req.params.queryId
        let data = req.body

        const values = data;
        const condition = { where: { id: orderQueryId } };
        const options = { multi: true };

        const updateDetails = await Query.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered Order query details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-0RDER-QUERY==========================================================//

const index = async function (req, res) {
    try {
        let data = req.query
        const { orderId, userId } = data

        if (Object.keys(req.query).length > 0) {
            let findOrderQueryByFilter = await Query.findAll({
                where: {
                    [Op.or]: [
                        {
                            [Op.and]: [
                                { orderId: { [Op.eq]: orderId } },
                                { isActive: { [Op.eq]: true } },
                                { userRole: { [Op.eq]: "deliverypartner" } },
                                { userId: { [Op.eq]: userId } },
                            ],
                        }
                    ],
                }
            })

            if (!findOrderQueryByFilter.length)
                return res.status(404).send({ status: 1006, message: "No order queries found" })

            return res.status(200).send({ status: 1010, Menu: findOrderQueryByFilter })
        } else {
            let findAllOrderQuery = await Query.findAll({ where: { isActive: true, userRole: "deliverypartner"} })

            if (!findAllOrderQuery.length)
                return res.status(404).send({ status: 1006, message: "No order queries found" })

            return res.status(200).send({ status: 1010, data: findAllOrderQuery })
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