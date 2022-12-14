const express = require("express")
const menuRouter = express.Router()
const validate = require("../../validators/restaurants/menu")
const { create, update, destroy, login, get, index } = require("../../controllers/restaurants/restaurant");
const { authentication } = require("../../middlewares/authentication")
// const { authorization } = require("../../middleware/authorization")


menuRouter.post('/menus', [validate.createMenu], create);
menuRouter.put('/menus/:id', [authentication,validate.updateMenu], update);
menuRouter.get('/menus',[authentication], index);
menuRouter.delete('/menus/:id', [authentication,validate.deleteMenu], destroy);


module.exports = menuRouter