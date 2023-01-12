require("dotenv").config();
const bcrypt = require("bcrypt")
const db = require("../../models");
const { SuperAdmin } = db
const { Op } = require("sequelize");
const { signAccessToken } = require("../../Utils/jwt")
const nodeKey = process.env.NODE_KEY

//=====================================POST /CREATE-A-SUPER-ADMIN==================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await SuperAdmin.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//====================================POST /LOGIN-FOR-A-SUPER-ADMIN===============================================//

let login = async (req, res) => {
    try {

        let data = req.body

        let { email, password } = data

        let superAdmin = await SuperAdmin.findOne({ where: { email: email } })

        if (!superAdmin) {
            return res.status(422).send({ status: 1003, message: "Invalid Email or Phone credentials" });
        }

        let checkPassword = await bcrypt.compareSync(password + nodeKey, superAdmin.password)
        if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

        const token = await signAccessToken(superAdmin.id, superAdmin.userRole);

        const userData = {
            token: token,
            role: superAdmin.userRole
        }

        return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: userData })

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//====================================POST/UPDATE-A-SUPER-ADMIN===================================================//

const update = async function (req, res) {
    try {
        const superAdminId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: superAdminId } };
        const options = { multi: true };

        const updateDetails = await SuperAdmin.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//=====================================GET/GET-A-SUPER-ADMIN=====================================================//

const index = async function (req, res) {
    try {

        let data = req.query
        const { superAdminId, fullName, email, phone } = data

        if (Object.keys(req.query).length > 0) {
            let findSuperAdminByFilter = await Admin.findAll({
                where: {
                    [Op.or]: [
                        { id: { [Op.eq]: superAdminId } },
                        { fullName: { [Op.eq]: fullName } },
                        { email: { [Op.eq]: email } },
                        { phone: { [Op.eq]: phone } }
                    ]
                }
            })

            if (!findSuperAdminByFilter.length)
                return res.status(404).send({ status: 1006, message: "No superAdmins found as per the filters applied" })

            return res.status(200).send({ status: 1010, data: findSuperAdminByFilter })
        } else {

            let findAllSuperAdmins = await SuperAdmin.findAll()

            if (!findAllSuperAdmins.length)
                return res.status(404).send({ status: 1006, message: "No SuperAdmins found" })

            return res.status(200).send({ status: 1010, data: findAllSuperAdmins })
        }

    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

module.exports = {
    create,
    login,
    update,
    index
}