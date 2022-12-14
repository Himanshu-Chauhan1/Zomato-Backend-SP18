const express = require("express")
const menuRouter = express.Router()
const validate = require("../../validators/restaurants/menu")
const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy, upload } = require("../../controllers/restaurants/menu");
// const { authorization } = require("../../middleware/authorization")


menuRouter.post('/menus', [validate.createMenu], create);
menuRouter.put('/menus/:id', [authentication, validate.updateMenu], update);
menuRouter.get('/menus', [authentication], index);
menuRouter.delete('/menus/:id', [authentication, validate.deleteMenu], destroy);
menuRouter.post('/menus/upload', upload);


module.exports = menuRouter