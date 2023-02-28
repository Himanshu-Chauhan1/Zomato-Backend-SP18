const express = require("express")
const issueRouter = express.Router()
const validate = require("../../validators/customerSupport/issue")
const { create, update, index } = require("../../controllers/customerSupport/issue");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


issueRouter.post('/customersupports/issues/create', [validate.createIssue], create);
issueRouter.put('/customersupports/:id/issues/:issueId', [authentication, authorization, validate.updateIssue], update);
issueRouter.get('/customersupports/:id/issues', [authentication, authorization, validate.getIssue], index);


module.exports = issueRouter