require("dotenv").config();
const JWT = require("jsonwebtoken")

const signAccessToken = (userId, userRole) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userRole: userRole
        }
        const secret = process.env.JWT_SECRET_KEY
        const option = {
            expiresIn: "1h",
            issuer: "sparkeighteen.com",
            audience: userId,
        };

        JWT.sign(payload, secret, option, (err, token) => {
            if (err) return reject(err);
            resolve(token)
        })
    })
}

module.exports = { signAccessToken }