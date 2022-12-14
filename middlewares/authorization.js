const jwt = require("jsonwebtoken")
const db = require("../models")
const { Customer, Restaurant} = db


//----------------------------------------authorization----------------------------------------------------*//

const authorization = async function (req, res, next) {
    try {

        const verifiedtoken = req.verifiedtoken
        let idFromToken=verifiedtoken.payload.customerId

        const findCustomer = await Customer.findByPk(idFromToken)
        const customerId = findCustomer.id

        if (customerId !== idFromToken) {
            return res.status(401).send({ Status: 1010, message: "Access Denied! You dont have correct privilege to perform this operation" });
        } else {
            next()
        }

    } catch (error) {
        console.log(error.message);
        res.status(401).send({ status: 1010, message: "Something is wrong please check back again after sometime" });
    }
}



module.exports = { authorization }


