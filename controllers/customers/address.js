const db = require("../../models");
const { Address } = db
const { Op } = require("sequelize");

//========================================POST /CREATE-A-ADDRESS==========================================================//

const create = async function (req, res) {
    try {

        const addressCreated = await Address.create(req.body)

        res.status(201).send({ status: 1009, message: "A new order address has been created successfully", data: addressCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-ADDRESS==========================================================//

const update = async function (req, res) {
    try {
        const addressId = req.params.addressId;
        let data = req.body

        const values = data;
        const condition = { where: { id: addressId } };
        const options = { multi: true };

        const updateDetails = await Address.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered Address details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-ADDRESS==========================================================//

const index = async function (req, res) {
    try {
        let data = req.query
        const { userId, streetName, cityName, stateName, pincode } = data
        let customerId = req.params.id

        if (Object.keys(req.query).length > 0) {
            let findOrderAddressByFilter = await Address.findAll({
                where: {
                    userRole: { [Op.eq]: "customer" },
                    [Op.or]: [
                        { userId: { [Op.eq]: customerId } },
                        { streetName: { [Op.eq]: streetName } },
                        { cityName: { [Op.eq]: cityName } },
                        { stateName: { [Op.eq]: stateName } },
                        { pincode: { [Op.eq]: pincode } },
                    ],
                }
            })

            if (!findOrderAddressByFilter.length)
                return res.status(404).send({ status: 1006, message: "No Addresses found" })

            return res.status(200).send({ status: 1010, Menu: findOrderAddressByFilter })
        } else {
            let findAllAddress = await Address.findAll({ where: { userRole: "customer", userId: customerId } })

            if (!findAllAddress.length)
                return res.status(404).send({ status: 1006, message: "No Addresses found" })

            return res.status(200).send({ status: 1010, data: findAllAddress })
        }

    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-ADDRESS==========================================================//

const destroy = async function (req, res) {
    try {

        let addressId = req.params.addressId

        let deleteAddress = await Address.destroy({ where: { id: addressId } })

        return res.status(200).send({ status: 1010, message: "The address has been deleted Successfully", data: deleteAddress })
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