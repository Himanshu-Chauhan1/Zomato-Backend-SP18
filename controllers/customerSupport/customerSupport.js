require("dotenv").config();
const bcrypt = require("bcrypt")
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
                        { customerSupportId: { [Op.eq]: customerSupportId } },
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


module.exports = {
    create,
    login,
    update,
    index,
    destroy
}