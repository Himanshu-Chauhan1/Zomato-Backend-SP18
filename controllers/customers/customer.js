require("dotenv").config();
const bcrypt = require("bcrypt")
const db = require("../../models");
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

//========================================PUT/FORGOT-PASSWORD-FOR-A-CUSTOMER================================================//

const change = async function (req, res) {
    try {

        let adminId = req.params.id

        let data = req.body

        let { email } = data

        if (("phone" || "email" in data)) {

            let admin = await Admin.findOne({ where: { [Op.or]: [{ email: { [Op.eq]: email } }] } })

            if (!admin) {
                return res.status(422).send({ status: 1003, message: "Invalid Email credentials" });
            }

            const token = await signAccessToken(admin.id, admin.userRole);

            const linkData = { resetLink: token }

            const values = linkData;
            const condition = { where: { id: adminId } };
            const options = { multi: true };

            const updateDetails = await Admin.update(values, condition, options)

            return res.status(200).send({ status: 1010, message: "Your reset link to change the password", data: linkData })
        }

    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================PUT/RESET-PASSWORD-FOR-A-CUSTOMER=================================================//

const reset1 = async function (req, res) {
    try {

        console.log('object');

        let data = req.body

        let { email } = data


        const customer = await Customer.findOne({ where: { email: email } })

        if (!customer) {
            return res.status(404).send({ status: 1006, message: "Customer with this email does not exists" });
        }

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'jerrysingh587@gmail.com', // generated ethereal user
                pass: 'Himanshu@12345'  // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: 'jerrysingh587@gmail.com', // sender address
            to: customer.email, // list of receivers
            subject: "Your Password for ProjectMynt Admin",
            html: "Your Password for ProjectMynt Admin is " + customer.password
        };


        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Email sent successfully");
            }
        });

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
    reset1
}
