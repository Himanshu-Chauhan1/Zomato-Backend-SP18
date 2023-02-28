const express = require("express")
const issueRouter = express.Router()
const validate = require("../../validators/admin/issue")
const { create, update, index } = require("../../controllers/admin/issue");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


issueRouter.post('/admins/issues/create', [validate.createIssue], create);
issueRouter.put('/admins/:id/issues/:issueId', [authentication, authorization, validate.updateIssue], update);
issueRouter.get('/admins/:id/issues', [authentication, authorization, validate.getIssue], index);


module.exports = issueRouter