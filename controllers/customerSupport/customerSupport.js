require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../../models");
const { CustomerSupport } = db
const { Op } = require("sequelize");
const { signAccessToken } = require("../../Utils/jwt")
const nodeKey = process.env.NODE_KEY


//========================================POST /CREATE-A-CUSTOMER-SUPPORT==========================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await CustomerSupport.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST /LOGIN-FOR-A-CUSTOMER-SUPPORT==========================================================

let login = async (req, res) => {
    try {

        let data = req.body

        let { email, password } = data

        let customerSupport = await CustomerSupport.findOne({ where: { email: email } })

        if (!customerSupport) {
            return res.status(422).send({ status: 1003, message: "Invalid Email or Phone credentials" });
        }

        let checkPassword = await bcrypt.compare(password + nodeKey, customerSupport.password)
        if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

        const token = await signAccessToken(customerSupport.id, customerSupport.userRole);

        const tokendata = {
            token: token,
            role: customerSupport.userRole
        }

        return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: tokendata })

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-CUSTOMER-SUPPORT==========================================================//

const update = async function (req, res) {
    try {
        const restaurantId = req.params.customerSupportId;
        let data = req.body

        const values = data;
        const condition = { where: { id: restaurantId } };
        const options = { multi: true };

        const updateDetails = await CustomerSupport.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-A-CUSTOMERSUPPORT==========================================================//

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

//========================================GET/GET-ALL-CUSTOMER-SUPPORTS==========================================================//

const index = async function (req, res) {
    try {

        let customerSupport = await CustomerSupport.findAll()

        if (customerSupport === 0) {
            return res.status(404).send({ status: 1008, msg: "No Customer Supports Executives found....." })
        }

        return res.status(200).send({ status: 1010, message: 'All Customer Supports:', data: customerSupport })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-CUSTOMER-SUPPORT==========================================================//

const destroy = async function (req, res) {
    try {

        let restaurantId = req.params.customerSupportId

        let deleteRestaurant = await CustomerSupport.destroy({ where: { id: restaurantId } })

        return res.status(200).send({ status: 1010, message: "The Customer has been deleted Successfully", data: deleteRestaurant })
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