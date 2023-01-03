const express = require("express")
const addressRouter = express.Router()
const validate = require("../../validators/restaurants/address")
const { create, update, index, destroy } = require("../../controllers/restaurants/address");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


addressRouter.post('/restaurants/:id/address', [authentication, authorization, validate.createAddress], create);
addressRouter.put('/restaurants/:id/address/:addressId', [authentication, authorization, validate.updateAddress], update);
addressRouter.get('/restaurants/:id/address', [authentication, authorization, validate.getAddress], index);
addressRouter.delete('/restaurants/:id/address/:addressId', [authentication, authorization, validate.deleteAddress], destroy);

module.exports = addressRouter