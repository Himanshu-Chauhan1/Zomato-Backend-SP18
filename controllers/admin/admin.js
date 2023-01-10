require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../../models");
const { Admin } = db
const { Op } = require("sequelize");
const { signAccessToken } = require("../../Utils/jwt")
const nodeKey = process.env.NODE_KEY

//========================================POST /CREATE-A-ADMIN==========================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await Admin.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST /LOGIN-FOR-A-ADMIN=======================================================//

let login = async (req, res) => {
    try {

        let data = req.body

        let { email, phone, password } = data

        if (("phone" || "email" in data)) {

            let admin = await Admin.findOne({ where: { [Op.or]: [{ email: { [Op.eq]: email } }, { phone: { [Op.eq]: phone } }] } })

            if (!admin) {
                return res.status(422).send({ status: 1003, message: "Invalid Email or Phone credentials" });
            }

            let checkPassword = await bcrypt.compareSync(password + nodeKey, admin.password)
            if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

            const token = await signAccessToken(admin.id, admin.userRole);

            const data = {
                token: token,
                role: admin.userRole
            }

            return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: data })

        }

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-ADMIN===========================================================//

const update = async function (req, res) {
    try {
        const adminId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: adminId } };
        const options = { multi: true };

        const updateDetails = await Admin.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-A-ADMIN===============================================================//

const index = async function (req, res) {
    try {

        let data = req.query
        const { adminId, fullName, email, phone } = data

        if (Object.keys(req.query).length > 0) {
            let findAdminByFilter = await Admin.findAll({
                where: {
                    [Op.or]: [
                        { id: { [Op.eq]: adminId } },
                        { fullName: { [Op.eq]: fullName } },
                        { email: { [Op.eq]: email } },
                        { phone: { [Op.eq]: phone } }
                    ]
                }
            })

            if (!findAdminByFilter.length)
                return res.status(404).send({ status: 1006, message: "No Admins found as per the filters applied" })

            return res.status(200).send({ status: 1010, data: findAdminByFilter })
        } else {

            let findAllAdmins = await Admin.findAll()

            if (!findAllAdmins.length)
                return res.status(404).send({ status: 1006, message: "No Admins found" })

            return res.status(200).send({ status: 1010, data: findAllAdmins })
        }

    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-ADMIN==========================================================//

const destroy = async function (req, res) {
    try {

        let adminId = req.params.id

        let deleteRestaurant = await Admin.destroy({ where: { id: adminId } })

        return res.status(200).send({ status: 1010, message: "The Admin has been deleted Successfully", data: deleteRestaurant })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================PUT/FORGOT-PASSWORD-FOR-A-ADMIN================================================//

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

//========================================PUT/RESET-PASSWORD-FOR-A-ADMIN=================================================//

const reset = async function (req, res) {
    try {

        let adminId = req.params.id

        let data = req.body

        let { resetLink, password } = data

        if (resetLink) {
            jwt.verify(resetLink, process.env.JWT_SECRET_KEY, async (err, next) => {
                if (err) {
                    return res.status(422).send({ status: 1003, message: "Invalid Token!" })
                }
            });
        }

        const findAdmin = await Admin.findOne({ where: { resetLink: resetLink, id: adminId } })

        if (!findAdmin) {
            return res.status(404).send({ status: 1006, message: "Admin with this token does not exists" });
        }

        let changeNewPassword = await bcrypt.hashSync(((password + nodeKey)), 10)

        //once password changed resetLink will be a emptyString
        data.resetLink = ''

        const values = data
        const condition = { where: { id: adminId } }
        const options = { multi: true }

        const updateDetails = await Admin.update(values, condition, options)

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
    reset
}