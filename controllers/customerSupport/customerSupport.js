require("dotenv").config();
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const db = require("../../models");
const { CustomerSupport } = db
const { Op } = require("sequelize");
const { signAccessToken } = require("../../Utils/jwt")
const nodeKey = process.env.NODE_KEY


//========================================POST /CREATE-A-CUSTOMER-SUPPORT====================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await CustomerSupport.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST /LOGIN-FOR-A-CUSTOMER-SUPPORT================================================//

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

//========================================POST/UPDATE-A-CUSTOMER-SUPPORT====================================================//

const update = async function (req, res) {
    try {
        const customerSupportId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: customerSupportId } };
        const options = { multi: true };

        const updateDetails = await CustomerSupport.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-CUSTOMER-SUPPORTS=====================================================//

const index = async function (req, res) {
    try {

        const data = req.query

        const { customerSupportId, firstName, lastName, email, phone, joiningDate, departmentName, isApproved, isActive } = data

        if (Object.keys(req.query).length > 0) {
            let findCustomerSupportByFilter = await CustomerSupport.findAll({
                where: {
                    [Op.or]: [
                        { id: { [Op.eq]: customerSupportId } },
                        { firstName: { [Op.eq]: firstName } },
                        { lastName: { [Op.eq]: lastName } },
                        { email: { [Op.eq]: email } },
                        { phone: { [Op.eq]: phone } },
                        { joiningDate: { [Op.eq]: joiningDate } },
                        { departmentName: { [Op.eq]: departmentName } },
                        { isApproved: { [Op.eq]: isApproved } },
                        { isActive: { [Op.eq]: isActive } },
                    ]
                }
            })

            if (!findCustomerSupportByFilter.length)
                return res.status(404).send({ status: 1006, message: "No customerSupports found as per the filters applied" })

            return res.status(200).send({ status: 1010, data: findCustomerSupportByFilter })
        } else {

            let findAllCustomerSupports = await CustomerSupport.findAll()

            if (!findAllCustomerSupports.length)
                return res.status(404).send({ status: 1006, message: "No customerSupports found" })

            return res.status(200).send({ status: 1010, data: findAllCustomerSupports })
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-CUSTOMER-SUPPORT==================================================//

const destroy = async function (req, res) {
    try {

        let customerSupportId = req.params.id

        let deleteRestaurant = await CustomerSupport.destroy({ where: { id: customerSupportId } })

        return res.status(200).send({ status: 1010, message: "The customerSupport has been deleted Successfully", data: deleteRestaurant })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================PUT/CHANGE-PASSWORD-FOR-A-CUSTOMER-SUPPORT================================================//

const change = async function (req, res) {
    try {

        const customerSupportId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: customerSupportId } };
        const options = { multi: true };

        const updateDetails = await CustomerSupport.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The password has been changed Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================POST/RESET-LINK-PASSWORD-FOR-A-CUSTOMER-SUPPORT===========================================//

const reset = async function (req, res) {
    try {

        const customerSupport = await CustomerSupport.findOne({ where: { email: req.body.email } })

        const token = JWT.sign({
            userId: customerSupport.id,
            userRole: customerSupport.userRole,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (600)
        },
            process.env.RESET_PASSWORD_KEY
        );

        let setResetLink = { resetLink: token }

        const values = setResetLink;
        const condition = { where: { email: req.body.email } };
        const options = { multi: true };

        const updateDetails = await CustomerSupport.update(values, condition, options)

        const transporter = nodemailer.createTransport({
            host: process.env.HOST_NAME,
            port: process.env.HOST_PORT_NUMBER,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: customerSupport.email,
            subject: "Account Activation Link",
            html:
                `<h1>Your link to reset the password is</h1>
                 <p>${process.env.CLIENT_URL}${token}</p>`
        };

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                return res.status(200).send({ status: 1010, message: "Error " + err });
            } else {
                return res.status(200).send({ status: 1010, message: `Email has been sent successfully to ${customerSupport.email} ` });
            }
        });

    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================POST/RESET-PASSWORD-FOR-A-CUSTOMER-SUPPORT=================================================//

const verify = async function (req, res) {
    try {

        let userToken = req.params.token

        let verifiedToken = await JWT.verify(userToken, process.env.RESET_PASSWORD_KEY)

        const values = req.body
        const condition = { where: { id: verifiedToken.userId } }
        const options = { multi: true }

        const updateDetails = await CustomerSupport.update(values, condition, options)

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