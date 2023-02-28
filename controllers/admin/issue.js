const db = require("../../models");
const { Issue } = db
const { Op } = require("sequelize");


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

//========================================POST/UPDATE-A-ISSUE==========================================================//

const update = async function (req, res) {
    try {
        const issueId = req.params.issueId
        let data = req.body

        const values = data;
        const condition = { where: { id: issueId } };
        const options = { multi: true };

        const updateDetails = await Issue.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered issue details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-ISSUE==========================================================//

const index = async function (req, res) {
    try {
        let data = req.query

        const { issueId, fullName, email, phone, isActive } = data

        if (Object.keys(req.query).length > 0) {
            let findissueByFilter = await Issue.findAll({
                where: {
                    [Op.or]: [
                        { id: { [Op.eq]: issueId } },
                        { fullName: { [Op.eq]: fullName } },
                        { email: { [Op.eq]: email } },
                        { phone: { [Op.eq]: phone } },
                        { isActive: { [Op.eq]: isActive } },
                    ],
                }
            })

            if (!findissueByFilter.length)
                return res.status(404).send({ status: 1006, message: "No issues found" })

            return res.status(200).send({ status: 1010, data: findissueByFilter })
        } else {

            let findAllIssues = await Issue.findAll()

            if (!findAllIssues.length)
                return res.status(404).send({ status: 1006, message: "No order queries found" })

            return res.status(200).send({ status: 1010, data: findAllIssues })
        }

    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};


module.exports = {
    create,
    update,
    index
}