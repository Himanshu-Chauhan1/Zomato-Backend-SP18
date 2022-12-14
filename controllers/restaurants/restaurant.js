require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../../models");
const { Restaurant } = db


//========================================POST /CREATE-A-RESTAURANT==========================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await Restaurant.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST /LOGIN-FOR-A-RESTAURANT==========================================================

let login = async (req, res) => {
    try {

        let data = req.body

        let { email, phone, password } = data

        if ("email" in data) {
            let restaurant = await Restaurant.findOne({ where: { email: email } })
            if (!restaurant) {
                return res.status(422).send({ status: 1003, message: "Invalid Email or Phone credentials" });
            }

            let checkPassword = await bcrypt.compare(password, restaurant.password)
            if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

            const payload = {
                restaurantId: restaurant.id,
                issuer: "sparkeighteen.com",
                role: "restaurant",
                exp: Math.floor(Date.now() / 1000) + (8.64e+7)
            };

            const token = jwt.sign({ payload }, process.env.SECRET_KEY)

            const data = {
                token: token,
                role:"restaurant"
            }

            return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: data })

        }
        if ("phone" in data) {
            let restaurant = await Restaurant.findOne({ where: { phone: phone } })
            if (!restaurant) {
                return res.status(422).send({ status: 1003, message: "Invalid Email or Phone credentials" });
            }

            let checkPassword = await bcrypt.compare(password, restaurant.password)
            if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

            const payload = {
                restaurantId: restaurant.id,
                issuer: "sparkeighteen.com",
                role: "restaurant",
                exp: Math.floor(Date.now() / 1000) + (8.64e+7)
            };

            const token = jwt.sign({ payload }, process.env.SECRET_KEY)

            console.log(token.role);

            const data = {
                token: token,
                role:"restaurant"
            }

            return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: data })

        }

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-RESTAURANT==========================================================//

const update = async function (req, res) {
    try {
        const restaurantId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: restaurantId } };
        const options = { multi: true };

        const updateDetails = await Restaurant.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};
//========================================GET/GET-A-RESTAURANT==========================================================//

const get = async function (req, res) {
    try {

        let data = req.query

        // let findByFilter = await Restaurant.findAll({
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
//========================================GET/GET-ALL-RESTAURANTS==========================================================//

const index = async function (req, res) {
    try {

        let restaurant = await Restaurant.findAll()

        if (!restaurant) {
            return res.status(404).send({ status: 1008, msg: "No Restaurants found....." })
        }

        return res.status(200).send({ status: 1010, message: 'All Restaurants:', data: restaurant })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-RESTAURANT==========================================================//

const destroy = async function (req, res) {
    try {

        let restaurantId = req.params.id

        let deleteRestaurant = await Restaurant.destroy({ where: { id: restaurantId } })

        return res.status(200).send({ status: 1010, message: "The Customer has been deleted Successfully", data: deleteRestaurant })
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