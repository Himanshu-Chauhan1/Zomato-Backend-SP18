require("dotenv").config();
const speakeasy=require("speakeasy")

const generateOTP = function generateOtp() {
    try {
        let token = speakeasy.totp({
            secret:process.env.OTP_KEY,
            encoding: 'base32',
            digits:6,
            step: 60,
            window:10
        });
       return token
        
    } catch (error) {
        console.log(error.message)
    }
}

const verifyOTP = function verifyOtp(token){
    try {
        let expiry = speakeasy.totp.verifyDelta({
            secret:process.env.OTP_KEY,
            encoding: 'base32',
            token: token,
            step: 60,
            window:10
        });
        console.log(expiry)
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { generateOTP, verifyOTP}
