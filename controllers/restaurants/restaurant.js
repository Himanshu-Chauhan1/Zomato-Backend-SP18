require("dotenv").config();
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const db = require("../../models");
const { Restaurant } = db
const { Op } = require("sequelize");
const { signAccessToken } = require("../../Utils/jwt")
const nodeKey = process.env.NODE_KEY


//=======================================POST /CREATE-A-RESTAURANT=====================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await Restaurant.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//=======================================POST /LOGIN-FOR-A-RESTAURANT=================================================//

let login = async (req, res) => {
    try {

        let data = req.body

        let { email, phone, password } = data

        if (("phone" || "email" in data)) {

            let restaurant = await Restaurant.findOne({ where: { [Op.or]: [{ email: { [Op.eq]: email } }, { phone: { [Op.eq]: phone } }] } })

            if (!restaurant) {
                return res.status(422).send({ status: 1003, message: "Invalid Email or Phone credentials" });
            }

            let checkPassword = await bcrypt.compare(password + nodeKey, restaurant.password)

            if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

            const token = await signAccessToken(restaurant.id, restaurant.userRole);

            const data = {
                token: token,
                role: restaurant.userRole
            }

            return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: data })
        }

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST /LOGOUT-FOR-A-RESTAURANT========================================================//

const logout = async (req, res) => {
    try {

        let token = req.header('Authorization', 'Bearer');

        if (!token) return res.status(401).send({ status: 1009, message: 'Restaurant is already logged out' });

        let splitToken = token.split(" ")

        let verifiedtoken = JWT.verify(splitToken[1], process.env.JWT_SECRET_KEY)
        verifiedtoken.exp = 0

        return res.status(200).send({ status: 1010, message: "You have been successfully logged out", data: verifiedtoken })

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//=======================================POST/UPDATE-A-RESTAURANT====================================================//

const update = async function (req, res) {
    try {
        const restaurantId = req.params.id
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

//=======================================GET/GET-ALL-RESTAURANTS=====================================================//

const index = async function (req, res) {
    try {

        const data = req.query
        const { restaurantId, name, email, phone, landline, ownerFullName, ownerEmail, isApproved, isActive } = data

        if (Object.keys(req.query).length > 0) {
            let findRestaurantByFilter = await Restaurant.findAll({
                where: {
                    [Op.or]: [
                        { restaurantId: { [Op.eq]: restaurantId } },
                        { name: { [Op.eq]: name } },
                        { email: { [Op.eq]: email } },
                        { phone: { [Op.eq]: phone } },
                        { landline: { [Op.eq]: landline } },
                        { ownerFullName: { [Op.eq]: ownerFullName } },
                        { ownerEmail: { [Op.eq]: ownerEmail } },
                        { isApproved: { [Op.eq]: isApproved } },
                        { isActive: { [Op.eq]: isActive } },
                    ]
                }
            })

            if (!findRestaurantByFilter.length)
                return res.status(404).send({ status: 1006, message: "No restaurants found as per the filters applied" })

            return res.status(200).send({ status: 1010, data: findRestaurantByFilter })
        } else {

            let findAllRestaurants = await Restaurant.findAll()

            if (!findAllRestaurants.length)
                return res.status(404).send({ status: 1006, message: "No restaurants found" })

            return res.status(200).send({ status: 1010, data: findAllRestaurants })
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//=======================================DELETE/DELETE-A-RESTAURANT==================================================//

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
//======================================PUT/CHANGE-PASSWORD-FOR-A-RESTAURANT=========================================//

const change = async function (req, res) {
    try {

        const restaurantId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: restaurantId } };
        const options = { multi: true };

        const updateDetails = await Restaurant.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The password has been changed Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//=====================================POST/RESET-LINK-PASSWORD-FOR-A-RESTAURANT=====================================//

const reset = async function (req, res) {
    try {

        const restaurant = await Restaurant.findOne({ where: { email: req.body.email } })

        const token = JWT.sign({
            userId: restaurant.id,
            userRole: restaurant.userRole,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (600)
        },
            process.env.RESET_PASSWORD_KEY
        );

        let setResetLink = { resetLink: token }

        const values = setResetLink;
        const condition = { where: { email: req.body.email } };
        const options = { multi: true };

        const updateDetails = await Restaurant.update(values, condition, options)

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
            to: restaurant.email,
            subject: "Account Activation Link",
            html:
                `<h1>Your link to reset the password is</h1>
                 <p>${process.env.CLIENT_URL}${token}</p>`
        };

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                return res.status(200).send({ status: 1010, message: "Error " + err });
            } else {
                return res.status(200).send({ status: 1010, message: `Email has been sent successfully to ${restaurant.email} ` });
            }
        });

    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}
//=====================================POST/RESET-PASSWORD-FOR-A-RESTAURANT==========================================//

const verify = async function (req, res) {
    try {

        let userToken = req.params.token

        let verifiedToken = await JWT.verify(userToken, process.env.RESET_PASSWORD_KEY)

        const values = req.body
        const condition = { where: { id: verifiedToken.userId } }
        const options = { multi: true }

        const updateDetails = await Restaurant.update(values, condition, options)

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
    logout,
    update,
    index,
    destroy,
    change,
    reset,
    verify
}