require('dotenv').config()
const aws = require("aws-sdk")

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
})

const uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {

        let s3 = new aws.S3({ apiVersion: "2006-03-01" })
        const contenttype = file.mimetype;

        const uploadParams = {
            ACL: "public-read",
            Bucket: process.env.AWS_BUCKET,
            Key: "Himanshu/" + file.originalname,
            Body: file.buffer,
            ContentType: contenttype,
        }

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            return resolve(data.Location)
        })

    })
}


module.exports = { uploadFile }
