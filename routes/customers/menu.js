const express = require("express")
const menuRouter = express.Router()
const validate = require("../../validators/customers/menu")
const { authentication } = require("../../middlewares/authentication");
const { index } = require("../../controllers/customers/menu");
const { authorization } = require("../../middlewares/authorization")



menuRouter.get('/customers/menu', [validate.getMenu], index);

module.exports = menuRouter