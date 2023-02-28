const db = require("../../models")
const { Issue, Admin } = db


////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

//////////////// -FOR EMPTY BODY- ///////////////////////
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

//////////////// -FOR FULLNAME- ///////////////////////
const isValidFullName = (fullName) => {
    return /^[a-zA-Z ]+$/.test(fullName);
};

//////////////// -FOR MOBILE- ///////////////////////
const isValidPhone = (phone) => {
    return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone);
};

//////////////// -FOR EMAIL- ///////////////////////
const isValidEmail = (email) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};

//////////////// -FOR ACTIVE-AVILABLE- ///////////////////////
const isActiveRequest = (isActive) => {
    return /^(true|false|True|False)$/.test(isActive);
};

//=============================================Create-A-Issue==========================================================//

const createIssue = async function (req, res, next) {
    try {

        const data = req.body

        const { issue, fullName, email, phone, issueDescription } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(issue)) {
            return res.status(422).send({ status: 1002, message: "issue is required" })
        }

        if (!isValid(fullName)) {
            return res.status(422).send({ status: 1002, message: "FullName is required" })
        }

        if (!isValidFullName(fullName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid fullName" })
        }

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "Email is required" })
        }

        if (!isValidEmail(email)) {
            return res.status(422).send({ status: 1003, message: "Email should be a email address like ....@gmail.com" })
        }

        if (!isValid(phone)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!isValidPhone(phone)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
        }

        if (!isValid(issueDescription)) {
            return res.status(422).send({ status: 1002, message: "issueDescription is required" })
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//=============================================Update-A-Issue==========================================================//

const updateIssue = async function (req, res, next) {
    try {

        const enteredAdminId = req.params.id

        let checkAdminId = enteredAdminId.split('').length

        if (checkAdminId != 36) {
            return res.status(422).send({ status: 1003, message: "admin-Id is not valid" })
        }

        let paramsAdminId = enteredAdminId

        const checkEnteredAdminId = await Admin.findOne({ where: { id: paramsAdminId } });

        if (!checkEnteredAdminId) {
            return res.status(422).send({ status: 1006, message: "admin-ID does not exists" })
        }

        const enteredId = req.params.issueId;

        let checkIssueId = enteredId.split('').length

        if (checkIssueId != 36) {
            return res.status(422).send({ status: 1003, message: "issueId is not valid" })
        }

        let issueId = enteredId

        const enteredIssueId = await Issue.findOne({ where: { id: issueId } })

        if (!enteredIssueId) {
            return res.status(422).send({ status: 1006, message: "Provided issue-ID does not exists" })
        }

        const data = req.body

        const { isActive } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("isActive" in data) {

            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isActive is required" })
            }

            if (!isActiveRequest(isActive)) {
                return res.status(422).send({ status: 1003, message: "isActive can be false only" })
            }

            dataObject['isActive'] = isActive
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//================================================Get-A-Issue==========================================================//

const getIssue = async function (req, res, next) {
    try {

        const enteredAdminId = req.params.id

        let checkAdminId = enteredAdminId.split('').length

        if (checkAdminId != 36) {
            return res.status(422).send({ status: 1003, message: "admin-Id is not valid" })
        }

        let paramsAdminId = enteredAdminId

        const checkEnteredAdminId = await Admin.findOne({ where: { id: paramsAdminId } });

        if (!checkEnteredAdminId) {
            return res.status(422).send({ status: 1006, message: "admin-ID does not exists" })
        }

        let data = req.query

        const { issueId, fullName, email, phone, isActive } = data

        if ("issueId" in data) {

            if (!isValid(issueId)) {
                return res.status(422).send({ status: 1002, message: "issueId is required" })
            }

            let checkIssueId = queryId.split('').length

            if (checkIssueId != 36) {
                return res.status(422).send({ status: 1003, message: "issue-Id is not valid please enter in a valid format" })
            }
        }


        if ("fullName" in data) {

            if (!isValid(fullName)) {
                return res.status(422).send({ status: 1002, message: "fullName is required" })
            }

        }

        if ("email" in data) {

            if (!isValid(email)) {
                return res.status(422).send({ status: 1002, message: "Email is required" })
            }

            if (!isValidEmail(email)) {
                return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
            }

        }

        if ("phone" in data) {

            if (!isValid(phone)) {
                return res.status(422).send({ status: 1002, message: "Phone No. is required" })
            }

            if (!isValidPhone(phone)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
            }

        }

        if ("isActive" in data) {


            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isRequest is required" })
            }

            if (!isActiveRequest(isActive)) {
                return res.status(422).send({ status: 1003, message: "Please provide isActive like True or false etc" })
            }

        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    createIssue,
    updateIssue,
    getIssue
}







