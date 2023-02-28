const express = require("express")
const issueRouter = express.Router()
const validate = require("../../validators/customers/issue")
const create = require("../../controllers/customers/issue");

issueRouter.post('/customers/issues/create', [validate.createIssue], create);

module.exports = issueRouter