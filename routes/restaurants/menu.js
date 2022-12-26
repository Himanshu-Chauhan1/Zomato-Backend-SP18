const express = require("express")
const menuRouter = express.Router()
const validate = require("../../validators/restaurants/menu")
const { authentication } = require("../../middlewares/authentication");
const { index } = require("../../controllers/restaurants/menu");
// const { authorization } = require("../../middleware/authorization")



menuRouter.get('/restaurants/:restaurantId/menus', [validate.getMenu], index);

module.exports = menuRouter