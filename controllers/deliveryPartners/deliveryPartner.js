require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../../models");
const { DeliveryPartner } = db


//========================================POST /CREATE-A-DELIVERY-PARTNER==========================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await DeliveryPartner.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST /LOGIN-FOR-A-DELIVERY-PARTNER==========================================================

let login = async (req, res) => {
    try {

        let data = req.body

        let { email, password } = data

        let deliveryPartner = await DeliveryPartner.findOne({ where: { email: email } })

        if (!deliveryPartner) {
            return res.status(422).send({ status: 1003, message: "Invalid Email or Phone credentials" });
        }

        let checkPassword = await bcrypt.compare(password, deliveryPartner.password)

        if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

        const payload = {
            deliveryPartnerId: deliveryPartner.id,
            issuer: "sparkeighteen.com",
            role: "deliveryPartner",
            exp: Math.floor(Date.now() / 1000) + (8.64e+7)
        };

        const token = jwt.sign({ payload }, process.env.SECRET_KEY)

        const tokenData = {
            token: token,
            role: "deliveryPartner"
        }

        return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: tokenData })

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-DELIVERY-PARTNER==========================================================//

const update = async function (req, res) {
    try {
        const deliveryPartnerId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: deliveryPartnerId } };
        const options = { multi: true };

        const updateDetails = await DeliveryPartner.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-A-DELIVERY-PARTNER==========================================================//

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


//========================================GET/GET-ALL-DELIVERY-PARTNER==========================================================//

const index = async function (req, res) {
    try {

        let deliveryPartner = await DeliveryPartner.findAll()

        if (!deliveryPartner) {
            return res.status(404).send({ status: 1008, msg: "No Delivery Partners found....." })
        }

        return res.status(200).send({ status: 1010, message: 'All Delivery Partners:', data: deliveryPartner })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-DELIVERY-PARTNER==========================================================//

const destroy = async function (req, res) {
    try {

        let delievryPartnerId = req.params.id

        let deleteDeliveryPartner = await DeliveryPartner.destroy({ where: { id: delievryPartnerId } })

        return res.status(200).send({ status: 1010, message: "The Delivery Partner has been deleted Successfully", data: deleteDeliveryPartner })
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