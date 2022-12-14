require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../../models");
const { Admin } = db


//========================================POST /CREATE-A-SUPER-ADMIN==========================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await Admin.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST /LOGIN-FOR-A-SUPER-ADMIN==========================================================

let login = async (req, res) => {
    try {

        let data = req.body

        let { email, phone, password } = data

        if ("email" in data) {
            let admin = await Admin.findOne({ where: { email: email } })
            if (!admin) {
                return res.status(422).send({ status: 1003, message: "Invalid Email or Phone credentials" });
            }

            let checkPassword = await bcrypt.compare(password, admin.password)
            if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

            const payload = {
                adminId: admin.id,
                issuer: "sparkeighteen.com",
                role: "admin",
                exp: Math.floor(Date.now() / 1000) + (8.64e+7)
            };

            const token = jwt.sign({ payload }, process.env.SECRET_KEY)

            const data = {
                token: token,
                role: "admin"
            }

            return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: data })

        }
        if ("phone" in data) {
            let admin = await Admin.findOne({ where: { phone: phone } })
            if (!admin) {
                return res.status(422).send({ status: 1003, message: "Invalid Email or Phone credentials" });
            }

            let checkPassword = await bcrypt.compare(password, admin.password)
            if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

            const payload = {
                adminId: admin.id,
                issuer: "sparkeighteen.com",
                role: "admin",
                exp: Math.floor(Date.now() / 1000) + (8.64e+7)
            };

            const token = jwt.sign({ payload }, process.env.SECRET_KEY)

            console.log(token.role);

            const data = {
                token: token,
                role: "admin"
            }

            return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: data })

        }

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create,
    login
}