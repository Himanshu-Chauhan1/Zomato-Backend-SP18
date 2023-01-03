const express = require("express")
const menuRouter = express.Router()
const validate = require("../../validators/restaurants/menu")
const { authentication } = require("../../middlewares/authentication");
const { index } = require("../../controllers/restaurants/menu");
const { authorization } = require("../../middlewares/authorization")



menuRouter.get('/restaurants/:id/menus', [authentication, authorization, validate.getMenu], index);

module.exports = menuRouter