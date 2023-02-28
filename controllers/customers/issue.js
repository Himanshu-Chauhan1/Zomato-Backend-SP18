const db = require("../../models");
const { Issue } = db

//========================================POST /CREATE-A-ISSUE==========================================================//

const create = async function (req, res) {
    try {

        const issueCreated = await Issue.create(req.body)

        res.status(201).send({ status: 1009, message: "Your issue has been submitted successfully", data: issueCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


module.exports = create
