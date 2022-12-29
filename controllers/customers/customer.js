require("dotenv").config();
const bcrypt = require("bcrypt")
const db = require("../../models");
const { Customer } = db
const { Op } = require("sequelize");
const { signAccessToken } = require("../../Utils/jwt")
const nodeKey = process.env.NODE_KEY

//========================================POST /CREATE-A-CUSTOMER==========================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await Customer.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST /LOGIN-FOR-A-CUSTOMER==========================================================

let login = async (req, res) => {
    try {

        const data = req.body
        let { email, phone, password } = data

        if (("phone" || "email" in data)) {

            let customer = await Customer.findOne({ where: { [Op.or]: [{ email: { [Op.eq]: email } }, { phone: { [Op.eq]: phone } }] } })

            if (!customer) {
                return res.status(422).send({ status: 1003, message: "Invalid Email or Phone credentials" });
            }

            let checkPassword = await bcrypt.compare(password + nodeKey, customer.password)
            if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

            const token = await signAccessToken(customer.id, customer.userRole);

            const data = {
                token: token,
                role: customer.userRole
            }

            return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: data })

        }

    } catch (error) {
        console.log(error.message);
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

        const updateDetails = await Customer.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};
//========================================GET/GET-A-CUSTOMER==========================================================//

const get = async function (req, res) {
    try {

        let data = req.query

        // let findByFilter = await Customer.findAll({
        //     where: {
        //         [Op.or]: [
        //             { phone: { [Op.eq]: data.phone } },
        //             { email: { [Op.eq]: data.email } },
        //             { city: { [Op.eq]: data.city } },
        //             { locality: { [Op.eq]: data.locality } },
        //             { ordered: { [Op.eq]: data.ordered } },
        //             { unordered: { [Op.eq]: data.unordered } },
        //             { date: { [Op.eq]: data.date } },
        //         ],
        //     },
        // })

        if (!findByFilter) {
            return res.status(404).send({ status: 1008, msg: "No such Data found" })
        }

        return res.status(200).send({ status: 1010, message: 'Timetable for the given the parameters:', data: findByFilter })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};
//========================================GET/GET-ALL-CUSTOMERS==========================================================//

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

//========================================DELETE/DELETE-A-CUSTOMER==========================================================//

const destroy = async function (req, res) {
    try {

        let customerId = req.params.id

        let deleteUser = await Customer.destroy({ where: { id: customerId } })

        return res.status(200).send({ status: 1010, message: "The Customer has been deleted Successfully", data: deleteUser })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create,
    login,
    update,
    get,
    index,
    destroy
}