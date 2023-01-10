require("dotenv").config();
const bcrypt = require("bcrypt")
const db = require("../../models");
const JWT = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const { Customer } = db
const { Op } = require("sequelize");
const { signAccessToken } = require("../../Utils/jwt")
const nodeKey = process.env.NODE_KEY

//=========================================POST /CREATE-A-CUSTOMER==========================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await Customer.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST /LOGIN-FOR-A-CUSTOMER========================================================//

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

//========================================POST/UPDATE-A-CUSTOMER============================================================//

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

//========================================GET/GET-ALL-CUSTOMERS=============================================================//

const index = async function (req, res) {
    try {

        let data = req.query
        const { customerId, fullName, email, phone } = data

        if (Object.keys(req.query).length > 0) {
            let findCustomerByFilter = await Customer.findAll({
                where: {
                    [Op.or]: [
                        { id: { [Op.eq]: customerId } },
                        { fullName: { [Op.eq]: fullName } },
                        { email: { [Op.eq]: email } },
                        { phone: { [Op.eq]: phone } }
                    ]
                }
            })

            if (!findCustomerByFilter.length)
                return res.status(404).send({ status: 1006, message: "No customers found as per the filters applied" })

            return res.status(200).send({ status: 1010, data: findCustomerByFilter })
        } else {

            let findAllCustomers = await Customer.findAll()

            if (!findAllCustomers.length)
                return res.status(404).send({ status: 1006, message: "No customers found" })

            return res.status(200).send({ status: 1010, data: findAllCustomers })
        }

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

//========================================PUT/CHANGE-PASSWORD-FOR-A-CUSTOMER================================================//

const change = async function (req, res) {
    try {

        const customerId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: customerId } };
        const options = { multi: true };

        const updateDetails = await Customer.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The password has been changed Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================PUT/RESET-LINK-PASSWORD-FOR-A-CUSTOMER=================================================//

const reset = async function (req, res) {
    try {

        const customer = await Customer.findOne({ where: { email: req.body.email } })

        const token = JWT.sign({
            userId: customer.id,
            userRole: customer.userRole,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (600)
        },
            process.env.RESET_PASSWORD_KEY
        );

        let setResetLink = { resetLink: token }

        const values = setResetLink;
        const condition = { where: { email: req.body.email } };
        const options = { multi: true };

        const updateDetails = await Customer.update(values, condition, options)

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'jerrysingh587@gmail.com',
                pass: 'dzgwmtzlgnjzkcfg'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'jerrysingh587@gmail.com',
            to: customer.email,
            subject: "Account Activation Link",
            html:
                `<h1>Your link to reset the password is</h1>
                 <p>${process.env.CLIENT_URL}+${token}</p>`
        };

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                return res.status(200).send({ status: 1010, message: "Error " + err });
            } else {
                return res.status(200).send({ status: 1010, message: `Email has been sent successfully to ${customer.email} ` });
            }
        });

    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}
//========================================PUT/RESET-PASSWORD-FOR-A-CUSTOMER=================================================//

const verify = async function (req, res) {
    try {

        let userToken = req.params.token

        let verifiedToken = await JWT.verify(userToken, process.env.RESET_PASSWORD_KEY)

        const values = req.body
        const condition = { where: { id: verifiedToken.userId } }
        const options = { multi: true }

        const updateDetails = await Customer.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "Your password has been changed successfully", data: values })

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
    destroy,
    change,
    reset,
    verify
}
