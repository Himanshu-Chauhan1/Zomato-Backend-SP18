const jwt = require("jsonwebtoken")

//----------------------------------------authentication----------------------------------------------------*/

const authentication = async function (req, res, next) {
    try {

        let token = req.header('Authorization', 'Bearer Token');
        if (!token) return res.status(400).send({ status: 1002, message: "Login is Required!" })

        let splitToken = token.split(" ")

        let verifiedtoken = jwt.verify(splitToken[1], process.env.SECRET_KEY)
        if (!verifiedtoken) return res.status(400).send({ status: 1003, message: "Invalid Token!" })

        let exp = verifiedtoken.payload.exp
        let iatNow = Math.floor(Date.now() / 1000)
        if (exp < iatNow) {
            return res.status(401).send({ status: false, message: 'Session expired, Please login again!' })
        }
        req.verifiedtoken = verifiedtoken

        next();

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};


module.exports = { authentication }




