const express = require("express")
const addressRouter = express.Router()
const validate = require("../../validators/restaurants/address")
const { create, update, index, destroy } = require("../../controllers/restaurants/address");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


addressRouter.post('/restaurants/:restaurantId/address', [validate.createAddress], create);
addressRouter.put('/restaurants/:restaurantId/address/:addressId', [validate.updateAddress], update);
addressRouter.get('/restaurants/:restaurantId/address', [validate.getAddress], index);
addressRouter.delete('/restaurants/:restaurantId/address/:addressId', [validate.deleteAddress], destroy);

module.exports = addressRouter