const express = require("express")
const menuRouter = express.Router()
const validate = require("../../validators/restaurants/menu")
const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy} = require("../../controllers/restaurants/menu");
// const { authorization } = require("../../middleware/authorization")


menuRouter.post('/menus', [validate.createMenu], create);
menuRouter.put('/menus/:id', [validate.updateMenu], update);
menuRouter.get('/menus', index);
menuRouter.delete('/menus/:id', [validate.deleteMenu], destroy);


module.exports = menuRouter