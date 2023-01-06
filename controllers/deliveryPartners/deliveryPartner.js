require("dotenv").config();
const bcrypt = require("bcrypt")
const db = require("../../models");
const { DeliveryPartner } = db
const { Op } = require("sequelize");
const { signAccessToken } = require("../../Utils/jwt")
const nodeKey = process.env.NODE_KEY


//========================================POST /CREATE-A-DELIVERY-PARTNER===================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await DeliveryPartner.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST /LOGIN-FOR-A-DELIVERY-PARTNER================================================//

let login = async (req, res) => {
    try {

        let data = req.body

        let { email, password } = data

        let deliveryPartner = await DeliveryPartner.findOne({ where: { email: email } })

        if (!deliveryPartner) {
            return res.status(422).send({ status: 1003, message: "Invalid Email or Phone credentials" });
        }

        let checkPassword = await bcrypt.compare(password + nodeKey, deliveryPartner.password)

        if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

        const token = await signAccessToken(deliveryPartner.id, deliveryPartner.userRole);

        const tokenData = {
            token: token,
            role: deliveryPartner.userRole
        }

        return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: tokenData })

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-DELIVERY-PARTNER====================================================//

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

//========================================GET/GET-ALL-DELIVERY-PARTNERS=====================================================//

const index = async function (req, res) {
    try {

        const data = req.query

        const { deliveryPartnerId, firstName, lastName, email, phone, joiningDate, bikeAvailable, isApproved, isActive } = data

        if (Object.keys(req.query).length > 0) {
            let findDeliveryPartnerByFilter = await DeliveryPartner.findAll({
                where: {
                    [Op.or]: [
                        { id: { [Op.eq]: deliveryPartnerId } },
                        { firstName: { [Op.eq]: firstName } },
                        { lastName: { [Op.eq]: lastName } },
                        { email: { [Op.eq]: email } },
                        { phone: { [Op.eq]: phone } },
                        { joiningDate: { [Op.eq]: joiningDate } },
                        { bikeAvailable: { [Op.eq]: bikeAvailable } },
                        { isApproved: { [Op.eq]: isApproved } },
                        { isActive: { [Op.eq]: isActive } },
                    ]
                }
            })

            if (!findDeliveryPartnerByFilter.length)
                return res.status(404).send({ status: 1006, message: "No deliveryPartners found as per the filters applied" })

            return res.status(200).send({ status: 1010, data: findDeliveryPartnerByFilter })
        } else {

            let findAllDeliveryPartners = await DeliveryPartner.findAll()

            if (!findAllDeliveryPartners.length)
                return res.status(404).send({ status: 1006, message: "No deliveryPartners found" })

            return res.status(200).send({ status: 1010, data: findAllDeliveryPartners })
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-DELIVERY-PARTNER==================================================//

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
    index,
    destroy
}