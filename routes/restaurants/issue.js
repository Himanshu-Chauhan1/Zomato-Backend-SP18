const express = require("express")
const issueRouter = express.Router()
const validate = require("../../validators/restaurants/issue")
const create = require("../../controllers/restaurants/issue");

issueRouter.post('/restaurants/issues/create', [validate.createIssue], create);

module.exports = issueRouter