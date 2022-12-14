require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../../models");
const { Admin } = db


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

//========================================POST /LOGIN-FOR-A-ADMIN==========================================================

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

//========================================POST/UPDATE-A-ADMIN==========================================================//

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
//========================================GET/GET-ALL-ADMIN-By_Id==========================================================//

const get = async function (req, res) {
    try {
        let data = req.query

        // let findByFilter = await Admin.findAll({
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
//========================================GET/GET-A-ADMIN==========================================================//

const index = async function (req, res) {
    try {
          
        let admins = await Admin.findAll()

        if (!admins) {
            return res.status(404).send({ status: 1008, msg: "No Admins found....." })
        }

        return res.status(200).send({ status: 1010, message: 'All Admins:', data: admins })
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

//forgotpassword





module.exports = {
    create,
    login,
    update,
    get,
    index,
    destroy
}