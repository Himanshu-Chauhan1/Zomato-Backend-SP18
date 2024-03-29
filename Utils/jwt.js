require("dotenv").config();
const JWT = require("jsonwebtoken")

const signAccessToken = (userId, userRole) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userRole: userRole
        }
        const secret = process.env.JWT_SECRET_KEY
        const option = {
            expiresIn: process.env.JWT_EXP_TIME,
            issuer: process.env.JWT_ISSUER_NAME,
            audience: userId,
        };

        JWT.sign(payload, secret, option, (err, token) => {
            if (err) return reject(err);
            resolve(token)
        })
    })
}
const destroyToken = (userId, userRole) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userRole: userRole
        }
        const secret = process.env.JWT_SECRET_KEY
        const option = {
            expiresIn: process.env.JWT_EXP_TIME_LOGOUT,
            issuer: process.env.JWT_ISSUER_NAME,
            audience: userId,
        };

        JWT.sign(payload, secret, option, (err, token) => {
            if (err) return reject(err);
            resolve(token)
        })
    })
}

module.exports = { signAccessToken, destroyToken}